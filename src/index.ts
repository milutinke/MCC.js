import Options from './Options';
import Logger from './Logger';
import States from './States';
import ConsoleLogger from "./ConsoleLogger";
import ChatBot from './ChatBot';
import WebSocket from "isomorphic-ws";

import { Entity } from './MccTypes/Entity';
import Location from './MccTypes/Location';
import AuthenticateCommand from './Commands/AuthenticateCommand';
import ChangeSessionIdCommand from './Commands/ChangeSessionIdCommand';

class MccJsClient {
    private socket: any;
    private state: States = States.DISCONNECTED;
    private loggingEnabled: boolean = false;
    private logger: Logger;
    private chatBot: ChatBot;

    private host: string;
    private port: number;
    private password?: string;
    private sessionName?: string;

    constructor(options: Options) {
        if (options.host.trim().length === 0)
            throw new Error("Please provide a valid non empty host!");

        if (options.port < 0 || options.port > 65535)
            throw new Error("Please provide a valid port! [0-65535]");

        if (options.sessionName) {
            if (options.sessionName.trim().length === 0 || options.sessionName.length > 32) {
                throw new Error("Please provide a valid session name (It can be at minimum 1 character, at maximum 32 characters)!");
            }
        }

        if (options.password) {
            if (options.password.trim().length) {
                throw new Error("Please provide a valid password!");
            }
        }

        if (options.chatBot) {
            if (!(options.chatBot['RegisterChatBot'] && typeof options.chatBot['RegisterChatBot'] === 'function'))
                throw new Error("Please provide a valid instance of ChatBot!");
        } else throw new Error("Please provide a valid instance of ChatBot!");

        this.host = options.host;
        this.port = options.port;
        this.password = options.password;
        this.sessionName = options.sessionName;
        this.loggingEnabled = options.loggingEnabled;
        this.logger = options.logger || new ConsoleLogger();
        this.chatBot = options.chatBot;
    }

    private info(message: string): void {
        if (this.loggingEnabled)
            this.logger.info!(message);
    }

    private warn(message: string): void {
        if (this.loggingEnabled)
            this.logger.warn!(message);
    }

    private error(message: string): void {
        if (this.loggingEnabled)
            this.logger.error!(message);
    }

    private onOpen(event: any): void {
        this.state = States.CONNECTED;
        this.info(`Successfully connected to ${this.host} on port ${this.port}!`);
        this.chatBot.connection = this.socket;

        if (this.password)
            this.socket.send(new AuthenticateCommand(this.password).getCommandJson());

        if (this.sessionName)
            this.socket.send(new ChangeSessionIdCommand(this.sessionName).getCommandJson());
    }

    private onMessage(event: any): void {
        if (!event.data)
            return;

        try {
            const parsed = JSON.parse(event.data);
            const data = JSON.parse(parsed.data);
            this.handleEvent(parsed.event, data);
        } catch (e) {
            if (this.isMethodPresent("OnEventError"))
                this.chatBot.OnEventError!(event, `Error when parsing: '${event.data}'`);
        }
    }

    private onClose(event: any): void {
        this.state = States.DISCONNECTED;

        if (event.wasClean)
            this.info("Connection cosed cleanly!");
        else this.warn("Connection died!");
    }

    private onError(error: any): void {
        this.state = States.ERROR;
        this.error(error.message || error);
    }

    public connect(): void {
        if (this.state == States.CONNECTED) {
            this.info("Reconnect requested, dropping the old connection...");
            if (this.socket) this.socket.close();
            this.info("Reconnecting ...");
        } else this.info(`Connecting to ${this.host} on port ${this.port} ...`);

        this.state = States.CONNECTING;
        this.socket = new WebSocket(`ws://${this.host}:${this.port}/mcc`);

        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }

    public disconnect(): void {
        this.state = States.DISCONNECTED;

        if (this.socket)
            this.socket.close();

        this.info("Disconnected!");
    }

    private handleEvent(event: string, data: any): void {
        if (!event || (event && event.trim().length === 0))
            return;

        // Internal websocket event
        if (event === 'OnWsCommandResponse') {
            if (data.error)
                throw new Error(data.message);

            if (data.success)
                this.info(data.message);
            else {
                this.error(data.message);

                if (data.stackTrace)
                    this.error(data.stackTrace);
            }

            return;
        }

        // Catch unhandled events and call an appropriate callback for it
        // This is useful when the MCC.js hasn't been updated to support all the events from Web Socket Chat Bot
        // or when you want to handle events in a custom way, 
        // or you're using an older version of MCC.js and want to catch new events without updating
        if (!this.isMethodPresent(event)) {
            if (this.isMethodPresent("OnUnhandledEvent"))
                this.chatBot.OnUnhandledEvent!(event, data);

            return;
        }

        // Handle MCC events
        switch (event) {
            case "OnMccCommandResponse":
                this.chatBot.OnMccCommandResponse!(data.response);
                break;

            case "OnGameJoined":
                this.chatBot.OnGameJoined!();
                break;

            case "OnBlockBreakAnimation":
                this.chatBot.OnBlockBreakAnimation!(data.entity as Entity, data.location as Location, data.stage);
                break;

            case "OnEntityAnimation":
                this.chatBot.OnEntityAnimation!(data.entity as Entity, data.animation);
                break;

            case "OnChatPrivate":
                this.chatBot.OnChatPrivate!(data.sender, data.message, data.rawText);
                break;

            case "OnChatPublic":
                this.chatBot.OnChatPublic!(data.sender, data.message, data.rawText);
                break;

            case "OnTeleportRequest":
                this.chatBot.OnTeleportRequest!(data.sender, data.rawText);
                break;

            case "OnChatRaw":
                this.chatBot.OnChatRaw!(data);
                break;

            case "OnDisconnect":
                this.chatBot.OnDisconnect!(data.reason, data.message);
                break;

            case "OnPlayerProperty":
                this.chatBot.OnPlayerProperty!(data);
                break;

            case "OnServerTpsUpdate":
                this.chatBot.OnServerTpsUpdate!(data.tps);
                break;

            case "OnTimeUpdate":
                this.chatBot.OnTimeUpdate!(data.worldAge, data.timeOfDay);
                break;

            case "OnEntityMove":
                this.chatBot.OnEntityMove!(data as Entity);
                break;

            case "OnInternalCommand":
                this.chatBot.OnInternalCommand!(data.command, data.parameters, data.result);
                break;

            case "OnEntitySpawn":
                this.chatBot.OnEntitySpawn!(data as Entity);
                break;

            case "OnEntityDespawn":
                this.chatBot.OnEntityDespawn!(data as Entity);
                break;

            case "OnHeldItemChange":
                this.chatBot.OnHeldItemChange!(data.itemSlot);
                break;

            case "OnHealthUpdate":
                this.chatBot.OnHealthUpdate!(data.health, data.food);
                break;

            case "OnExplosion":
                this.chatBot.OnExplosion!(data.location as Location, data.strength, data.recordCount);
                break;

            case "OnSetExperience":
                this.chatBot.OnSetExperience!(data.experienceBar, data.level, data.totalExperience);
                break;


            case "OnGamemodeUpdate":
                this.chatBot.OnGamemodeUpdate!(data.playerName, data.uuid, data.gameMode);
                break;

            case "OnLatencyUpdate":
                this.chatBot.OnLatencyUpdate!(data.playerName, data.uuid, data.latency);
                break;

            case "OnMapData":
                this.chatBot.OnMapData!(data.mapId, data.trackingPosition, data.locked, data.iconCount);
                break;

            case "OnTradeList":
                this.chatBot.OnTradeList!(data.windowId, data.trades, data.villagerInfo);
                break;

            case "OnTitle":
                this.chatBot.OnTitle!(data.action, data.titleText, data.subtitleText, data.actionBarText, data.fadeIn, data.stay, data.rawJson);
                break;

            case "OnEntityEquipment":
                this.chatBot.OnEntityEquipment!(data.entity as Entity, data.slot, data.item);
                break;

            case "OnEntityEffect":
                this.chatBot.OnEntityEffect!(data.entity as Entity, data.effect, data.amplifier, data.duration, data.flags);
                break;

            case "OnScoreboardObjective":
                this.chatBot.OnScoreboardObjective!(data.objectiveName, data.mode, data.objectiveValue, data.type, data.rawJson);
                break;

            case "OnUpdateScore":
                this.chatBot.OnUpdateScore!(data.entityName, data.action, data.objectiveName, data.type);
                break;

            case "OnInventoryUpdate":
                this.chatBot.OnInventoryUpdate!(data.inventoryId);
                break;

            case "OnInventoryOpen":
                this.chatBot.OnInventoryOpen!(data.inventoryId);
                break;

            case "OnInventoryClose":
                this.chatBot.OnInventoryClose!(data.inventoryId);
                break;

            case "OnPlayerJoin":
                this.chatBot.OnPlayerJoin!(data.uuid, data.name);
                break;

            case "OnPlayerLeave":
                this.chatBot.OnPlayerLeave!(data.uuid, data.name);
                break;

            case "OnDeath":
                this.chatBot.OnDeath!();
                break;

            case "OnRespawn":
                this.chatBot.OnRespawn!();
                break;

            case "OnEntityHealth":
                this.chatBot.OnEntityHealth!(data.entity as Entity, data.health);
                break;

            case "OnEntityMetadata":
                this.chatBot.OnEntityMetadata!(data.entity as Entity, data.metadata);
                break;

            case "OnPlayerStatus":
                this.chatBot.OnPlayerStatus!(data.statusId);
                break;

            case "OnNetworkPacket":
                this.chatBot.OnNetworkPacket!(data.packetId, data.isLogin, data.isInbound, data.packetData);
                break;
        }
    }

    private isMethodPresent(methodName: string): boolean {
        // @ts-ignore-start
        return this.chatBot[methodName] && typeof this.chatBot[methodName] === 'function';
        // @ts-ignore-end
    }

    public getState(): States {
        return this.state;
    }

    public getLogger() {
        return this.logger;
    }
}

export {
    MccJsClient,
    Logger,
    ChatBot,
    States
}
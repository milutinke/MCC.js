import { Entity } from './MccTypes/Entity.js';
import { Item } from './MccTypes/Item.js';
import Location from './MccTypes/Location.js';
import MccJsClient from './index.js';
import Command from './Commands/Contract/Command.js';

interface CommandResponse {
    requestId: string;
    result: any
}

class ChatBot {
    private client?: MccJsClient;
    private responseQueue = new Array<CommandResponse>();

    public setClient(client: MccJsClient): void {
        this.client = client;
    }

    // Internal
    protected send(command: Command) {
        this.client!.getConnection().send(command.getCommandJson());

        return new Promise((resolve, reject) => {
            const executionTimeout = this.client!.getExecutionTimeout() * 1000;
            let counter = 0;
            let interval: any;

            interval = setInterval(() => {
                counter++;

                const commandResponse = this.responseQueue.find(response => response.requestId === command.getRequestId());

                if (commandResponse) {
                    clearInterval(interval);
                    return resolve(commandResponse.result);
                }

                if (counter >= executionTimeout) {
                    clearInterval(interval);
                    return reject();
                }
            }, 1);
        });
    }

    protected info(message: string): void {
        this.client!.info(message);
    }

    protected warn(message: string): void {
        this.client!.warn(message);
    }

    protected error(message: string): void {
        this.client!.error(message);
    }

    protected debug(message: string): void {
        this.client!.debug(message);
    }

    public _OnWsCommandResponse(response: string) {
        try {
            const res = JSON.parse(response);
            this.responseQueue.push(res);
        } catch (e) {
            this.error("Error when parsing a command response: " + response);
        }
    }

    public _OnEvent(event: string, data: any): void {
        switch (event) {
            case "OnGameJoined":
                this.OnGameJoined!();
                break;

            case "OnBlockBreakAnimation":
                this.OnBlockBreakAnimation!(data.entity as Entity, data.location as Location, data.stage);
                break;

            case "OnEntityAnimation":
                this.OnEntityAnimation!(data.entity as Entity, data.animation);
                break;

            case "OnChatPrivate":
                this.OnChatPrivate!(data.sender, data.message, data.rawText);
                break;

            case "OnChatPublic":
                this.OnChatPublic!(data.sender, data.message, data.rawText);
                break;

            case "OnTeleportRequest":
                this.OnTeleportRequest!(data.sender, data.rawText);
                break;

            case "OnChatRaw":
                this.OnChatRaw!(data);
                break;

            case "OnDisconnect":
                this.OnDisconnect!(data.reason, data.message);
                break;

            case "OnPlayerProperty":
                this.OnPlayerProperty!(data);
                break;

            case "OnServerTpsUpdate":
                this.OnServerTpsUpdate!(data.tps);
                break;

            case "OnTimeUpdate":
                this.OnTimeUpdate!(data.worldAge, data.timeOfDay);
                break;

            case "OnEntityMove":
                this.OnEntityMove!(data as Entity);
                break;

            case "OnInternalCommand":
                this.OnInternalCommand!(data.command, data.parameters, data.result);
                break;

            case "OnEntitySpawn":
                this.OnEntitySpawn!(data as Entity);
                break;

            case "OnEntityDespawn":
                this.OnEntityDespawn!(data as Entity);
                break;

            case "OnHeldItemChange":
                this.OnHeldItemChange!(data.itemSlot);
                break;

            case "OnHealthUpdate":
                this.OnHealthUpdate!(data.health, data.food);
                break;

            case "OnExplosion":
                this.OnExplosion!(data.location as Location, data.strength, data.recordCount);
                break;

            case "OnSetExperience":
                this.OnSetExperience!(data.experienceBar, data.level, data.totalExperience);
                break;

            case "OnGamemodeUpdate":
                this.OnGamemodeUpdate!(data.playerName, data.uuid, data.gameMode);
                break;

            case "OnLatencyUpdate":
                this.OnLatencyUpdate!(data.playerName, data.uuid, data.latency);
                break;

            case "OnMapData":
                this.OnMapData!(data.mapId, data.trackingPosition, data.locked, data.iconCount);
                break;

            case "OnTradeList":
                this.OnTradeList!(data.windowId, data.trades, data.villagerInfo);
                break;

            case "OnTitle":
                this.OnTitle!(data.action, data.titleText, data.subtitleText, data.actionBarText, data.fadeIn, data.stay, data.rawJson);
                break;

            case "OnEntityEquipment":
                this.OnEntityEquipment!(data.entity as Entity, data.slot, data.item);
                break;

            case "OnEntityEffect":
                this.OnEntityEffect!(data.entity as Entity, data.effect, data.amplifier, data.duration, data.flags);
                break;

            case "OnScoreboardObjective":
                this.OnScoreboardObjective!(data.objectiveName, data.mode, data.objectiveValue, data.type, data.rawJson);
                break;

            case "OnUpdateScore":
                this.OnUpdateScore!(data.entityName, data.action, data.objectiveName, data.type);
                break;

            case "OnInventoryUpdate":
                this.OnInventoryUpdate!(data.inventoryId);
                break;

            case "OnInventoryOpen":
                this.OnInventoryOpen!(data.inventoryId);
                break;

            case "OnInventoryClose":
                this.OnInventoryClose!(data.inventoryId);
                break;

            case "OnPlayerJoin":
                this.OnPlayerJoin!(data.uuid, data.name);
                break;

            case "OnPlayerLeave":
                this.OnPlayerLeave!(data.uuid, data.name);
                break;

            case "OnDeath":
                this.OnDeath!();
                break;

            case "OnRespawn":
                this.OnRespawn!();
                break;

            case "OnEntityHealth":
                this.OnEntityHealth!(data.entity as Entity, data.health);
                break;

            case "OnEntityMetadata":
                this.OnEntityMetadata!(data.entity as Entity, data.metadata);
                break;

            case "OnPlayerStatus":
                this.OnPlayerStatus!(data.statusId);
                break;

            case "OnNetworkPacket":
                this.OnNetworkPacket!(data.packetId, data.isLogin, data.isInbound, data.packetData);
                break;
        }
    }

    // ChatBot Events
    protected async OnInitialize(): Promise<void> { }
    protected async OnDestroy(): Promise<void> { }
    public async _OnEventError(event: string, error: string): Promise<void> { this.OnEventError(event, error); }
    protected async OnEventError(event: string, error: string): Promise<void> { }
    public async _OnUnhandledEvent(event: string, data: any): Promise<void> { this.OnUnhandledEvent(event, data); }
    protected async OnUnhandledEvent(event: string, data: any): Promise<void> { }
    protected async OnGameJoined(): Promise<void> { }
    protected async OnBlockBreakAnimation(entity: Entity, location: Location, stage: number): Promise<void> { }
    protected async OnEntityAnimation(entity: Entity, animation: number): Promise<void> { }
    protected async OnChatPrivate(sender: string, message: string, rawText: string): Promise<void> { }
    protected async OnChatPublic(sender: string, message: string, rawText: string): Promise<void> { }
    protected async OnTeleportRequest(sender: string, rawText: string): Promise<void> { }
    protected async OnChatRaw(rawJson: any): Promise<void> { }
    protected async OnDisconnect(reason: string, message: string): Promise<void> { }
    protected async OnPlayerProperty(prop: any): Promise<void> { }
    protected async OnServerTpsUpdate(tps: number): Promise<void> { }
    protected async OnTimeUpdate(worldAge: number, timeOfDay: number): Promise<void> { }
    protected async OnEntityMove(entity: Entity): Promise<void> { }
    protected async OnInternalCommand(command: string, parameters: string, result: string): Promise<void> { }
    protected async OnEntitySpawn(entity: Entity): Promise<void> { }
    protected async OnEntityDespawn(entity: Entity): Promise<void> { }
    protected async OnHeldItemChange(itemSlot: number): Promise<void> { }
    protected async OnHealthUpdate(health: number, food: number): Promise<void> { }
    protected async OnExplosion(location: Location, strength: number, recordCount: number): Promise<void> { }
    protected async OnSetExperience(experienceBar: number, level: number, totalExperience: number): Promise<void> { }
    protected async OnGamemodeUpdate(playerName: string, uuid: string, gameMode: string): Promise<void> { }
    protected async OnLatencyUpdate(playerName: string, uuid: string, latency: number): Promise<void> { }
    protected async OnMapData(mapId: number, trackingPosition: number, locked: number, iconCount: number): Promise<void> { }
    protected async OnTradeList(windowId: number, trades: any, villagerInfo: any): Promise<void> { }
    protected async OnTitle(action: string, titleText: string, subtitleText: string, actionBarText: string, fadeIn: number, stay: number, rawJson: any): Promise<void> { }
    protected async OnEntityEquipment(entity: Entity, slot: number, item: Item): Promise<void> { }
    protected async OnEntityEffect(entity: Entity, effect: string, amplifier: number, duration: number, flags: number): Promise<void> { }
    protected async OnScoreboardObjective(objectiveName: string, mode: number, objectiveValue: string, type: number, rawJson: any): Promise<void> { }
    protected async OnUpdateScore(entityName: string, action: number, objectiveName: string, type: number): Promise<void> { }
    protected async OnInventoryUpdate(inventoryId: number): Promise<void> { }
    protected async OnInventoryOpen(inventoryId: number): Promise<void> { }
    protected async OnInventoryClose(inventoryId: number): Promise<void> { }
    protected async OnPlayerJoin(uuid: string, name: string): Promise<void> { }
    protected async OnPlayerLeave(uuid: string, name: string): Promise<void> { }
    protected async OnDeath(): Promise<void> { }
    protected async OnRespawn(): Promise<void> { }
    protected async OnEntityHealth(entity: Entity, health: number): Promise<void> { }
    protected async OnEntityMetadata(entity: Entity, metadata: any): Promise<void> { }
    protected async OnPlayerStatus(statusId: number): Promise<void> { }
    protected async OnNetworkPacket(packetId: number, isLogin: boolean, isInbound: boolean, packetData: any): Promise<void> { }
};

export default ChatBot;
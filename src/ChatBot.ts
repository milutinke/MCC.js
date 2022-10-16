import { Entity } from './MccTypes/Entity.js';
import { Item, ItemType } from './MccTypes/Item.js';
import Location from './MccTypes/Location.js';
import MccJsClient from './index.js';
import Command from './Commands/Contract/Command.js';
import DigBlockCommand from './Commands/DigBlockCommand.js';
import GetEntitiesCommand from './Commands/GetEntitiesCommand.js';
import GetEntityHandlingEnabledCommand from './Commands/GetEntityHandlingEnabledCommand.js';
import GetPlayersLatencyCommand from './Commands/GetPlayersLatencyCommand.js';
import GetTerrainEnabledCommand from './Commands/GetTerrainEnabledCommand.js';
import GetWorldCommand from './Commands/GetWorldCommand.js';
import LogDebugToConsoleCommand from './Commands/LogDebugToConsoleCommand.js';
import LogDebugToConsoleTranslatedCommand from './Commands/LogDebugToConsoleTranslatedCommand.js';
import LogToConsoleCommand from './Commands/LogToConsoleCommand.js';
import LogToConsoleTranslatedCommand from './Commands/LogToConsoleTranslatedCommand.js';
import ReconnectToTheServerCommand from './Commands/ReconnectToTheServerCommand.js';
import RunScriptCommand from './Commands/RunScriptCommand.js';
import SendEntityActionCommand from './Commands/SendEntityActionCommand.js';
import SetSlotCommand from './Commands/SetSlotCommand.js';
import SetTerrainEnabledCommand from './Commands/SetTerrainEnabledCommand.js';
import SneakCommand from './Commands/SneakCommand.js';
import EntityActionType from './MccTypes/EntityActionType.js';
import DisconnectAndExitCommand from './Commands/DisconnectAndExitCommand.js';
import GetCurrentLocationCommand from './Commands/GetCurrentLocationCommand.js';
import MoveToLocationCommand from './Commands/MoveToLocationCommand.js';
import ClientIsMovingCommand from './Commands/ClientIsMovingCommand.js';
import LookAtLocationCommand from './Commands/LookAtLocationCommand.js';
import GetTimestampCommand from './Commands/GetTimestampCommand.js';
import GetServerPortCommand from './Commands/GetServerPortCommand.js';
import GetServerHostCommand from './Commands/GetServerHostCommand.js';
import GetUsernameCommand from './Commands/GetUsernameCommand.js';
import GetGamemodeCommand from './Commands/GetGamemodeCommand.js';
import GetYawCommand from './Commands/GetYawCommand.js';
import GetPitchCommand from './Commands/GetPitchCommand.js';
import GetUserUUIDCommand from './Commands/GetUserUUIDCommand.js';
import GetOnlinePlayersCommand from './Commands/GetOnlinePlayersCommand.js';
import GetOnlinePlayersWithUUIDCommand from './Commands/GetOnlinePlayersWithUUIDCommand.js';
import GetServerTPSCommand from './Commands/GetServerTPSCommand.js';
import InteractType from './MccTypes/InteractType.js';
import Hand from './MccTypes/Hand.js';
import InteractEntityCommand from './Commands/InteractEntityCommand.js';
import CreativeGiveCommand from './Commands/CreativeGiveCommand.js';
import CreativeDeleteCommand from './Commands/CreativeDeleteCommand.js';
import SendAnimationCommand from './Commands/SendAnimationCommand.js';
import Direction from './MccTypes/Direction.js';
import SendPlaceBlockCommand from './Commands/SendPlaceBlockCommand.js';
import UseItemInHandCommand from './Commands/UseItemInHandCommand.js';
import GetInventoryEnabledCommand from './Commands/GetInventoryEnabledCommand.js';
import GetPlayerInventoryCommand from './Commands/GetPlayerInventoryCommand.js';
import GetInventoriesCommand from './Commands/GetInventoriesCommand.js';
import WindowActionType from './MccTypes/WindowActionType.js';
import WindowActionCommand from './Commands/WindowActionCommand.js';
import ChangeSlotCommand from './Commands/ChangeSlotCommand.js';
import GetCurrentSlotCommand from './Commands/GetCurrentSlotCommand.js';
import ClearInventoriesCommand from './Commands/ClearInventoriesCommand.js';
import UpdateSignCommand from './Commands/UpdateSignCommand.js';
import CommandBlockMode from './MccTypes/CommandBlockMode.js';
import CommandBlockFlags from './MccTypes/CommandBlockFlags.js';
import SelectTradeCommand from './Commands/SelectTradeCommand.js';
import UpdateCommandBlockCommand from './Commands/UpdateCommandBlockCommand.js';
import CloseInventoryCommand from './Commands/CloseInventoryCommand.js';
import GetMaxChatMessageLengthCommand from './Commands/GetMaxChatMessageLengthCommand.js';
import RespawnCommand from './Commands/RespawnCommand.js';
import GetProtocolVersionCommand from './Commands/GetProtocolVersionCommand.js';
import ProtocolVersion from './MccTypes/ProtocolVersion.js';

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
                    this.responseQueue = this.responseQueue.filter(response => response.requestId !== command.getRequestId());
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

    public _OnWsCommandResponse(response: any): void {
        this.responseQueue.push(response as CommandResponse);
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

    // ChatBot commands
    protected async LogToConsole(message: string): Promise<boolean> {
        return await this.send(new LogToConsoleCommand(message)) as Promise<boolean>;
    }

    protected async LogDebugToConsole(message: string): Promise<boolean> {
        return await this.send(new LogDebugToConsoleCommand(message)) as Promise<boolean>;
    }

    protected async LogToConsoleTranslated(message: string): Promise<boolean> {
        return await this.send(new LogToConsoleTranslatedCommand(message)) as Promise<boolean>;
    }

    protected async LogDebugToConsoleTranslated(message: string): Promise<boolean> {
        return await this.send(new LogDebugToConsoleTranslatedCommand(message)) as Promise<boolean>;
    }

    protected async ReconnectToTheServer(extraAttempts: number, delaySeconds: number): Promise<boolean> {
        return await this.send(new ReconnectToTheServerCommand(extraAttempts, delaySeconds)) as Promise<boolean>;
    }

    protected async DisconnectAndExit(): Promise<boolean> {
        return await this.send(new DisconnectAndExitCommand()) as Promise<boolean>;
    }

    protected async RunScript(scriptName: string): Promise<boolean> {
        return await this.send(new RunScriptCommand(scriptName)) as Promise<boolean>;
    }

    protected async GetTerrainEnabled(): Promise<boolean> {
        return await this.send(new GetTerrainEnabledCommand()) as Promise<boolean>;
    }

    protected async SetTerrainEnabled(enabled: boolean): Promise<boolean> {
        return await this.send(new SetTerrainEnabledCommand(enabled)) as Promise<boolean>;
    }

    protected async GetEntityHandlingEnabled(): Promise<boolean> {
        return await this.send(new GetEntityHandlingEnabledCommand()) as Promise<boolean>;
    }

    protected async Sneak(toggle: boolean): Promise<boolean> {
        return await this.send(new SneakCommand(toggle)) as Promise<boolean>;
    }

    protected async SendEntityAction(actionType: EntityActionType): Promise<boolean> {
        return await this.send(new SendEntityActionCommand(actionType)) as Promise<boolean>;
    }

    protected async DigBlock(location: Location, swingArms: boolean = true, lookAtBlock: boolean = true): Promise<boolean> {
        return await this.send(new DigBlockCommand(location.x, location.y, location.z, swingArms, lookAtBlock)) as Promise<boolean>;
    }

    protected async SetSlot(slotId: number): Promise<boolean> {
        return await this.send(new SetSlotCommand(slotId)) as Promise<boolean>;
    }

    protected async GetWorld(): Promise<any> {
        return await this.send(new GetWorldCommand()) as Promise<any>;
    }

    protected async GetEntities(): Promise<Array<Entity>> {
        return await this.send(new GetEntitiesCommand()) as Promise<Array<Entity>>;
    }

    protected async GetPlayersLatency(): Promise<Array<any>> {
        return await this.send(new GetPlayersLatencyCommand()) as Promise<Array<any>>;
    }

    protected async GetCurrentLocation(): Promise<Location> {
        return await this.send(new GetCurrentLocationCommand()) as Promise<Location>;
    }

    protected async MoveToLocation(
        location: Location,
        allowUnsafe: boolean = false,
        allowDirectTeleport: boolean = false,
        maxOffset: number = 0,
        minOfset: number = 0
    ): Promise<Boolean> {
        return await this.send(new MoveToLocationCommand(
            location.x,
            location.y,
            location.z,
            allowUnsafe,
            allowDirectTeleport,
            maxOffset,
            minOfset
        )) as Promise<Boolean>;
    }

    protected async ClientIsMoving(): Promise<Boolean> {
        return await this.send(new ClientIsMovingCommand()) as Promise<Boolean>;
    }

    protected async LookAtLocation(location: Location): Promise<Boolean> {
        return await this.send(new LookAtLocationCommand(location.x, location.y, location.z)) as Promise<Boolean>;
    }

    protected async GetTimestamp(): Promise<string> {
        return await this.send(new GetTimestampCommand()) as Promise<string>;
    }

    protected async GetServerPort(): Promise<number> {
        return await this.send(new GetServerPortCommand()) as Promise<number>;
    }

    protected async GetServerHost(): Promise<string> {
        return await this.send(new GetServerHostCommand()) as Promise<string>;
    }

    protected async GetUsername(): Promise<string> {
        return await this.send(new GetUsernameCommand()) as Promise<string>;
    }

    protected async GetGamemode(): Promise<string> {
        return await this.send(new GetGamemodeCommand()) as Promise<string>;
    }

    protected async GetYaw(): Promise<number> {
        return await this.send(new GetYawCommand()) as Promise<number>;
    }

    protected async GetPitch(): Promise<number> {
        return await this.send(new GetPitchCommand()) as Promise<number>;
    }

    protected async GetUserUUID(): Promise<string> {
        return await this.send(new GetUserUUIDCommand()) as Promise<string>;
    }

    protected async GetOnlinePlayers(): Promise<any> {
        return await this.send(new GetOnlinePlayersCommand()) as Promise<any>;
    }

    protected async GetOnlinePlayersWithUUID(): Promise<any> {
        return await this.send(new GetOnlinePlayersWithUUIDCommand()) as Promise<any>;
    }

    protected async GetServerTPS(): Promise<number> {
        return await this.send(new GetServerTPSCommand()) as Promise<number>;
    }

    protected async InteractEntity(
        entityId: number,
        interactionType: InteractType,
        hand: Hand = Hand.MainHand
    ): Promise<boolean> {
        return await this.send(new InteractEntityCommand(entityId, interactionType, hand)) as Promise<boolean>;
    }

    protected async CreativeGive(slot: number, itemType: ItemType, count: number): Promise<boolean> {
        return await this.send(new CreativeGiveCommand(slot, itemType, count)) as Promise<boolean>;
    }

    protected async CreativeDelete(slot: number): Promise<boolean> {
        return await this.send(new CreativeDeleteCommand(slot)) as Promise<boolean>;
    }

    protected async SendAnimation(hand: Hand = Hand.MainHand): Promise<boolean> {
        return await this.send(new SendAnimationCommand(hand)) as Promise<boolean>;
    }

    protected async SendPlaceBlock(
        location: Location,
        direction: Direction,
        hand: Hand = Hand.MainHand
    ): Promise<boolean> {
        return await this.send(new SendPlaceBlockCommand(
            location.x,
            location.y,
            location.z,
            direction,
            hand)) as Promise<boolean>;
    }

    protected async UseItemInHand(): Promise<boolean> {
        return await this.send(new UseItemInHandCommand()) as Promise<boolean>;
    }

    protected async GetInventoryEnabled(): Promise<boolean> {
        return await this.send(new GetInventoryEnabledCommand()) as Promise<boolean>;
    }

    protected async GetPlayerInventory(): Promise<any> {
        return await this.send(new GetPlayerInventoryCommand()) as Promise<any>;
    }

    protected async GetInventories(): Promise<Array<any>> {
        return await this.send(new GetInventoriesCommand()) as Promise<Array<any>>;
    }

    protected async WindowAction(windowId: number, slotId: number, windowActionType: WindowActionType): Promise<boolean> {
        return await this.send(new WindowActionCommand(windowId, slotId, windowActionType)) as Promise<boolean>;
    }

    protected async ChangeSlot(slotId: number): Promise<boolean> {
        return await this.send(new ChangeSlotCommand(slotId)) as Promise<boolean>;
    }

    protected async GetCurrentSlot(): Promise<number> {
        return await this.send(new GetCurrentSlotCommand()) as Promise<number>;
    }

    protected async ClearInventories(): Promise<boolean> {
        return await this.send(new ClearInventoriesCommand()) as Promise<boolean>;
    }

    protected async UpdateSign(
        location: Location,
        line1: string,
        line2: string,
        line3: string,
        line4: string
    ): Promise<boolean> {
        return await this.send(new UpdateSignCommand(
            location.x,
            location.y,
            location.z,
            line1,
            line2,
            line3,
            line4)) as Promise<boolean>;
    }

    protected async SelectTrade(selectedSlot: number): Promise<boolean> {
        return await this.send(new SelectTradeCommand(selectedSlot)) as Promise<boolean>;
    }

    protected async UpdateCommandBlock(
        location: Location,
        command: string,
        mode: CommandBlockMode,
        flags: CommandBlockFlags
    ): Promise<boolean> {
        return await this.send(new UpdateCommandBlockCommand(
            location.x,
            location.y,
            location.z,
            command,
            mode,
            flags
        )) as Promise<boolean>;
    }

    protected async CloseInventory(windowId: number): Promise<boolean> {
        return await this.send(new CloseInventoryCommand(windowId)) as Promise<boolean>;
    }

    protected async GetMaxChatMessageLength(): Promise<number> {
        return await this.send(new GetMaxChatMessageLengthCommand()) as Promise<number>;
    }

    protected async Respawn(): Promise<boolean> {
        return await this.send(new RespawnCommand()) as Promise<boolean>;
    }

    protected async GetProtocolVersion(): Promise<ProtocolVersion> {
        return await this.send(new GetProtocolVersionCommand()) as Promise<ProtocolVersion>;
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
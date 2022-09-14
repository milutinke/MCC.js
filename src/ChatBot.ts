import { Entity } from './MccTypes/Entity';
import { Item } from './MccTypes/Item';
import Location from './MccTypes/Location';
import WebSocket from "isomorphic-ws";

interface ChatBot {
    connection: WebSocket,

    // MCC.JS events
    RegisterChatBot: () => void,
    OnInitialize?: () => void,
    OnDestroy?: () => void,
    OnEventError?: (event: string, error: string) => void,
    OnUnhandledEvent?: (event: string, data: any) => void,
    OnWsCommandResponse?: (response: string) => void,

    // WebSocket ChatBot Events
    OnMccCommandResponse?: (response: string) => void,
    OnGameJoined?: () => void,
    OnBlockBreakAnimation?: (entity: Entity, location: Location, stage: number) => void,
    OnEntityAnimation?: (entity: Entity, animation: number) => void,
    OnChatPrivate?: (sender: string, message: string, rawText: string) => void
    OnChatPublic?: (sender: string, message: string, rawText: string) => void
    OnTeleportRequest?: (sender: string, rawText: string) => void,
    OnChatRaw?: (rawJson: any) => void,
    OnDisconnect?: (reason: string, message: string) => void,
    OnPlayerProperty?: (prop: any) => void,
    OnServerTpsUpdate?: (tps: number) => void,
    OnTimeUpdate?: (worldAge: number, timeOfDay: number) => void,
    OnEntityMove?: (entity: Entity) => void,
    OnInternalCommand?: (command: string, parameters: string, result: string) => void,
    OnEntitySpawn?: (entity: Entity) => void,
    OnEntityDespawn?: (entity: Entity) => void,
    OnHeldItemChange?: (itemSlot: number) => void,
    OnHealthUpdate?: (health: number, food: number) => void,
    OnExplosion?: (location: Location, strength: number, recordCount: number) => void,
    OnSetExperience?: (experienceBar: number, level: number, totalExperience: number) => void,
    OnGamemodeUpdate?: (playerName: string, uuid: string, gameMode: string) => void,
    OnLatencyUpdate?: (playerName: string, uuid: string, latency: number) => void,
    OnMapData?: (mapId: number, trackingPosition: number, locked: number, iconCount: number) => void,
    OnTradeList?: (windowId: number, trades: any, villagerInfo: any) => void,
    OnTitle?: (action: string, titleText: string, subtitleText: string, actionBarText: string, fadeIn: number, stay: number, rawJson: any) => void,
    OnEntityEquipment?: (entity: Entity, slot: number, item: Item) => void,
    OnEntityEffect?: (entity: Entity, effect: string, amplifier: number, duration: number, flags: number) => void,
    OnScoreboardObjective?: (objectiveName: string, mode: number, objectiveValue: string, type: number, rawJson: any) => void,
    OnUpdateScore?: (entityName: string, action: number, objectiveName: string, type: number) => void,
    OnInventoryUpdate?: (inventoryId: number) => void,
    OnInventoryOpen?: (inventoryId: number) => void,
    OnInventoryClose?: (inventoryId: number) => void,
    OnPlayerJoin?: (uuid: string, name: string) => void,
    OnPlayerLeave?: (uuid: string, name: string) => void,
    OnDeath?: () => void,
    OnRespawn?: () => void,
    OnEntityHealth?: (entity: Entity, health: number) => void,
    OnEntityMetadata?: (entity: Entity, metadata: any) => void,
    OnPlayerStatus?: (statusId: number) => void,
    OnNetworkPacket?: (packetId: number, isLogin: boolean, isInbound: boolean, packetData: any) => void
};

export default ChatBot;
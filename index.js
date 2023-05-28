import MccJsClient from "./dist/index.js";
import ChatBot from "./dist/ChatBot.js";
import LogLevel from "./dist/Logging/Contract/LogLevels.js";

class TestChatBot extends ChatBot {
    async OnInitialize() {
        this.info("[CHAT BOT] OnInitialize");
    }

    async OnDestroy() {
        this.info("[CHAT BOT] OnDestroy");
    }

    async OnGameJoined() {
        this.info("[CHAT BOT] OnGameJoined");
    }

    async OnChatPublic(username, message, rawText) {
        this.info(`[CHAT] ${username}: ${message}`);
    }

    async OnChatPrivate(username, message, rawText) {
        this.info(`[CHAT][Private Message] ${username}: ${message}`);
        await this.send(`/msg ${username} Echo: ${message}`);
    }

    async OnChatRaw(text, json) {
        this.info(`[RAW CHAT] Text: ${text} ${json ? ">>> " + json : ""}`);
    }

    async OnBlockBreakAnimation(entity, location, stage) {
        //this.info(`[ON BLOCK BREAK ANIMATION] ${JSON.stringify(entity)} ----- ${JSON.stringify(location)} ---- ${stage}`);
    }

    async OnEntityAnimation(entity, animation) {
        //this.info(`[ON ENTITY ANIMATION] ${JSON.stringify(entity)} ---- ${animation}`);
    }

    async OnDisconnect(reason, message) {
        this.info(`[ON DISCONNECT] ${reason} ---- ${message}`);
    }

    async OnPlayerProperty(prop) {
        this.info(`[ON PLAYER PROPERTY] ${JSON.stringify(prop)}`);
    }

    async OnServerTpsUpdate(tps) {
        //this.info(`[ON SERVER TPS] ${tps}`);
    }

    async OnTimeUpdate(worldAge, timeOfDay) {
        //this.info(`[ON TIME UPDATE] ${worldAge}`);
    }

    async OnEntityMove(entity) {
        //this.info(`[ON ENTITY MOVE] ${JSON.stringify(entity)}`);
    }

    async OnEntitySpawn(entity) {
        //this.info(`[ON ENTITY SPAWN] ${JSON.stringify(entity)}`);
    }

    async OnEntityDespawn(entity) {
        //this.info(`[ON ENTITY DESPAWN] ${JSON.stringify(entity)}`);
    }

    async OnHeldItemChange(slot) {
        this.info(`[ON HELD ITEM CHANGE] ${slot}`);
    }

    async OnHealthUpdate(health, food) {
        this.info(`[ON HEALTH CHANGE] Health: ${health} - Food: ${food}`);
        this.send(`Health: ${health} - Food: ${food}`);
    }

    async OnExplosion(location, strength, recordcount) {
        this.info(`[ON EXPLOSION] Location: ${JSON.stringify(location)} - Strength: ${strength} - Record Count: ${recordcount}`);
    }

    async OnSetExperience(experience, level, totalExperience) {
        this.info(`[ON SET EXPERIENCE] Experience: ${experience} - Level: ${level} - Total Experience: ${totalExperience}`);
    }

    async OnGamemodeUpdate(playerName, uuid, gamemode) {
        this.info(`Player "${playerName}" with UUID "${uuid}" has his/her game mode changed to: "${gamemode}"`);
        this.LogToConsole("Ack game mode update!");
        this.LogDebugToConsole("Ack game mode update!");
    }

    async OnLatencyUpdate(playerName, uuid, latency) {
        //console.log(`Player "${playerName}" with UUID "${uuid}" had his/her latency updated to to: "${latency}"`);
    }

    async OnEventError(event, message) {
        this.error(`[EVENT ERROR] ${event} >> ${JSON.stringify(message)}`);
    }

    async OnMapData(mapId, scale, trackingPosition, locked, icons, columnsUpdated, rowsUpdated, mapCoulmnX, mapRowZ, colors) {
        //this.debug(mapId, scale, trackingPosition, locked, icons, columnsUpdated, rowsUpdated, mapCoulmnX, mapRowZ, colors);
    }

    async OnTradeList(windowId, trades, villagerInfo) {
        this.info(`[ON TADE LIST] Window ID: ${windowId} - Trades: ${JSON.stringify(trades)} - Villager Info: ${JSON.stringify(villagerInfo)}`);
    }

    async OnEntityEquipment(entity, slot, item) {
        //this.info(`[ON ENTITY EQUIPMENT] ${JSON.stringify(entity)} - Slot: ${slot} - Item: ${item ?? "No item!"}`);
    }

    async OnEntityEffect(entity, effect, amplifier, duration, flags) {
        //this.info(`[ON ENTITY EQUIPMENT] ${JSON.stringify(entity)} - Effect: ${effect} - Amplifier: ${amplifier} - Duration: ${duration} - Flags: ${flags}`);
    }

    async OnScoreboardObjective(name, mode, value, type, json) {
        //this.info(`[ON SCOREBOARD OBJECTIVE] Name: ${name} - Mode: ${mode} - Value: ${value} - Type: ${type} - Json: ${json}`);
    }

    async OnUpdateScore(entityName, action, objectiveName, Value) {
        this.info(`[ON UPDATE SCORE] Entity Name: ${entityName} - Action: ${action} - Objective name: ${objectiveName} - Value: ${Value}`);
    }

    async OnInventoryUpdate(inventoryId) {
        this.info(`[ON INVENTORY UPDATE] ${inventoryId}`);
    }

    async OnInventoryOpen(inventoryId) {
        this.info(`[ON INVENTORY OPEN] ${inventoryId}`);
    }

    // TODO: See why the client does not send it.
    async OnInventoryClose(inventoryId) {
        this.info(`[ON INVENTORY CLOSE] ${inventoryId}`);
    }

    async OnPlayerJoin(uuid, name) {
        this.info(`[ON PLAYER JOIN] Name: ${name} - UUID: ${uuid}`);
    }

    async OnPlayerLeave(uuid, name) {
        this.info(`[ON PLAYER LEAVE] Name: ${name} - UUID: ${uuid}`);
    }

    async OnDeath() {
        this.info(`Died, automatically respawning!`);
        await this.Respawn();
    }

    async OnRespawn() {
        this.info(`Respawned!`);
    }

    async OnEntityHealth(entity, health) {
        //this.info(`[ON ENTITY HEALTH] Name: ${JSON.stringify(entity)} - Health: ${health}`);
    }

    async OnEntityMetadata(entity, metadata) {
        //this.info(`[ON ENTITY METADATA] Name: ${JSON.stringify(entity)} - Metadata: ${JSON.stringify(metadata)}`);
    }

    async OnPlayerStatus(statusId) {
        this.info(`[ON PLAYER STATUS] Status ID: ${statusId}`);
    }
}

const client = new MccJsClient({
    host: "127.0.0.1",
    port: 8043,
    password: "wspass12345",
    loggingEnabled: true,
    logLevels: LogLevel.Info | LogLevel.Warn | LogLevel.Error,
    chatBot: new TestChatBot(),
    sessionName: "Test Chat Bot",
    reconnect: true,
    reconnectTimeout: 15,
    reconnectAttempts: 3
});

client.connect();

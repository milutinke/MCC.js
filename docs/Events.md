# Events

These are the events which you can listen on.
Events are methods on the [`ChatBot`](https://github.com/milutinke/MCC.js/blob/master/src/ChatBot.ts) that are invoked when the MCC.js recieves an event from the MCC (WebSocket Chat Bot).

**NOTE: All of the events should me marked as async so you can send commands in them**

Example:

```javascript
async OnChatPublic(username, message, rawText) {
  this.info(`[CHAT] ${username}: ${message}`);
}
```

**The available events:**

## - `OnInitialize`

**Description:**
Invoked when the Chat Bot is ready to use.
Useful for initializing stuff.

**Parameters:**

- No parameters

**Return type** `void`

## - `OnDestroy`

**Description:**
Invoked when the MCC.js looses the connection.
Useful for de-initializing stuff.

**WARNING:** You can't send commands in this event because the MCC.js has been disconnected at this point.

**Parameters:**

- No parameters

**Return type** `void`

## - `OnEventError`

**Description:**
Invoked when there was an error with parsing an event sent by the MCC (WebSocket Chat Bot)

**Parameters:**

- `event`
  **Type:** `string`
- `error`
  **Type:** `string`

**Return type** `void`

## - `OnUnhandledEvent`

**Description:**
Invoked when an event that is not handled by the MCC.js is sent by the MCC (WebSocket Chat Bot).
Useful when a new event was added to the MCC, but the MCC.js was not updated to handle it.

**Parameters:**

- `event`
  **Type:** `string`
- `data`
  **Type:** `any`

**Return type** `void`

## - `OnGameJoined`

**Description:**
Invoked when the Bot joins a server.

**Parameters:**

- No parameters

**Return type** `void`

## - `OnBlockBreakAnimation`

**Description:**
Invoked when a block is broken in the world.

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)
  `location`
  **Type:** [`Location`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Location.ts)
- `stage`
  **Type:** `number`

**Return type** `void`

## - `OnEntityAnimation`

**Description:**
Invoked when an entity does an animation.

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)
- `animation`
  **Type:** `number`
  **Description** Animation id

**Return type** `void`

## - `OnChatPrivate`

**Description:**
Invoked when the MCC receives a private chat message.

**Parameters:**

- `sender`
  **Type:** `string`
  **Description:** An username of the player who sent a private message
- `message`
  **Type:** `string`
- `rawText`
  **Type:** `string`
  **Description:** Raw chat message, can contain JSON

**Return type** `void`

## - `OnChatPublic`

**Description:**
Invoked when a public message was sent in the chat

**Parameters:**

- `username`
  **Type:** `string`
  **Description:** An username of the player who sent a public message
- `message`
  **Type:** `string`
- `rawText`
  **Type:** `string`
  **Description:** Raw chat message, can contain JSON

**Return type** `void`

## - `OnTeleportRequest`

**Description:**
Invoked when the bot gets a teleport request

**Parameters:**

- `sender`
  **Type:** `string`
  **Description:** An username of the player who sent the teleport request
- `rawText`
  **Type:** `string`
  **Description:** Raw chat message, can contain JSON

**Return type** `void`

## - `OnChatRaw`

**Description:**
Invoked when any kind of chat message was received by the MCC.
Can contain JSON.

**Parameters:**

- `text`
  **Type:** `string`
  **Description:** Plain text without any colors or JSON
- `rawJson`
  **Type:** `any`
  **Description:** Raw chat message, can contain JSON

**Return type** `void`

## - `OnDisconnect`

**Description:**
Called when the bot has disconnected from a server.
At this point you can't send commands to the MCC.

**Parameters:**

- `reason`
  **Type:** `string`
  **Description:** Disconnect reason
- `message`
  **Type:** `string`
  **Description:** Disconnect message

**Return type** `void`

## - `OnPlayerProperty`

**Description:**
Invoked when player properties change

**Parameters:**

- `prop`
  **Type:** `any`

**Return type** `void`

## - `OnServerTpsUpdate`

**Description:**
Invoked when the server TPS changes/updates

**Parameters:**

- `tps`
  **Type:** `number`

**Return type** `void`

## - `OnTimeUpdate`

**Description:**
Invoked when the world time changes
**NOTE:** Invoked quite frequently, be careful of what you do here, performance wise.

**Parameters:**

- `worldAge`
  **Type:** `number`
- `timeOfDay`
  **Type:** `number`

**Return type** `void`

## - `OnEntityMove`

**Description:**
Invoked when an entity moves
**NOTE:** Invoked quite frequently, be careful of what you do here, performance wise.

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)

**Return type** `void`

## - `OnInternalCommand`

**Description:**
Invoked when an internal MCC command has been executed.

**Parameters:**

- `command`
  **Type:** `string`
- `parameters`
  **Type:** `string`
- `result`
  **Type:** `string`
  **Description:** If the command is not executed, it will be `NotRun`

**Return type** `void`

## - `OnEntitySpawn`

**Description:**
Invoked when an entity is spawned or enters the player radius.

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)

**Return type** `void`

## - `OnEntityDespawn`

**Description:**
Invoked when an entity is de-spawned or leaves the player radius.

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)

**Return type** `void`

## - `OnHeldItemChange`

**Description:**
Invoked when a held item is changed.

**Parameters:**

- `itemSlot`
  **Type:** `number`
  **Description:** The id of an inventory slot

**Return type** `void`

## - `OnHealthUpdate`

**Description:**
Invoked when player's health is updated.

**Parameters:**

- `health`
  **Type:** `number`
- `food`
  **Type:** `number`

**Return type** `void`

## - `OnExplosion`

**Description:**
Invoked when there is an explosion.

**Parameters:**
`location`
**Type:** [`Location`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Location.ts)

- `strength`
  **Type:** `number`
- `recordCount`
  **Type:** `number`
  **Description:** Number of blocks affected.

**Return type** `void`

## - `OnSetExperience`

**Description:**
Invoked when the player's experience is updated.

**Parameters:**

- `experienceBar`
  **Type:** `number`
  **Description:** Between `0.0` and `1.0`, used to render the XP bar fullness
- `level`
  **Type:** `number`
- `totalExperience`
  **Type:** `number`

**Return type** `void`

## - `OnGamemodeUpdate`

**Description:**
Invoked when the player's game mode has changed.

**Parameters:**

- `playerName`
  **Type:** `string`
- `uuid`
  **Type:** `string`
- `gameMode`
  **Type:** `string`

**Return type** `void`

## - `OnLatencyUpdate`

**Description:**
Invoked when the player's ping has changed.

**Parameters:**

- `playerName`
  **Type:** `string`
- `uuid`
  **Type:** `string`
- `latency`
  **Type:** `number`

**Return type** `void`

## - `OnMapData`

**Description:**
Invoked when map data is received.

**Parameters:**

- `mapId`
  **Type:** `number`
- `scale`
  **Type:** `number`
- `trackingPosition`
  **Type:** `boolean`
- `locked`
  **Type:** `boolean`
- `icons`
  **Type:** [`an array of MapIcon`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/MapIcon.ts)
- `columnsUpdated`
  **Type:** `number`
- `rowsUpdated`
  **Type:** `number`
- `mapCoulmnX`
  **Type:** `number`
- `mapRowZ`
  **Type:** `number`
- `colors`
  **Type:** `Array<number>`

**Return type** `void`

## - `OnTradeList`

**Description:**
Invoked when villager's trade list has been received/updated

**Parameters:**

- `windowId`
  **Type:** `number`
  **Description:** Inventory id
- `trades`
  **Type:** `array of objects`
- `villagerInfo`
  **Type:** `object`

**Return type** `void`

## - `OnTitle`

**Description:**
Invoked when a title action has been received.

**Parameters:**

- `action`
  **Type:** `string`
- `titleText`
  **Type:** `string`
- `subtitleText`
  **Type:** `string`
- `actionBarText`
  **Type:** `string`
- `fadeIn`
  **Type:** `number`
- `stay`
  **Type:** `number`
- `rawJson`
  **Type:** `any`

**Return type** `void`

## - `OnEntityEquipment`

**Description:**
Invoked when entity has changed or equipped equipment.

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)
- `slot`
  **Type:** `number`
- `item`
  **Type:** [`Item`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Item.ts#L1108)

**Return type** `void`

## - `OnEntityEffect`

**Description:**
Invoked when there are effects applied to an entity

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)
- `effect`
  **Type:** `string`
- `amplifier`
  **Type:** `number`
- `duration`
  **Type:** `number`
- `flags`
  **Type:** `number`

**Return type** `void`

## - `OnScoreboardObjective`

**Description:**
Invoked when scoreboard objective has been added.

**Parameters:**

- `objectiveName`
  **Type:** `string`
- `mode`
  **Type:** `number`
- `objectiveValue`
  **Type:** `string`
- `type`
  **Type:** `number`
- `rawJson`
  **Type:** `any`

**Return type:** `void`

## - `OnUpdateScore`

**Description:**
Invoked when scoreboard objective has been update/changed for an entity.

**Parameters:**

- `entityName`
  **Type:** `string`
- `action`
  **Type:** `number`
- `objectiveName`
  **Type:** `string`
- `type`
  **Type:** `number`

**Return type:** `void`

## - `OnInventoryUpdate`

**Description:**
Invoked when the an inventory has been updated.

**Parameters:**

- `inventoryId`
  **Type:** `number`
  **Description:** Inventory id

**Return type:** `void`

## - `OnInventoryOpen`

**Description:**
Invoked when a player opens an inventory.

**Parameters:**

- `inventoryId`
  **Type:** `number`
  **Description:** Inventory id

**Return type:** `void`

## - `OnInventoryClose`

**Description:**
Invoked when a player/server closes an inventory.

**Parameters:**

- `inventoryId`
  **Type:** `number`
  **Description:** Inventory id

**Return type:** `void`

## - `OnPlayerJoin`

**Description:**
Invoked when a player joins the server.

**Parameters:**

- `uuid`
  **Type:** `string`
- `name`
  **Type:** `string`

**Return type:** `void`

## - `OnPlayerLeave`

**Description:**
Invoked when a player leaves the server.

**Parameters:**

- `uuid`
  **Type:** `string`
- `name`
  **Type:** `string`

**Return type:** `void`

## - `OnDeath`

**Description:**
Invoked when the bot dies.

**Parameters:**
No parameters

**Return type:** `void`

## - `OnRespawn`

**Description:**
Invoked when the bot respawns.

**Parameters:**
No parameters

**Return type:** `void`

## - `OnEntityHealth`

**Description:**
Invoked when an entity health changes/updates.

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)
- `health`
  **Type:** `number`

**Return type:** `void`

## - `OnEntityMetadata`

**Description:**
Invoked when entity's metadata has been received/updated/changed.

**Parameters:**

- `entity`
  **Type:** [`Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)
- `metadata`
  **Type:** `any`

**Return type:** `void`

## - `OnPlayerStatus`

**Description:**
Invoked when player's status has been updated/changed.

**Parameters:**

- `statusId`
  **Type:** `number`

**Return type:** `void`

## - `OnNetworkPacket`

**Description:**
Invoked when a packet has been received by the MCC.

**Parameters:**

- `packetId`
  **Type:** `number`
- `isLogin`
  **Type:** `boolean`
  **Description**: Is the packet sent during the `login` phase. (Always false)
- `isInbound`
  **Type:** `boolean`
  **Description**: Is the packet sent from the server or by the MCC.
- `packetData`
  **Type:** `array of bytes`
  **Description:** A raw byte array

**Return type:** `void`

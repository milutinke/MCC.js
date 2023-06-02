# Commands

These are the commands which you can send to the MCC.
Commands are methods on the [`ChatBot`](https://github.com/milutinke/MCC.js/blob/master/src/ChatBot.ts) which you can use to send commands to the MCC.

**NOTE: All of the commands are asynchronous and you need to use await keyword with them**

Example:

```javascript
if(await GetTerrainEnabled())
    await DigBlock(new Location(-23, 67, 145), true, true);
```

**The available commands:**

## - `LogToConsole`

**Description:**

Log stuff in to the MCC console.

**Parameters:**

- `message`

  **Type:** `string`

**Return type:** `boolean`

## - `LogDebugToConsole`

**Description:**

Log stuff in to the MCC debug console channel.

**Parameters:**

- `message`

  **Type:** `string`

**Return type:** `boolean`

## - `LogToConsoleTranslated`

**Description:**

Log a translated string in to the MCC console.

**Parameters:**

- `message`

  **Type:** `string`

**Return type:** `boolean`

## - `LogDebugToConsoleTranslated`

**Description:**

Log a translated string in to the MCC debug console channel.

**Parameters:**

- `message`

  **Type:** `string`

**Return type:** `boolean`

## - `ReconnectToTheServer`

**Description:**

Reconnect to the server the MCC is connected to.

**Parameters:**

- `extraAttempts`

  **Type:** `number`

- `delaySeconds`

  **Type:** `number`

**Return type:** `boolean`

## - `DisconnectAndExit`

**Description:**

Disconnect MCC from the server and close the program.

**Parameters:**

- No parameters

## - `RunScript`

**Description:**

Run a MCC C# script.

**Parameters:**

- `scriptName`

  **Type:** `string`

**Return type:** `boolean`

## - `GetTerrainEnabled`

**Description:**

Check if the Terrain Handling is enabled.

**Parameters:**

- No parameters

**Return type:** `boolean`

## - `SetTerrainEnabled`

**Description:**

Try enabling the Terrain Handling.

**Parameters:**

- `enabled`

  **Type:** `boolean`

**Return type:** `boolean`

## - `GetEntityHandlingEnabled`

**Description:**

Check if the Entity Handling is enabled.

**Parameters:**

- No parameters

**Return type:** `boolean`

## - `Sneak`

**Description:**

Toggle sneak.

**Parameters:**

- `toggle`

  **Type:** `boolean`

## - `SendEntityAction`

**Description:**

Send an entity action.

**Parameters:**

- `actionType`

  **Type:** [`EntityActionType`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/EntityActionType.ts)

**Return type:** `boolean`

## - `DigBlock`

**Description:**

Dig a block in the world.

**Parameters:**

- `location`

  **Type:** `Location`

- `swingArms`

  **Type:** `boolean`

- `lookAtBlock`

  **Type:** `boolean`

**Return type:** `boolean`

## - `SetSlot`

**Description:**

Set the current active hot bar slot.

**Parameters:**

- `slotId`

  **Type:** `number`

**Return type:** `boolean`

## - `GetWorld`

**Description:**

Get world info.

**Parameters:**

- No parameters

**Return type:** `object`

## - `GetEntities`

**Description:**

Get a list of entities around the player.

**Parameters:**

- No parameters

**Return type:** [`array of Entity`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Entity.ts#L130)

## - `GetPlayersLatency`

**Description:**

Get a list of players and their latencies.

**Parameters:**

- No parameters

**Return type:** `array of object`

## - `GetCurrentLocation`

**Description:**

Get the current bot location in the world.

**Parameters:**

- No parameters

**Return type:** [`Location`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Location.ts)

## - `MoveToLocation`

**Description:**

Move to a location in the world.

**Parameters:**

- `location`

  **Type:** [`Location`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Location.ts)

- `allowUnsafe`

  **Type:** `boolean`

  **Description:** Allow the bot to go through unsafe areas, warning: it might get hurt.

- `allowDirectTeleport`

  **Type:** `boolean`

  **Description:** Allow bot to send a teleport packet.

- `maxOffset`

  **Type:** `number`

  **Description:** Maximum number of blocks from the location where the bot can stop.

- `minOfset`

  **Type:** `number`

  **Description:** Minimum number of blocks from the location where the bot can stop.

**Return type:** `boolean`

## - `ClientIsMoving`

**Description:**

Check if the bot is currently moving.

**Parameters:**

- No parameters

**Return type:** `boolean`

## - `LookAtLocation`

**Description:**

Make the bot look at a specific location.

**Parameters:**

- `location`

  **Type:** [`Location`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Location.ts)

**Return type:** `boolean`

## - `GetTimestamp`

**Description:**

Get current time in `yyyy-MM-dd HH:mm:ss` format.

**Parameters:**

- No parameters

**Return type:** `string`

## - `GetServerPort`

**Description:**

Get the current server port.

**Parameters:**

- No parameters

**Return type:** `number`

## - `GetServerHost`

**Description:**

Get the current server IPv4 address.

**Parameters:**

- No parameters

**Return type:** `string`

## - `GetUsername`

**Description:**

Get current logged in account username.

**Parameters:**

- No parameters

**Return type:** `string`

## - `GetGamemode`

**Description:**

Get the current game mode in which the bot is.

**Parameters:**

- No parameters

**Return type:** `string`

## - `GetYaw`

**Description:**

Get current bot yaw.

**Parameters:**

- No parameters

**Return type:** `number`

## - `GetPitch`

**Description:**

Get the current bot pitch.

**Parameters:**

- No parameters

- **Return type:** `number`

## - `GetUserUUID`

**Description:**

Get the UUID of the current account.

**Parameters:**

- No parameters

**Return type:** `string`

## - `GetOnlinePlayers`

**Description:**

Get a list of online players on the server.

**Parameters:**

- No parameters

**Return type:** `array of string`

## - `GetOnlinePlayersWithUUID`

**Description:**

Get a list of online players on the server with their nicknames and UUIDs.

**Parameters:**

- No parameters

**Return type:** `array of object`

## - `GetServerTPS`

**Description:**

Get the current server TPS.

**Parameters:**

- No parameters

**Return type:** `number`

## - `InteractEntity`

**Description:**

Interact with an entity.

**Parameters:**

- `entityId`

  **Type:** `number`

- `interactionType`

  **Type:** [`InteractType`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/InteractType.ts)

- `hand`

  **Type:** [`Hand`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Hand.ts)

  **Default value:** `Hand.MainHand`

  You can omit this parameter if you want to interact with the main hand.

**Return type:** `boolean`

## - `CreativeGive`

**Description:**

Give an item from the Creative Inventory.

**Parameters:**

- `slot`

  **Type:** `number`

  **Description:** The slot id in which the items will be added to.

- `itemType`

  **Type:** [`ItemType`](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/MccTypes/Item.ts#L1)

- `count`

  **Type:** `number`

  **Description** The number of items you want to give.

**Return type:** `boolean`

## - `CreativeDelete`

**Description:**

Clear an inventory slot of items in the Creative Mode.

**Parameters:**

- `slot`

  **Type:** `number`

  **Description:** The slot id from which the items will be deleted from.

**Return type:** `boolean`

## - `SendAnimation`

**Description:**

Send an animation, for example a hand swing.

**Parameters:**

- `hand`

  **Type:** [`Hand`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Hand.ts)

  **Default value:** `Hand.MainHand`

  You can omit this parameter if you want to interact with the main hand.

**Return type:** `boolean`

## - `SendPlaceBlock`

**Description:**

Place a block somewhere in the world.

**Parameters:**

- `location`

  **Type:** [`Location`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Location.ts)

- `direction`

  **Type:** [`Direction`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Direction.ts)

- `hand`

  **Type:** [`Hand`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Hand.ts)

**Return type:** `boolean`

## - `UseItemInHand`

**Description:**

Use an item in the hand.

**Parameters:**

- No parameters

**Return type:** `boolean`

## - `GetInventoryEnabled`

**Description:**

Check if the inventory is enabled.

**Parameters:**

- No parameters

**Return type:** `boolean`

## - `GetPlayerInventory`

**Description:**

Get the items in the player inventory.

**Parameters:**

- No parameters

**Return type:** `object`

## - `GetInventories`

**Description:**

Get opened inventories list and items in them.

**Parameters:**

- No parameters

**Return type:** `array of objects`

## - `WindowAction`

**Description:**

Send an inventory action, for example a click.

**Parameters:**

- `windowId`

  **Type:** `number`

  **Description:** An id of an inventory

- `slotId`

  **Type:** `number`

  **Description** An id of an inventory slot

- `windowActionType`

  **Type:** [`WindowActionType`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/WindowActionType.ts)

**Return type:** `boolean`

## - `ChangeSlot`

**Description:**

Change the currently selected hot bar slot.

**Parameters:** - `slotId`

**Type:** `number`

**Description** An id of an inventory slot.

**Return type:** `boolean`

## - `GetCurrentSlot`

**Description:**

Get the currently selected hot bar slot.

**Parameters:** 

- No Parameters

**Return type:** `number`

## - `ClearInventories`

**Description:**

Clear the list of opened inventories.

**Parameters:** 

- No Parameters

**Return type:** `boolean`

## - `UpdateSign`

**Description:**

Update the text in signs.

**Parameters:**

- `location`

  **Type:** [`Location`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Location.ts)

- `line1`

  **Type:** `string`

- `line2`

  **Type:** `string`

- `line3`

  **Type:** `string`

- `line4`

  **Type:** `string`

**Return type:** `boolean`

## - `SelectTrade`

**Description:**
Select a villager trade.

**Parameters:**

- `selectedSlot`

  **Type:** `number`

**Return type:** `boolean`

## - `UpdateCommandBlock`

**Description:**

Update the command block.

**Parameters:**

- `location`

  **Type:** [`Location`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/Location.ts)

- `command`

  **Type:** `string`

- `mode`

  **Type:** [`CommandBlockMode`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/CommandBlockMode.ts)

- `flags`

  **Type:** [`CommandBlockFlags`](https://github.com/milutinke/MCC.js/blob/master/src/MccTypes/CommandBlockFlags.ts)

**Return type:** `boolean`

## - `CloseInventory`

**Description:**

Close an inventory id.

**Parameters:**

- `windowId`

  **Type:** `number`

  **Description:** Inventory Id

**Return type:** `boolean`

## - `GetMaxChatMessageLength`

**Description:**

Get the max chat message length.

**Parameters:**

- No parameters

**Return type:** `number`

## - `Respawn`

**Description:**

Respawn the bot when it's dead.

**Parameters:**

- No parameters

**Return type:** `boolean`

## - `GetProtocolVersion`

**Description:**

Get the current protocol version

**Parameters:**

No parameters

**Return type:** `number`

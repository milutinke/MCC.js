<div align="center">

<img src="http://i.pics.rs/oo3pk.png" alt="Logo"/>

## MCC.JS

</div>

### Documentation

Welcome to the Documentation page for MCC.js. 
Here you will get a quick introduction on how to use MCC.js.

- [Using the client](#using-the-client)
- [Client configuration options](#client-configuration-options)
- [Creating a Chat Bot](#creating-a-chat-bot)
- [Events](docs/Events.md)
- [Commands](docs/Commands.md)
- [Example Chat Bot](#example-chat-bot)
- [Limitiations and notes](#limitiations-and-notes)

### Using the client

The MCC.js is instantiated as `MccJsClient` class, to which you will pass in the configuration object with options and your [`ChatBot`](https://github.com/milutinke/MCC.js/blob/master/src/ChatBot.ts) instance, in it's constructor.

```javascript
const client = new MccJsClient({ <options here> });
```

After you have initialized the client, you can use the following methods on it's instance:

- #### `connect()`

  To connect to the WebSocket Chat Bot.
  If connected already, this will reconnect the client.

- #### `disconnect()`

  To disconnect from the WebSocket Chat Bot.

### Client configuration options

The following options are available.

- #### `host`

  **Type:** `string`

  **Description:**
  The IP address of the server on which the MCC is running.
  **NOTE:** Do not include a port, this field is ipv4 only.

- #### `port`

  **Type:** `number`

  **Description:**
  The port on which the Web Socket Chat Bot is running.

- #### `password`

  **Type:** `string`

  **Description:**
  Password that is used to authenticate to the Web Socket Chat Bot.

- #### `chatBot`

  **Type:** [`class instance that extends ChatBot`](https://github.com/milutinke/MCC.js/blob/master/src/ChatBot.ts)

  **Description:**
  In this field you should pass in the instance of your class that extends the [`ChatBot`](https://github.com/milutinke/MCC.js/blob/master/src/ChatBot.ts) class.

- #### `sessionName` (**Optional**)

  **Type:** `string`

  **Description:**
  A custom session name for easier identification.
  It's recommended to use the same name as the class for the chat bot.

- #### `loggingEnabled`

  **Type:** `boolean`

  **Description:**
  Specify if the client do logging.

- #### `logger` (**Optional**)

  **Type:** [`class instance that implements Logger`](https://github.com/milutinke/MCC.js/blob/master/src/Logging/Contract/Logger.ts)

  **Description:**
  The MCC.js has a default [`ConsoleLogger`](https://github.com/milutinke/MCC.js/blob/master/src/Logging/ConsoleLogger.ts), if you need to log in to a database, or somewhere else, you can make your own logger class by implementing the [`Logger`](https://github.com/milutinke/MCC.js/blob/master/src/Logging/Contract/Logger.ts) interface.

- #### `logLevels` (**Optional**)

  **Type:** [`LogLevel`](https://github.com/milutinke/MCC.js/blob/master/src/Logging/Contract/LogLevels.ts)

  **Description:**
  If you want to limit the information that is logged, you can use one of the following log levels:

  - `LogLevel.Info`
  - `LogLevel.Warn`
  - `LogLevel.Error`

  **Default:**
  `LogLevel.Info | LogLevel.Warn | LogLevel.Warn`

- #### `reconnect` (**Optional**)

  **Type:** `boolean`

  **Description:**
  If you want the client to reconnect to the WebSocket Chat Bot if the connection dies, enable this.

  **NOTE:** This does not reconnect the MCC to a server.

- #### `reconnectTimeout` (**Optional**)

  **Type:** `number`

  **Description:**
  Wait N seconds between reconnecting attempts.

  **Default:** `30`

- #### `reconnectAttempts` (**Optional**)

  **Type:** `number`

  **Description:**
  Limit the number of reconnect attempts.

  **Default:** `10`

### Creating a Chat Bot

In order to create a Chat Bot, you should create a class that extends the [`ChatBot`](https://github.com/milutinke/MCC.js/blob/master/src/ChatBot.ts) class.

The Chat Bot class has a lot of useful methods, which represent events and are triggered when the Web Socket Chat Bot from the MCC sends an event over web socket.
You can see the avaliable methods [here](Events.md) or in [the code](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/ChatBot.ts#L568).

You can send events to the MCC via the MCC.js using the following methods (commands), see a list of commands [here](Commands.md) or in [the code](https://github.com/milutinke/MCC.js/blob/dc5ccfecb65284f021c94c8381c3d7fb4f36a2c3/src/ChatBot.ts#L307).

##### NOTE: Both event methods and command methods are asynchronous, thus they will not work without `async` for the event methods and `await` for the command methods.

### Example Chat Bot

Here is an example of a chat bot that echoes private messages, logs public messages to the console and automatically respawns.

```javascript
class TestChatBot extends ChatBot {
    // Called when the chat bot has been initialized and is ready for use
    async OnInitialize() {
        this.info("[CHAT BOT] OnInitialize");
    }

    // Called when the connection breaks and the client should be turned off
    // Useful for de-initializing stuff like database connections
    // NOTE: You can't communicate with the MCC at this point
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
        await this.send(`/msg ${username} Echo: ${message}`); // Echo out the private message
    }

    async OnDeath() {
        this.info(`Died, automatically respawning!`);
        await this.Respawn();
    }

    async OnRespawn() {
        this.info(`Respawned!`);
        await this.send(`Respawned!`); // Send a chat message to others that the bot has respawned
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
```

### Limitiations and notes

You should expect a bit of delay since the events and commands are being sent over the network using web socket, that is unavoidable limitation. This is even visible if running on the same local network.

In the current state MCC.js is less powerful than making Chat Bots in C# for MCC, but I am looking at making it better.

Current limitations:

- Noticable delay in processing compared to C# Chat Bots
- Not that easy to deal with inventories
- Not that easy to deal with entities
- Not that easy to deal with blocks

The MCC code changes frequently, thus you may expect this library to break sometimes.
Aslo, this library should considered as experimental for time being.

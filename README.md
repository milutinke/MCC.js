<div align="center">

<img src="http://i.pics.rs/oo3pk.png" alt="Logo"/>

## MCC.JS

</div>

### About

A **work in progress** JavaScript/TypeScript library for remote control and bot creation for the [Minecraft Console Client](https://github.com/MCCTeam/Minecraft-Console-Client) using RPC over [WebSocket](https://en.wikipedia.org/wiki/WebSocket) that can be used in Node JS.

### Documentation

You can read the documentation [here](docs/README.md)

### NOTE

This library is **work in progress** I do not guarante that it is complete and that it works 100%.

### Current state and Planned features

#### Current features

-   [x] Authentication

    The Authetication is implemented

-   [x] Session name changing

    Session name changing is implemented

-   [x] Event processing (All useful `ChatBot` events)

    All useful [ChatBot](https://github.com/MCCTeam/Minecraft-Console-Client/blob/master/MinecraftClient/Scripting/ChatBot.cs) events are being correctly recieved and processed.

-   [x] Asynchronous RPC

    Ability to execute procedures (methods) remotely using Web Socket

-   [x] Auto-Reconnect

    Auto reconnect to the Minecraft Console Client

    > **NOTE:** This option does not re-connect the client to the server, this reconnects the Chat Bot written using MCC.JS to the Minecraft Console Client.

-   [x] Documentation

#### Planned features / Roadmap / TODO

A part of the base work for this feature has been implemented already, it's currently being worked on.

-   [ ] NPM Package

-   [ ] Examples

-   [ ] Utility functions

    -   [ ] Entities
    -   [ ] Inventories
    -   [ ] Movement

-   [ ] Front end support

-   [ ] Deno version

### License

This project uses [LGPL-3.0-only](https://www.gnu.org/licenses/lgpl-3.0.html) license.

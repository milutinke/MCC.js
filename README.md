<div align="center">

<img src="http://i.pics.rs/oo3pk.png" alt="Logo"/>

## MCC.jS

</div>

### About

A **work in progress** JavaScript/TypeScript library for remote control and bot creation for the [Minecraft Console Client](https://github.com/MCCTeam/Minecraft-Console-Client) using RPC over [WebSocket](https://en.wikipedia.org/wiki/WebSocket) that can be used in Node JS.

### NOTE

This library is **work in progress** I do not guarante that it is complete and that it works 100%, haven't done any proper testing yet.

Also, the [Web Socket Chat Bot](https://github.com/MCCTeam/Minecraft-Console-Client/pull/2126) that enables this has not yet been merged.

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

#### Planned features / Roadmap

    A part of the base work for this feature has been implemented already, it's currently being worked on.

-   [ ] Auto-Reconnect

-   [ ] Documentation

-   [ ] Examples

-   [ ] Utility functions

    -   [ ] Entities
    -   [ ] Inventories
    -   [ ] Movement

-   [ ] Front end support

-   [ ] Deno version

### License

This project uses [LGPL-3.0-only](https://www.gnu.org/licenses/lgpl-3.0.html) license.

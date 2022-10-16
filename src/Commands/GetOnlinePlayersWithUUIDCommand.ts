import Command from "./Contract/Command.js";

export default class GetOnlinePlayersWithUUIDCommand extends Command {
    constructor() {
        super("GetOnlinePlayersWithUUID");
    }
}
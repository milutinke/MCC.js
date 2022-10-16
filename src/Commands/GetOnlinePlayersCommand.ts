import Command from "./Contract/Command.js";

export default class GetOnlinePlayersCommand extends Command {
    constructor() {
        super("GetOnlinePlayers");
    }
}
import Command from "./Contract/Command.js";

export default class GetPlayersLatencyCommand extends Command {
    constructor() {
        super("GetPlayersLatency");
    }
}
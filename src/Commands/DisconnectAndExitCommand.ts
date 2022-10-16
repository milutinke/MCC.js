import Command from "./Contract/Command.js";

export default class DisconnectAndExitCommand extends Command {
    constructor() {
        super("DisconnectAndExit");
    }
}
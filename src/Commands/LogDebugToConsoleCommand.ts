import Command from "./Contract/Command.js";

export default class LogDebugToConsoleCommand extends Command {
    constructor(public message: string) {
        super("LogDebugToConsole");
    }
}
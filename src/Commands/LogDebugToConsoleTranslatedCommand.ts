import Command from "./Contract/Command.js";

export default class LogDebugToConsoleTranslatedCommand extends Command {
    constructor(public message: string) {
        super("LogDebugToConsoleTranslated");
    }
}
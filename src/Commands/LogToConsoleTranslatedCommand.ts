import Command from "./Contract/Command.js";

export default class LogToConsoleTranslatedCommand extends Command {
    constructor(public message: string) {
        super("LogToConsoleTranslated");
    }
}
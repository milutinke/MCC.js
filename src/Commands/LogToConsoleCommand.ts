import Command from "./Contract/Command.js";

export default class LogToConsoleCommand extends Command {
    constructor(public message: string) {
        super("LogToConsole");
    }
}
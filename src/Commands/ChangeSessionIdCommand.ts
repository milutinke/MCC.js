import Command from "./Contract/Command.js";

export default class ChangeSessionIdCommand extends Command {
    constructor(public sessionId: string) {
        super("ChangeSessionId");
    }
}
import Command from "./Contract/Command";

export default class ChangeSessionIdCommand extends Command {
    constructor(public sessionId: string) {
        super("ChangeSessionId");
    }
}
import Command from "./Contract/Command.js";

export default class ReconnectToTheServerCommand extends Command {
    constructor(public extraAttempts: number, public delaySeconds: number) {
        super("ReconnectToTheServer");
    }
}
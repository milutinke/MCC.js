import Command from "./Contract/Command.js";

export default class AuthenticateCommand extends Command {
    constructor(public password: string) {
        super("Authenticate");
    }
}
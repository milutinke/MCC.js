import Command from "./Contract/Command";

export default class AuthenticateCommand extends Command {
    constructor(public password: string) {
        super("Authenticate");
    }
}
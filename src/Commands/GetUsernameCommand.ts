import Command from "./Contract/Command.js";

export default class GetUsernameCommand extends Command {
    constructor() {
        super("GetUsername");
    }
}
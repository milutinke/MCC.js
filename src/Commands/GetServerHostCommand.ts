import Command from "./Contract/Command.js";

export default class GetServerHostCommand extends Command {
    constructor() {
        super("GetServerHost");
    }
}
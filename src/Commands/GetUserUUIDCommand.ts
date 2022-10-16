import Command from "./Contract/Command.js";

export default class GetUserUUIDCommand extends Command {
    constructor() {
        super("GetUserUUID");
    }
}
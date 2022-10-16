import Command from "./Contract/Command.js";

export default class GetProtocolVersionCommand extends Command {
    constructor() {
        super("GetProtocolVersion");
    }
}
import Command from "./Contract/Command.js";

export default class GetTimestampCommand extends Command {
    constructor() {
        super("GetTimestamp");
    }
}
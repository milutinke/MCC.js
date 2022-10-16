import Command from "./Contract/Command.js";

export default class GetMaxChatMessageLengthCommand extends Command {
    constructor() {
        super("GetMaxChatMessageLength");
    }
}
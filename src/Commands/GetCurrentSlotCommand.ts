import Command from "./Contract/Command.js";

export default class GetCurrentSlotCommand extends Command {
    constructor() {
        super("GetCurrentSlot");
    }
}
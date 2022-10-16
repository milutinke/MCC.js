import Command from "./Contract/Command.js";

export default class ChangeSlotCommand extends Command {
    constructor(public slotId: number) {
        super("ChangeSlot");
    }
}
import Command from "./Contract/Command.js";

export default class SetSlotCommand extends Command {
    constructor(public slotId: number) {
        super("SetSlot");
    }
}
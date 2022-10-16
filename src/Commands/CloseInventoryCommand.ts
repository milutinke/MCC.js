import Command from "./Contract/Command.js";

export default class CloseInventoryCommand extends Command {
    constructor(public windowId: number) {
        super("CloseInventory");
    }
}
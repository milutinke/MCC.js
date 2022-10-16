import Command from "./Contract/Command.js";

export default class GetPlayerInventoryCommand extends Command {
    constructor() {
        super("GetPlayerInventory");
    }
}
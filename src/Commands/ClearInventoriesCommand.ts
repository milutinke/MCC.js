import Command from "./Contract/Command.js";

export default class ClearInventoriesCommand extends Command {
    constructor() {
        super("ClearInventories");
    }
}
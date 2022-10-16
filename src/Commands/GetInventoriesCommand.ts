import Command from "./Contract/Command.js";

export default class GetInventoriesCommand extends Command {
    constructor() {
        super("GetInventories");
    }
}
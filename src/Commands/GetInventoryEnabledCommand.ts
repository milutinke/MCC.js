import Command from "./Contract/Command.js";

export default class GetInventoryEnabledCommand extends Command {
    constructor() {
        super("GetInventoryEnabled");
    }
}
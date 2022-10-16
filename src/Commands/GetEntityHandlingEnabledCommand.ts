import Command from "./Contract/Command.js";

export default class GetEntityHandlingEnabledCommand extends Command {
    constructor() {
        super("GetEntityHandlingEnabled");
    }
}
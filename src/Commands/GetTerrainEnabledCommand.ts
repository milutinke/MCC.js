import Command from "./Contract/Command.js";

export default class GetTerrainEnabledCommand extends Command {
    constructor() {
        super("GetTerrainEnabled");
    }
}
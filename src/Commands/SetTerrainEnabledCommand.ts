import Command from "./Contract/Command.js";

export default class SetTerrainEnabledCommand extends Command {
    constructor(public enabled: boolean) {
        super("SetTerrainEnabled");
    }
}
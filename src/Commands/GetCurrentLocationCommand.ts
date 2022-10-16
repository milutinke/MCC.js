import Command from "./Contract/Command.js";

export default class GetCurrentLocationCommand extends Command {
    constructor() {
        super("GetCurrentLocation");
    }
}
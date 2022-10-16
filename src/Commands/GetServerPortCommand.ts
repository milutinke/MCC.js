import Command from "./Contract/Command.js";

export default class GetServerPortCommand extends Command {
    constructor() {
        super("GetServerPort");
    }
}
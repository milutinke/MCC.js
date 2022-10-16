import Command from "./Contract/Command.js";

export default class GetServerTPSCommand extends Command {
    constructor() {
        super("GetServerTPS");
    }
}
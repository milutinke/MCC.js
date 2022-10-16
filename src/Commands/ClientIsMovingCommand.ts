import Command from "./Contract/Command.js";

export default class ClientIsMovingCommand extends Command {
    constructor() {
        super("ClientIsMoving");
    }
}
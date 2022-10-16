import Command from "./Contract/Command.js";

export default class UseItemInHandCommand extends Command {
    constructor() {
        super("UseItemInHand");
    }
}
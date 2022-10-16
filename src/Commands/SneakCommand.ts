import Command from "./Contract/Command.js";

export default class SneakCommand extends Command {
    constructor(public toggle: boolean) {
        super("Sneak");
    }
}
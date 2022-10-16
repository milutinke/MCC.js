import Command from "./Contract/Command.js";

export default class CreativeDeleteCommand extends Command {
    constructor(public slot: number) {
        super("CreativeDelete");
    }
}
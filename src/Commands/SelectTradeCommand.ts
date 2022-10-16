import Command from "./Contract/Command.js";

export default class SelectTradeCommand extends Command {
    constructor(public selectedSlot: number) {
        super("SelectTrade");
    }
}
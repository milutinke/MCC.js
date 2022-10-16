import { ItemType } from "../MccTypes/Item.js";
import Command from "./Contract/Command.js";

export default class CreativeGiveCommand extends Command {
    constructor(
        public slot: number,
        public itemType: ItemType,
        public count: number
    ) {
        super("CreativeGive");
    }
}
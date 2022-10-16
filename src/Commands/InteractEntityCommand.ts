import Hand from "../MccTypes/Hand.js";
import InteractType from "../MccTypes/InteractType.js";
import Command from "./Contract/Command.js";

export default class InteractEntityCommand extends Command {
    constructor(
        public entityId: number,
        public interactionType: InteractType,
        public hand: Hand
    ) {
        super("InteractEntity");
    }
}
import Direction from "../MccTypes/Direction.js";
import Hand from "../MccTypes/Hand.js";
import Command from "./Contract/Command.js";

export default class SendPlaceBlockCommand extends Command {
    constructor(
        public x: number,
        public y: number,
        public z: number,
        public direction: Direction,
        public hand: Hand) {
        super("SendPlaceBlock");
    }
}
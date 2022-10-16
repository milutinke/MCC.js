import Hand from "../MccTypes/Hand.js";
import Command from "./Contract/Command.js";

export default class SendAnimationCommand extends Command {
    constructor(public hand: Hand = Hand.MainHand) {
        super("SendAnimation");
    }
}
import Command from "./Contract/Command.js";

export default class DigBlockCommand extends Command {
    constructor(
        public x: number,
        public y: number,
        public z: number,
        public swingArms: boolean,
        public lookAtBlock: boolean) {
        super("DigBlock");
    }
}
import Command from "./Contract/Command.js";

export default class UpdateSignCommand extends Command {
    constructor(
        public x: number,
        public y: number,
        public z: number,
        public line1: string,
        public line2: string,
        public line3: string,
        public line4: string
    ) {
        super("UpdateSign");
    }
}
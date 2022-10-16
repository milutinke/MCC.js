import Command from "./Contract/Command.js";

export default class LookAtLocationCommand extends Command {
    constructor(
        public x: number,
        public y: number,
        public z: number) {
        super("LookAtLocation");
    }
}
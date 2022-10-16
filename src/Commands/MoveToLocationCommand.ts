import Command from "./Contract/Command.js";

export default class MoveToLocationCommand extends Command {
    constructor(
        public x: number,
        public y: number,
        public z: number,
        public allowUnsafe: boolean = false,
        public allowDirectTeleport: boolean = false,
        public maxOffset: number = 0,
        public minOfset: number = 0
    ) {
        super("MoveToLocation");
    }
}
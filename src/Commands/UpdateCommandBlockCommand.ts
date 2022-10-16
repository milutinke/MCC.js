import CommandBlockFlags from "../MccTypes/CommandBlockFlags.js";
import CommandBlockMode from "../MccTypes/CommandBlockMode.js";
import Command from "./Contract/Command.js";

export default class UpdateCommandBlockCommand extends Command {
    constructor(
        public x: number,
        public y: number,
        public z: number,
        public command: string,
        public mode: CommandBlockMode,
        public flags: CommandBlockFlags) {
        super("UpdateCommandBlock");
    }
}
import WindowActionType from "../MccTypes/WindowActionType.js";
import Command from "./Contract/Command.js";

export default class WindowActionCommand extends Command {
    constructor(
        public windowId: number,
        public slotId: number,
        public windowActionType: WindowActionType
    ) {
        super("WindowAction");
    }
}
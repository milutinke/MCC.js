import Command from "./Contract/Command.js";

export default class GetPitchCommand extends Command {
    constructor() {
        super("GetPitch");
    }
}
import Command from "./Contract/Command.js";

export default class GetYawCommand extends Command {
    constructor() {
        super("GetYaw");
    }
}
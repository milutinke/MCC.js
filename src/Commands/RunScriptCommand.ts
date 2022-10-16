import Command from "./Contract/Command.js";

export default class RunScriptCommand extends Command {
    constructor(public scriptName: string) {
        super("RunScript");
    }
}
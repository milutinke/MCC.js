import EntityActionType from "../MccTypes/EntityActionType.js";
import Command from "./Contract/Command.js";

export default class SendEntityActionCommand extends Command {
    constructor(public actionType: EntityActionType) {
        super("SendEntityAction");
    }
}
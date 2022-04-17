import ActionContainer from "./ActionContainer";
import ActorContainer from "./ActorContainer";

export default class DataManager {
    public actorContainer: ActorContainer = new ActorContainer();
    public actionContainer: ActionContainer = new ActionContainer();
    private static _ins: DataManager;
    public static get ins(): DataManager {
        if (this._ins == null) {
            this._ins = new DataManager();
        }
        return this._ins;
    }

    private constructor() {
        if (DataManager._ins) {
            throw "singleton class is not use new constructor!";
        }
    }

}
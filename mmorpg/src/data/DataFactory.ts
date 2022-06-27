import ActionTable from "./ActionTable";
import ActorTable from "./ActorTable";
import DataManager from "./DataManager";
import Actor from "../actor/Actor";

export default class DataFactory {
    constructor() {

    }

    static getActionById(id: number): ActionTable {
        let action = DataManager.ins.actionContainer.getActionById(id);
        if (action == null) {
            console.warn("找不到模板数据：" + id);
        }
        return action;
    }

    static getActorById(id: number): ActorTable {
        let actor = DataManager.ins.actorContainer.getActorById(id);
        if (actor == null) {
            console.warn("找不到角色模板数据：" + id);
        }
        return actor;
    }

    static getActionData(ownerId: number): ActionTable[] {
        let res: ActionTable[] = [];
        let dict = DataManager.ins.actionContainer.actionMap;
        for (let key in dict) {
            if (dict[key].ownerId == ownerId) {
                res.push(dict[key]);
            }
        }
        return res;
    }
}
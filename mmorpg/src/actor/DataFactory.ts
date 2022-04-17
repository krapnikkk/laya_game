import ActionTable from "../data/ActionTable";
import ActorTable from "../data/ActorTable";
import DataManager from "../data/DataManager";
import Actor from "./Actor";

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

    static getActionBeans(ownerId: number): ActionTable[] {
        let res: ActionTable[] = [];
        let dict = DataManager.ins.actionContainer.actionMap;
        for (let [key, value] of dict.entries()) {
            if (value.ownerId == ownerId) {
                res.push(value);
            }
        }
        return res;
    }
}
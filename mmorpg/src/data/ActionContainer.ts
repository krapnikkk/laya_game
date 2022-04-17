import { ActorState } from "../Enum";
import ActionTable from "./ActionTable";

export default class ActionContainer{
    private _actionMap: Map<number, ActionTable> = new Map();
    public get actionMap(): Map<number, ActionTable> {
        return this._actionMap;
    }
    public constructor(){
        let action: ActionTable = new ActionTable();
        action.ownerId = 1000;
        action.actionId = 10000;
        action.name = ActorState.IDLE;
        action.isLoop = true;
        this._actionMap.set(action.actionId, action);
    }

    public getActionById(id:number):ActionTable{
        if(this._actionMap.has(id)){
            return this._actionMap.get(id);
        }else{
            console.warn("can't not find action by id:" + id);
            return null;
        }
    }
}
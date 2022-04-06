import Actor from "../actor/Actor";
import State from "./State"

export default class StateMachine {
    public static InvalidState: string = "InvalidState"
    protected _owner: Object;
    public get owner(): Object {
        return this._owner;
    }
    public set owner(val: Object) {
        this._owner = val;
    }
    protected _stateDic: Map<string, State> = new Map();
    protected _currentState: State;
    protected _lastState: State;
    constructor(owner:Actor) {
        this.owner = owner;
    }

    registerState(stateKey: string, state: State): void {
        if(this._owner != state.owner){
            return;
        }
        this._stateDic.set(stateKey,state);
    }

    isExit(stateKey: string): boolean {
        return this._stateDic.has(stateKey);
    }

    changeState(key:string,obj:Object):void{
        let newState = this._stateDic.get(key);
        if(newState){
            this._currentState.onLeave(newState.getStateKey());
        }
        this._currentState = newState;
        this._currentState.onEnter(obj);
    }

    update():void{
        if(this._currentState!=null){
            this._currentState.onUpdate();
        }
    }

    getCurrentState():string{
        if(this._currentState){
            return this._currentState.getStateKey();
        }
        return StateMachine.InvalidState;
    }

    clear(){
        if(this._currentState){
            this._currentState.onLeave(StateMachine.InvalidState)
        }
        this._stateDic.clear();
        this._currentState = null;
    }
}
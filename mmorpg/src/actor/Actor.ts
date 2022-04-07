import ActorPropertyManager from "../property/ActorPropertyManager";
import ActorBase from "./ActorBase";
import StateMachine from "../core/StateMachine";
import { ActorType, ActorCamp } from "./ActorType";
import DisplayObjectController from "./DisplayObjectController";
import State from "../core/State";

export default class Actor extends ActorBase {
    protected _displayObjectController: DisplayObjectController;
    public get displayObjectController(): DisplayObjectController {
        return this._displayObjectController;
    }

    protected _stateMachine: StateMachine;
    public get stateMachine(): StateMachine{
        return this._stateMachine;
    }

    protected _propertyManager: ActorPropertyManager;
    public get propertyManager() {
        return this._propertyManager;
    }

    constructor(type: ActorType, camp: ActorCamp) {
        super(type, camp);
        this.registerStates();
        this._propertyManager = new ActorPropertyManager(this);
        this._displayObjectController = new DisplayObjectController(this);
    }

    registerStates():void{
        this._stateMachine = new StateMachine(this);
    }

    changeState(stateKey:string,obj:Object=null):void{
        if (this._stateMachine) {
            this._stateMachine.changeState(stateKey, obj)
        }
    }

    moveTo(position: Laya.Point) {
        if (this._displayObjectController) {
            this._displayObjectController.moveTo(position);
        }
    }

    update() {
        if (this._displayObjectController) {
            this._displayObjectController.update();
        }
    }
}
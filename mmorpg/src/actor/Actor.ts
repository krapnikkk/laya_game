import ActorPropertyManager from "../property/ActorPropertyManager";
import ActorBase from "./ActorBase";
import StateMachine from "../core/StateMachine";
import { ActorType, ActorCamp } from "./ActorType";
import DisplayObjectController from "./DisplayObjectController";
import State from "../core/State";
import { ActorPropertyType } from "../property/ActorPropertyType";
import DataManager from "../data/DataManager";
import DataFactory from "./DataFactory";
import ActionTable from "../data/ActionTable";

export default class Actor extends ActorBase {
    protected _displayObjectController: DisplayObjectController;
    public get displayObjectController(): DisplayObjectController {
        return this._displayObjectController;
    }

    protected _stateMachine: StateMachine;
    public get stateMachine(): StateMachine {
        return this._stateMachine;
    }

    protected _propertyManager: ActorPropertyManager;
    public get propertyManager() {
        return this._propertyManager;
    }

    constructor(templateId: number, type: ActorType, camp: ActorCamp) {
        super(templateId, type, camp);
        this.registerStates();
        this.initProperty();
        this._displayObjectController = new DisplayObjectController(this);
    }

    registerStates(): void {
        this._stateMachine = new StateMachine(this);
    }

    protected _actionMap:Map<string,number> = new Map();
    registerAction():void{
        let res = DataFactory.getActionBeans(this._templateId);
        res.forEach((action)=>{
            this._actionMap.set(action.name, action.actionId)
        })
        
    }

    initProperty(): void {
        this._propertyManager = new ActorPropertyManager(this);
        this._propertyManager.setBaseProperty(ActorPropertyType.HP, this._templateData.hp);
        this._propertyManager.setBaseProperty(ActorPropertyType.Atk, this._templateData.atk);
    }

    changeState(stateKey: string, obj: Object = null): void {
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
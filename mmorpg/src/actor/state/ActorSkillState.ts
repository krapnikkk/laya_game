import { ActorState } from "../../Enum";
import ActorStateBase from "./ActorStateBase";

export default class ActorSkillState extends ActorStateBase{
    constructor(owner:Object){
        super(owner);
    }

    onEnter(obj: Object = null): void {
        super.onEnter(obj);
        if(this._actor&&this._actor.displayObjectController.is3dObjLoaded){
            this._actor.displayObjectController.animationController.playAni("jineng",false,Laya.Handler.create(this,this.onAniFinish));
        }
    }

    private keyFrameHandler():void{
        // todo
    }

    private onAniFinish():void{
        this._actor.changeState(ActorState.IDLE);
    }
}
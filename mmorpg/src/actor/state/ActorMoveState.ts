import ActorStateBase from "./ActorStateBase";

export default class ActorMoveState extends ActorStateBase{
    constructor(owner:Object){
        super(owner);
    }

    onEnter(obj: Object = null): void {
        super.onEnter(obj);
        if(this._actor&&this._actor.displayObjectController.is3dObjLoaded){
            this._actor.displayObjectController.animationController.playAni("paobu");
        }
    }
}
import State from "../../core/State";
import Actor from "../Actor";

export default class ActorStateBase extends State{
    protected _actor: Actor
    constructor(owner: Object){
        super(owner);
        this._actor = owner as Actor;
    }

    onEnter(obj: Object): void {
        if (this._actor&&this._actor.displayObjectController.is3dObjLoaded){
            // this._actor.displayObjectController.animationController.playAni();
        }
    }

    onLeave(newState: string): void {
        
    }

    getStateKey(): string {
        return "";
    }

    onUpdate(): void {
        
    }
}
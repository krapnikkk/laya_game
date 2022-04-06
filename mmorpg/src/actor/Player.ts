import { ActorCamp, ActorType } from "./ActorType";
import Actor from "./Actor";

export default class Player extends Actor {

    private static _ins: Player;
    public static get ins(): Player {
        if (this._ins == null) {
            this._ins = new Player(ActorType.PLAYER, ActorCamp.PLAYER);
        }
        return this._ins;
    }

    private constructor(type: ActorType, camp: ActorCamp) {
        super(type, camp);
        if (Player._ins) {
            throw "singleton class is not use new constructor!";
        }
    }

    registerStates(){
        super.registerStates();
        // this.stateMachine.registerState()
    }
}
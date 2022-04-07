import { ActorCamp, ActorType } from "./ActorType";
import Actor from "./Actor";
import State from "../core/State";
import { ActorState } from "../Enum";
import ActorIdleState from "./state/ActorIdleState";
import ActorMoveState from "./state/ActorMoveState";
import ActorSkillState from "./state/ActorSkillState";

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
        this.stateMachine.registerState(ActorState.IDLE, new ActorIdleState(this))
        this.stateMachine.registerState(ActorState.Move, new ActorMoveState(this))
        this.stateMachine.registerState(ActorState.SKILL, new ActorSkillState(this))
    }
}
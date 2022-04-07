import Player from "./actor/Player";
import { ActorState } from "./Enum";
import SceneManager from "./scene/SceneManager";

export default class InputManager {
    private static _ins: InputManager;
    public static get ins(): InputManager {
        if (this._ins == null) {
            this._ins = new InputManager();
        }
        return this._ins;
    }

    private constructor() {
        if (InputManager._ins) {
            throw "singleton class is not use new constructor!";
        }
    }

    public init() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
    }

    private mouseHandler(e:Laya.Event) {
        let pos: Laya.Point = SceneManager.ins.getMousePos();
        Player.ins.moveTo(pos);
    }

    private onKeyDown(e: Laya.Event){
        // console.log(e);
        if(e.keyCode == 81){ //Q
            Player.ins.changeState(ActorState.Move);
        }else if(e.keyCode == 87){
            Player.ins.changeState(ActorState.SKILL);
        }
    }
}
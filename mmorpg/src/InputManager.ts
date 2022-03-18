import Player from "./Player";
import SceneManager from "./SceneManager";

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
    }

    private mouseHandler(e:Laya.Event) {
        let pos: Laya.Point = SceneManager.ins.getMousePos();
        Player.ins.moveTo(pos);
    }
}
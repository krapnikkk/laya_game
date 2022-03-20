import SceneManager from "../SceneManager";
import { ActorCamp, ActorType } from "./ActorType";
import BaseActor from "./BaseActor";

export default class Player extends BaseActor{
    private _displayerObject: Laya.Sprite;
    public get displayObject(): Laya.Sprite {
        return this._displayerObject;
    };
    private static _ins: Player;
    public static get ins(): Player {
        if (this._ins == null) {
            this._ins = new Player(ActorType.PLAYER,ActorCamp.PLAYER);
        }
        return this._ins;
    }

    private constructor(type:ActorType,camp:ActorCamp) {
        super(type,camp);
        if (Player._ins) {
            throw "singleton class is not use new constructor!";
        }
        this._displayerObject = new Laya.Sprite();
        let child = Laya.Sprite.fromImage("./res/player.png");
        this.displayObject.addChild(child);
        child.x -= 48;
        child.y -= 48;

        this.create3dObject();
    }

    private _moveTween: Laya.Tween;
    moveTo(position: Laya.Point) {
        if (this._moveTween) {
            this._moveTween.clear();
        }
        this._moveTween = Laya.Tween.to(this._displayerObject, {
            x: position.x,
            y: position.y,
        }, 1000);
    }

    private _displayerObject3d: Laya.Sprite3D;

    create3dObject(): void {
        Laya.Sprite3D.load("./res/3dScene/cike/Conventional/cike.lh", Laya.Handler.create(this, (sprite: Laya.Sprite3D) => {
            this._displayerObject3d = SceneManager.ins.container3d.addChild(sprite) as Laya.Sprite3D;
            this._displayerObject3d.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
            this._displayerObject3d.transform.localScale = new Laya.Vector3(0.05,0.05,0.05);
        }))
    }

    update() {
        if (this._displayerObject3d) {
            let pos = this.getGlobalVec3()
            let transform = new Laya.Vector3();
            SceneManager.ins.camera3d.convertScreenCoordToOrthographicCoord(pos,transform);
            // screenCoordTo3DCoord(pos, transform,GameConfig.width,GameConfig.height);
            this._displayerObject3d.transform.position = transform;
        }
    }

    public getGlobalVec3():Laya.Vector3{
        let pos =new Laya.Vector3();
        let point = SceneManager.ins.scene.localToGlobal(new Laya.Point(this._displayerObject.x, this._displayerObject.y));
        pos.x = point.x;
        pos.y = point.y;
        return pos;
    }
}
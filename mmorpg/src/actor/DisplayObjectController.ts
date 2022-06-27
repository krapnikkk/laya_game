import AnimationController from "./animation/AnimationController";
import SceneManager from "../scene/SceneManager";
import Actor from "./Actor";

export default class DisplayObjectController {
    protected _owner: Actor; 
    private _displayerObject: Laya.Sprite;
    public get displayObject(): Laya.Sprite {
        return this._displayerObject;
    };
    protected _displayerObject3d: Laya.Sprite3D;
    protected _animationController: AnimationController;
    public get animationController(): AnimationController{
        return this._animationController;
    }

    private _is3dObjLoaded:boolean = false;
    public get is3dObjLoaded():boolean{
        return this._is3dObjLoaded;
    }
    constructor(owner: Actor) {
        this._owner = owner;
        this.create2dObj();
        this.create3dObj();
    }

    create2dObj():void{
        this._displayerObject = new Laya.Sprite();
        // let child = Laya.Sprite.fromImage("./res/player.png");
        let child = Laya.Sprite.fromImage(this._owner.templateData.file2d);
        this.displayObject.addChild(child);
        child.x -= 48;
        child.y -= 48;

        // this.create3dObject();
    }

    create3dObj(): void {
        Laya.Sprite3D.load(this._owner.templateData.file3d, Laya.Handler.create(this, (sprite: Laya.Sprite3D) => {
            this._is3dObjLoaded = true;
            this._displayerObject3d = SceneManager.ins.container3d.addChild(sprite) as Laya.Sprite3D;
            this._displayerObject3d.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
            this._displayerObject3d.transform.localScale = new Laya.Vector3(0.05, 0.05, 0.05);
            // let mesh = sprite.getChildByName("mod_CiKeZhuangBei_Body_03") as Laya.MeshSprite3D;
            let animator = sprite.getComponent(Laya.Animator) as Laya.Animator;
            this._animationController = new AnimationController(animator,this._owner.actionMap);
            // animator.play("daiji");
        }))

    }

    update(){
        if (this._animationController) {
            this._animationController.update();
        }
        if (this._displayerObject3d) {
            let pos = this.getGlobalVec3()
            let transform = new Laya.Vector3();
            SceneManager.ins.camera3d.convertScreenCoordToOrthographicCoord(pos, transform);
            // screenCoordTo3DCoord(pos, transform,GameConfig.width,GameConfig.height);
            this._displayerObject3d.transform.position = transform;
        }
    }

    public getGlobalVec3(): Laya.Vector3 {
        let pos = new Laya.Vector3();
        let point = SceneManager.ins.scene.localToGlobal(new Laya.Point(this._displayerObject.x, this._displayerObject.y));
        pos.x = point.x;
        pos.y = point.y;
        return pos;
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
}
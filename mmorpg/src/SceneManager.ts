import Camera2D from "./Camera2D";
import { LayerEnum } from "./Enum";
import WorldMap from "./WorldMap";

export default class SceneManager {
    private static _ins: SceneManager;
    public static get ins(): SceneManager {
        if (this._ins == null) {
            this._ins = new SceneManager();
        }
        return this._ins;
    }

    private constructor() {
        if (SceneManager._ins) {
            throw "singleton class is not use new constructor!";
        }
    }

    private _scene: Laya.Sprite;
    private _layerMap: Laya.Sprite;
    private _layerActor: Laya.Sprite;
    private _layerEffect: Laya.Sprite;
    private _layerDic: Map<LayerEnum, Laya.Sprite> = new Map();
    private _camera2d:Camera2D;

    get camera2d():Camera2D{
        return this._camera2d;
    }

    public init(): void {
        this._layerMap = new Laya.Sprite();
        this._layerActor = new Laya.Sprite();
        this._layerEffect = new Laya.Sprite();
        this._scene = new Laya.Sprite();
        this._camera2d = new Camera2D(this._scene);
        
        this._scene.addChild(this._layerMap);
        this._scene.addChild(this._layerActor);
        this._scene.addChild(this._layerEffect);

        this._layerDic.set(LayerEnum.MapLayer, this._layerMap);
        this._layerDic.set(LayerEnum.ActorLayer, this._layerActor);
        this._layerDic.set(LayerEnum.EffectLayer, this._layerEffect);

        Laya.stage.addChild(this._scene);

    }


    public addToLayer(sprite: Laya.Sprite, layer: LayerEnum, x: number = 0, y: number = 0) {
        let layerSprite = this._layerDic.get(layer);
        if (layerSprite) {
            layerSprite.addChild(sprite);
            sprite.x = x;
            sprite.y = y;
        } else {
            console.warn("can't find layer: " + layer);
        }
    }

    getMousePos():Laya.Point{
        if(this._scene){
            return new Laya.Point(this._scene.mouseX,this._scene.mouseY);
        }else{
            return new Laya.Point();
        }
    }

    update(){
        if (this._camera2d) {
            this._camera2d.update();
        }
        WorldMap.ins.update();
    }
}
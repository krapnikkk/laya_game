import Camera2D from "./Camera2D";
import { LayerEnum } from "./Enum";
import GameConfig from "./GameConfig";
import { angleToRandin } from "./Utils";
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
    public get scene(): Laya.Sprite {
        return this._scene;
    }
    private _scene3d: Laya.Scene3D;
    private _layerMap: Laya.Sprite;
    public get scene3d(): Laya.Sprite {
        return this._scene3d;
    }
    private _layerActor: Laya.Sprite;
    private _layerEffect: Laya.Sprite;
    private _layerDic: Map<LayerEnum, Laya.Sprite> = new Map();
    private _camera2d: Camera2D;
    private _camera3d: Laya.Camera;
    public get camera3d():Laya.Camera{
        return this._camera3d;
    }
    private _container3d: Laya.Sprite3D = new Laya.Sprite3D();
    public get container3d(): Laya.Sprite3D{
        return this._container3d;
    }
    get camera2d(): Camera2D {
        return this._camera2d;
    }

    public init(): void {
        this.init2d();
        this.init3d();
    }

    public init2d(): void {
        this._layerMap = new Laya.Sprite();
        this._layerMap.name = "layerMap";
        this._layerActor = new Laya.Sprite();
        this._layerActor.name = "layerActor";
        this._layerEffect = new Laya.Sprite();
        this._layerEffect.name = "layerEffect";
        this._scene = new Laya.Sprite();
        this._scene.name = "scene";
        this._camera2d = new Camera2D(this._scene);

        this._scene.addChild(this._layerMap);
        this._scene.addChild(this._layerActor);
        this._scene.addChild(this._layerEffect);

        this._layerDic.set(LayerEnum.MapLayer, this._layerMap);
        this._layerDic.set(LayerEnum.ActorLayer, this._layerActor);
        this._layerDic.set(LayerEnum.EffectLayer, this._layerEffect);

        Laya.stage.addChild(this._scene);
    }

    public init3d(): void {
        this._scene3d = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
        this._scene3d.addChild(this._container3d);
        this._container3d.transform.rotationEuler = new Laya.Vector3(angleToRandin(30));
        this._camera3d = new Laya.Camera(10, 0.1, 300);
        this._scene3d.addChild(this._camera3d);
        this._camera3d.transform.translate(new Laya.Vector3(0, 0, 150));
        this._camera3d.orthographic = true;
        this._camera3d.orthographicVerticalSize = 10;
        this._camera3d.clearFlag = Laya.CameraClearFlags.SolidColor;
        this._camera3d.clearColor = new Laya.Vector4(0.0, 0.0, 0.0, 0.0);
        var renderTexture = new Laya.RenderTexture(GameConfig.width, GameConfig.height, Laya.RenderTextureFormat.R8G8B8A8, Laya.RenderTextureDepthFormat.DEPTHSTENCIL_NONE);
        this._camera3d.renderTarget = renderTexture;
        this._camera3d.orthographicVerticalSize = 10;
        this._camera3d.aspectRatio = 0;
        var scene3DImage = new Laya.Image();
        scene3DImage.source = new Laya.Texture(renderTexture);
        Laya.stage.addChild(scene3DImage);

        // Laya.Sprite3D.load("./res/3dScene/cike/Conventional/Main Camera.lh",
        //     Laya.Handler.create(this, (camera: Laya.Sprite3D) => {
        //         this._camera3d = this._scene3d.addChild(camera) as Laya.Camera;
        //         var renderTexture = new Laya.RenderTexture(512, 512, Laya.RenderTextureFormat.R8G8B8A8, Laya.RenderTextureDepthFormat.DEPTHSTENCIL_NONE);
        //         this._camera3d.renderTarget = renderTexture;
                // this._camera3d.clearFlag =Laya.BaseCamera.CLEARFLAG_SOLIDCOLOR;    
                // this._camera3d.clearColor = new Laya.Vector4(0, 0, 0, 0);
                // console.log(this._camera3d.clearColor);
            // }))

        // Laya.Sprite3D.load("./res/3dScene/cike/Conventional/cike.lh", Laya.Handler.create(this, (sprite: Laya.Sprite3D) => {
        //     Laya.Sprite3D.load("./res/3dScene/cike/Conventional/Main Camera.lh",
        //         Laya.Handler.create(this, (camera: Laya.Sprite3D) => {
        //             this._camera3d = this._scene3d.addChild(camera) as Laya.Camera;
        //             // sprite.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        //             this._scene3d.addChild(sprite);
        //         }))
        // }))
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

    getMousePos(): Laya.Point {
        if (this._scene) {
            return new Laya.Point(this._scene.mouseX, this._scene.mouseY);
        } else {
            return new Laya.Point();
        }
    }

    update() {
        if (this._camera2d) {
            this._camera2d.update();
        }
        WorldMap.ins.update();
    }
}
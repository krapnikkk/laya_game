(function () {
    'use strict';

    class Player extends Laya.Script3D {
        constructor() { super(); }
        onAwake() {
            this.characterCtrl = this.owner.addComponent(Laya.CharacterController);
            let collider = new Laya.SphereColliderShape(0.5);
            this.characterCtrl.colliderShape = collider;
            console.log(this.characterCtrl);
        }
        onEnable() {
        }
        onDisable() {
        }
        onCollisionEnter(collision) {
            this.characterCtrl.jump();
        }
    }

    class Rotation extends Laya.Script {
        constructor() {
            super();
            this._lastMouseX = 0;
            this._firstTouch = true;
        }
        onAwake() {
            if (Laya.Browser.onPC) {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
            }
        }
        onMouseDown(e) {
            this._lastMouseX = Laya.stage.mouseX;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        }
        onMouseMove(e) {
            let deltaX = Laya.stage.mouseX - this._lastMouseX;
            this._lastMouseX = Laya.stage.mouseX;
            this.owner.transform.rotate(new Laya.Vector3(0, deltaX / 5, 0), true, false);
        }
        onMouseUp() {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        }
        onEnable() {
        }
        onDisable() {
        }
        onUpdate() {
            if (Laya.Browser.onPC)
                return;
            if (this.owner.parent.input.touchCount() == 1) {
                let touch = this.owner.parent.input.getTouch(0);
                if (this._firstTouch) {
                    this._firstTouch = false;
                    this._lastMouseX = touch.position.x;
                }
                else {
                    let deltaX = touch.position.x - this._lastMouseX;
                    this._lastMouseX = Laya.stage.mouseX;
                    this.owner.transform.rotate(new Laya.Vector3(0, deltaX / 5, 0), true, false);
                }
            }
            else {
                this._firstTouch = true;
                this._lastMouseX = 0;
            }
        }
    }

    class App extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            Laya.Scene3D.load("res/3dScene/LayaScene_Main/Conventional/Main.ls", Laya.Handler.create(this, this.onLoaded));
        }
        onLoaded(scene) {
            Laya.stage.addChild(scene);
            scene.getChildByName("Parent").addComponent(Rotation);
            scene.getChildByName("Player").addComponent(Player);
        }
        onEnable() {
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scripts/App.ts", App);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map

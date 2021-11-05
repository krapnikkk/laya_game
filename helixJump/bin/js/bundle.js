var polea = (() => {
  // src/scripts/FollowCamera.ts
  var FollowCamera = class extends Laya.Script3D {
    constructor() {
      super();
    }
    onAwake() {
      Laya.stage.on("MoveCamera", this, this.follow);
      Laya.stage.on("Continue", this, this.reset);
    }
    onEnable() {
    }
    onDisable() {
    }
    follow(posY) {
      Laya.Tween.to(this.owner.transform, { localPositionY: posY }, 300);
    }
    reset() {
      console.log("reset");
      this.owner.transform.localPositionY = 1.3;
    }
  };

  // src/scripts/Player.ts
  var Player = class extends Laya.Script3D {
    constructor() {
      super();
      this._throughCount = 0;
    }
    onAwake() {
      this.characterCtrl = this.owner.addComponent(Laya.CharacterController);
      let collider = new Laya.SphereColliderShape(0.5);
      this.characterCtrl.colliderShape = collider;
      this.characterCtrl.jumpSpeed = 8;
      this.characterCtrl.fallSpeed = 10;
      this._physicsSimulation = this.owner.parent.physicsSimulation;
      this._ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3(0, -1, 0));
      this._hitResult = new Laya.HitResult();
      Laya.timer.frameLoop(1, this, this.rayCast);
      Laya.stage.on("Continue", this, this.reset);
    }
    onEnable() {
    }
    onDisable() {
    }
    reset() {
      this.owner.transform.localScaleY = 0.3;
      this.owner.transform.localPositionY = 0;
    }
    rayCast() {
      this._ray.origin = this.owner.transform.position;
      if (this._throughCount >= 3 && this._physicsSimulation.rayCast(this._ray, this._hitResult, 0.2)) {
        let collider = this._hitResult.collider;
        let numChildren = collider.owner.parent.numChildren;
        for (let i = 0; i < numChildren; i++) {
          let child = collider.owner.parent.getChildAt(i);
          child.name = "Bar";
          child.meshRenderer.material.albedoColor.x = 0;
          child.meshRenderer.material.albedoColor.y = 0;
          child.meshRenderer.material.albedoColor.z = 1;
        }
      }
      if (this._physicsSimulation.rayCast(this._ray, this._hitResult, 0.2)) {
        let collider = this._hitResult.collider;
        if (collider.owner.name == "Obstacle") {
          this.owner.transform.localScaleY = 0.15;
          Laya.stage.event("GameOver");
          return;
        }
        if (collider.isTrigger) {
          this._throughCount++;
          Laya.SoundManager.playSound("res/sounds/DestSound.mp3");
          collider.owner.parent.removeSelf();
          Laya.Pool.recover("Platform", collider.owner.parent);
          Laya.stage.event("MoveCamera", collider.owner.parent.transform.localPositionY);
          Laya.stage.event("SpawnPlatform");
          if (this._throughCount >= 3) {
            Laya.stage.event("Hint", 3);
            Laya.stage.event("AddScore", 3);
          } else {
            Laya.stage.event("Hint", 1);
            Laya.stage.event("AddScore", 1);
          }
        } else {
          this._throughCount = 0;
          Laya.SoundManager.playSound("res/sounds/jumpSound.mp3");
          this.characterCtrl.jump();
          Laya.stage.event("SpawnParticle", this._hitResult.point);
        }
      }
    }
  };

  // src/scripts/Rotation.ts
  var Rotation = class extends Laya.Script {
    constructor() {
      super();
      this._gameOver = false;
      this._lastMouseX = 0;
      this._firstTouch = true;
    }
    onAwake() {
      Laya.stage.on("GameOver", this, () => {
        this._gameOver = true;
      });
      if (Laya.Browser.onPC) {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
      }
      Laya.stage.on("Continue", this, this.reset);
    }
    reset() {
      this._gameOver = false;
      this.owner.transform.localRotationEulerY = 0;
    }
    onMouseDown(e) {
      this._lastMouseX = Laya.stage.mouseX;
      Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    }
    onMouseMove(e) {
      if (this._gameOver)
        return;
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
      if (Laya.Browser.onPC || this._gameOver)
        return;
      if (this.owner.parent.input.touchCount() == 1) {
        let touch = this.owner.parent.input.getTouch(0);
        if (this._firstTouch) {
          this._firstTouch = false;
          this._lastMouseX = touch.position.x;
        } else {
          let deltaX = touch.position.x - this._lastMouseX;
          this._lastMouseX = Laya.stage.mouseX;
          this.owner.transform.rotate(new Laya.Vector3(0, deltaX / 5, 0), true, false);
        }
      } else {
        this._firstTouch = true;
        this._lastMouseX = 0;
      }
    }
  };

  // src/scripts/SpawnParticle.ts
  var SpawnParticle = class extends Laya.Script {
    constructor() {
      super();
    }
    init(prefab, parent) {
      this._prefab = prefab;
      this._parent = parent;
      Laya.stage.on("SpawnParticle", this, this.spawn);
    }
    spawn(pos) {
      let sprite3D = Laya.Pool.getItemByCreateFun("Particle", this.create, this);
      this._parent.addChild(sprite3D);
      sprite3D.transform.localPosition = pos;
      Laya.timer.once(1500, this, () => {
        sprite3D.removeSelf();
        Laya.Pool.recover("Particle", sprite3D);
      });
    }
    create() {
      return Laya.Sprite3D.instantiate(this._prefab, this._parent);
    }
  };

  // src/scripts/SpawnPlatform.ts
  var SpawnPlatform = class extends Laya.Script {
    constructor() {
      super();
      this._curIdx = 0;
      this._curPosY = -1;
      this._spanHeight = 1.5;
      this._platformArr = [];
    }
    onEnable() {
    }
    onDisable() {
    }
    init(prefab, parent) {
      this._prefab = prefab;
      this._parent = parent;
      this.createPlatform();
      Laya.stage.on("SpawnPlatform", this, this.spawn);
      Laya.stage.on("Continue", this, this.reset);
    }
    reset() {
      this._platformArr.forEach((item) => {
        if (item.displayedInStage) {
          item.removeSelf();
          Laya.Pool.recover("Platform", item);
        }
      });
      this._curIdx = 0;
      this.createPlatform();
      this._platformArr = [];
    }
    createPlatform() {
      for (let i = 0; i < 5; i++) {
        this.spawn();
      }
    }
    spawn() {
      let sprite3D = Laya.Pool.getItemByCreateFun("Platform", this.create, this);
      let posY = this._curPosY - this._curIdx * this._spanHeight;
      sprite3D.transform.localPosition = new Laya.Vector3(0, posY, 0);
      this._parent.addChild(sprite3D);
      this.emptyPlatform(sprite3D);
      this._platformArr.push(sprite3D);
      this._curIdx++;
    }
    create() {
      return Laya.Sprite3D.instantiate(this._prefab, this._parent);
    }
    emptyPlatform(platform) {
      let count = 0;
      let obstacleIdx = this.getRandom(0, platform.numChildren - 1);
      if (this._curIdx == 0) {
        this.resetPlatform(platform);
        return;
      }
      for (let i = 0; i < platform.numChildren; i++) {
        let child = platform.getChildAt(i);
        child.meshRenderer.enable = true;
        child.getComponent(Laya.PhysicsCollider).isTrigger = false;
        child.meshRenderer.material.albedoColor.x = 0;
        child.meshRenderer.material.albedoColor.y = 0;
        child.meshRenderer.material.albedoColor.z = 0;
        child.name = "Bar";
        let rnd = this.getRandom(0, 10);
        if (obstacleIdx != i && count <= 4 && rnd > 8) {
          count++;
          child.meshRenderer.enable = false;
          child.getComponent(Laya.PhysicsCollider).isTrigger = true;
        } else if (obstacleIdx == i) {
          child.name = "Obstacle";
          child.meshRenderer.material.albedoColor.x = 1;
          child.meshRenderer.material.albedoColor.y = 0;
          child.meshRenderer.material.albedoColor.z = 0;
        }
      }
      if (count == 0) {
        let child = platform.getChildAt(0);
        child.name = "Bar";
        child.meshRenderer.enable = false;
        child.getComponent(Laya.PhysicsCollider).isTrigger = true;
      }
    }
    resetPlatform(platform) {
      for (let i = 0; i < platform.numChildren; i++) {
        let child = platform.getChildAt(i);
        child.meshRenderer.material.albedoColor.x = 0;
        child.meshRenderer.material.albedoColor.y = 0;
        child.meshRenderer.material.albedoColor.z = 0;
        child.name = "Bar";
        if (i == 0 || i == 1) {
          child.meshRenderer.enable = false;
          child.getComponent(Laya.PhysicsCollider).isTrigger = true;
        } else {
          child.meshRenderer.enable = true;
          child.getComponent(Laya.PhysicsCollider).isTrigger = false;
        }
      }
    }
    getRandom(min, max) {
      let delta = max - min;
      let randomValue = Math.random() * delta;
      return min + Math.round(randomValue);
    }
  };

  // src/scripts/App.ts
  var App = class extends Laya.Script {
    constructor() {
      super();
    }
    onAwake() {
      Laya.Scene3D.load("res/3dScene/LayaScene_Main/Conventional/Main.ls", Laya.Handler.create(this, this.onLoaded));
    }
    onLoaded(scene) {
      console.time("start");
      Laya.stage.addChild(scene);
      scene.zOrder = -1;
      let parent = scene.getChildByName("Parent");
      parent.addComponent(Rotation);
      console.timeEnd("start");
      Laya.stage.on("Continue", this, this.reset);
      Laya.timer.callLater(this, () => {
        let platform = parent.getChildByName("Platform");
        let platformPrefab = Laya.Sprite3D.instantiate(platform);
        platform.active = false;
        this.owner.addComponent(SpawnPlatform).init(platformPrefab, parent);
        scene.getChildByName("Main Camera").addComponent(FollowCamera);
        this._column = parent.getChildByName("Column");
        Laya.stage.on("SpawnPlatform", this, this.moveColumn);
        let player = scene.getChildByName("Player");
        player.addComponent(Player);
        let trail = scene.getChildByName("TrailRender");
        player.addChild(trail);
        trail.transform.localPosition = new Laya.Vector3();
        let particle = scene.getChildByName("Particle");
        let particlePrefab = Laya.Sprite3D.instantiate(particle);
        particle.active = false;
        this.owner.addComponent(SpawnParticle).init(particlePrefab, scene);
      });
    }
    moveColumn() {
      this._column.transform.localPositionY -= 1.5;
    }
    reset() {
      this._column.transform.localPositionY = 0;
    }
    onEnable() {
    }
    onDisable() {
    }
  };

  // src/scripts/ScoreHint.ts
  var ScoreHint = class extends Laya.Script {
    constructor() {
      super();
    }
    onEnable() {
    }
    onDisable() {
    }
    onAwake() {
      Laya.stage.on("Hint", this, this.show);
    }
    show(score) {
      let txt_hint = Laya.Pool.getItemByCreateFun("Hint", this.create, this);
      txt_hint.text = `+${score}`;
      Laya.stage.addChild(txt_hint);
      txt_hint.pos(250, 650);
      Laya.Tween.to(txt_hint, { y: 650 - 30 }, 500, Laya.Ease.backIn, Laya.Handler.create(this, () => {
        txt_hint.removeSelf();
        Laya.Pool.recover("Hint", txt_hint);
      }));
    }
    create() {
      return this.txt_Hint.create();
    }
  };

  // src/scripts/UIManager.ts
  var UIManager = class extends Laya.Script {
    constructor() {
      super();
      this._score = 0;
    }
    onAwake() {
      Laya.stage.on("AddScore", this, this.addScore);
      Laya.stage.on("GameOver", this, this.gameOver);
    }
    addScore(score) {
      this._score += score;
      this.txt_score.text = `${this._score}`;
    }
    gameOver() {
      this.panel_result.visible = true;
      this.txt_score.visible = false;
      this.panel_result.getChildByName("txt_result_score").text = `${this._score}`;
      this.panel_result.getChildByName("btn_continue").on(Laya.Event.CLICK, this, this.onContinue);
    }
    onContinue() {
      this._score = 0;
      this.txt_score.visible = true;
      this.panel_result.visible = false;
      Laya.stage.event("Continue");
      this.panel_result.getChildByName("btn_continue").off(Laya.Event.CLICK, this, this.onContinue);
    }
    onEnable() {
    }
    onDisable() {
    }
  };

  // src/GameConfig.ts
  var GameConfig = class {
    constructor() {
    }
    static init() {
      var reg = Laya.ClassUtils.regClass;
      reg("scripts/App.ts", App);
      reg("scripts/ScoreHint.ts", ScoreHint);
      reg("scripts/UIManager.ts", UIManager);
    }
  };
  GameConfig.width = 1080;
  GameConfig.height = 1920;
  GameConfig.scaleMode = "fixedwidth";
  GameConfig.screenMode = "vertical";
  GameConfig.alignV = "top";
  GameConfig.alignH = "left";
  GameConfig.startScene = "Main.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = true;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;
  GameConfig.init();

  // src/Main.ts
  var Main = class {
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
  };
  new Main();
})();
//# sourceMappingURL=bundle.js.map

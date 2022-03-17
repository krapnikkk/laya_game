var polea = (() => {
  // src/GameConfig.ts
  var GameConfig = class {
    constructor() {
    }
    static init() {
      var reg = Laya.ClassUtils.regClass;
    }
  };
  GameConfig.width = 1080;
  GameConfig.height = 1920;
  GameConfig.scaleMode = "fixedwidth";
  GameConfig.screenMode = "none";
  GameConfig.alignV = "top";
  GameConfig.alignH = "left";
  GameConfig.startScene = "index/StartScene.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;
  GameConfig.init();

  // src/UIManager.ts
  var UIManager = class {
    constructor() {
      this.gameStart = false;
      this.gem = 0;
      this.bestScore = 0;
      if (UIManager._ins) {
        throw "singleton class is not use new constructor!";
      }
    }
    static get ins() {
      if (this._ins == null) {
        this._ins = new UIManager();
      }
      return this._ins;
    }
    init() {
      Laya.stage.addChild(fgui.GRoot.inst.displayObject);
      this.homeView = fgui.UIPackage.createObject("home", "Main");
      fgui.GRoot.inst.addChild(this.homeView);
      this.initUI();
    }
    initUI() {
      let btn_start = this.homeView.getChild("btn_start");
      btn_start.onClick(this, this.startGame);
      let btn_left = this.homeView.getChild("btn_left");
      let btn_right = this.homeView.getChild("btn_right");
      btn_left.onClick(this, this.move, ["left"]);
      btn_right.onClick(this, this.move, ["right"]);
      this.txtBest = this.homeView.getChild("txt_best");
      this.txtGem = this.homeView.getChild("txt_gem");
      this.bestScore = +Laya.LocalStorage.getItem("best") || 0;
      this.txtBest.text = this.bestScore + "";
      this.startController = this.homeView.getController("status");
      Laya.stage.on("over", this, this.gameOver);
      Laya.stage.on("updateScore", this, this.updateScore);
    }
    move(direction) {
      if (this.gameStart) {
        Laya.stage.event("move", direction);
      }
    }
    startGame() {
      this.gameStart = true;
      Laya.stage.event("start");
      Laya.timer.resume();
      Laya.timer.scale = 1;
      this.startController.selectedIndex = 1;
    }
    gameOver() {
      this.gameStart = false;
      this.startController.selectedIndex = 0;
      if (this.bestScore < this.gem) {
        Laya.LocalStorage.setItem("best", this.gem + "");
        this.bestScore = this.gem;
      }
      this.txtBest.text = this.bestScore + "";
      this.gem = 0;
    }
    updateScore() {
      this.gem++;
      this.txtGem.text = this.gem + "";
    }
  };

  // src/utils.ts
  var rnd = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };
  var sleep = (delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  };

  // src/script/CameraFollow.ts
  var CameraFollow = class extends Laya.Script {
    onAwake() {
      this.transform = this.owner.transform;
      this.startPos = this.transform.position.clone();
      Laya.stage.on("MoveCamera", this, this.cameraMove);
      Laya.stage.on("start", this, this.startMove);
      Laya.stage.on("over", this, this.stopMove);
    }
    setTarget(target) {
      this.target = target.transform;
    }
    cameraMove() {
      if (!this.target) {
        return;
      }
      ;
      let nextPos = new Laya.Vector3(this.transform.position.x, this.target.position.y + 1.5, this.target.position.z);
      this.moveTween = Laya.Tween.to(this.transform, {
        localPositionX: nextPos.x,
        localPositionY: nextPos.y,
        localPositionZ: nextPos.z
      }, 250, Laya.Ease.linearIn);
    }
    stopMove() {
      if (this.moveTween) {
        Laya.Tween.clear(this.moveTween);
      }
    }
    startMove() {
      this.transform.position = this.startPos;
    }
  };

  // src/script/Gem.ts
  var Gem = class extends Laya.Script {
    constructor() {
      super();
    }
    onAwake() {
      this.child = this.owner.getChildByName("gem 3");
    }
    onUpdate() {
      let num = rnd(1, 3);
      let rotation = num == 1 ? new Laya.Vector3(0.1, 0, 0) : num ? new Laya.Vector3(0, 0.1, 0) : new Laya.Vector3(0, 0, 0.1);
      this.child.transform.rotate(rotation);
    }
    destroy() {
      this.owner.removeSelf();
      Laya.Pool.recover("gem", this.owner);
    }
    onDestroy() {
      this.destroy();
    }
  };

  // src/script/Spike.ts
  var Spike = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.targetPosition = new Laya.Vector3();
      this.start = true;
    }
    onStart() {
      let name = this.type == tileType.MOVIING_SPIKE ? "moving_spikes_b" : "smashing_spikes_b";
      let target = this.type == tileType.MOVIING_SPIKE ? new Laya.Vector3(0, 0, 0.15) : new Laya.Vector3(0, 0, 0.6);
      this.child = this.owner.getChildByName(name);
      this.floor = this.owner.getChildByName("normal_a2");
      this.originColor = this.floor.meshRenderer.material.albedoColor;
      this.normalPosition = new Laya.Vector3(0, 0, 0);
      Laya.Vector3.add(this.normalPosition, target, this.targetPosition);
      this.play();
    }
    resetFloor() {
      this.floor.meshRenderer.material.albedoColor = this.originColor;
    }
    setType(type) {
      this.type = type;
    }
    async play() {
      await sleep(2e3);
      this.up();
      await sleep(2e3);
      this.down();
      this.play();
    }
    up() {
      if (!this.start) {
        return;
      }
      this.upTween = Laya.Tween.to(this.child.transform, {
        localPositionX: this.targetPosition.x,
        localPositionY: this.targetPosition.y,
        localPositionZ: this.targetPosition.z
      }, 1e3, Laya.Ease.linearIn);
    }
    down() {
      if (!this.start) {
        return;
      }
      this.downTween = Laya.Tween.to(this.child.transform, {
        localPositionX: this.normalPosition.x,
        localPositionY: this.normalPosition.y,
        localPositionZ: this.normalPosition.z
      }, 1e3, Laya.Ease.linearIn);
    }
    stop() {
      console.log("stop");
      this.start = false;
      Laya.Tween.clearTween(this.upTween);
      Laya.Tween.clearTween(this.downTween);
    }
  };

  // src/script/MapManager.ts
  var tileType;
  (function(tileType2) {
    tileType2[tileType2["TILE"] = 0] = "TILE";
    tileType2[tileType2["HOLE"] = 1] = "HOLE";
    tileType2[tileType2["MOVIING_SPIKE"] = 2] = "MOVIING_SPIKE";
    tileType2[tileType2["SMASHING_SPIKE"] = 3] = "SMASHING_SPIKE";
  })(tileType || (tileType = {}));
  var MapManager = class extends Laya.Script {
    constructor() {
      super();
      this.tileList = [];
      this.tileWidth = 0.25;
      this.tileDistance = Math.SQRT2 * this.tileWidth;
      this.halfDistance = this.tileDistance / 2;
      this.rotation = new Laya.Vector3(-90, 45, 0);
      this.holeProbability = 0;
      this.movingProbability = 0;
      this.smashingProbability = 0;
      this.gemProbability = 2;
      this.downTileIndex = 0;
      this.fallDownSpan = 200;
      this.startFall = false;
      this.needBuild = false;
      Laya.stage.on("start", this, this.startFallDown);
      Laya.stage.on("over", this, this.stopFallDown);
    }
    onAwake() {
      this.tilePrefab = Laya.Loader.getRes("./res/3dScene/tile/Conventional/tile.lh");
      this.wallPrefab = Laya.Loader.getRes("./res/3dScene/wall/Conventional/wall.lh");
      this.gemPrefab = Laya.Loader.getRes("./res/3dScene/gem/Conventional/gem.lh");
      this.movingSpikePrefab = Laya.Loader.getRes("./res/3dScene/moving_spikes/Conventional/moving_spikes.lh");
      this.smashingSpikePrefab = Laya.Loader.getRes("./res/3dScene/smashing_spikes/Conventional/smashing_spikes.lh");
    }
    setPlayer(player) {
      this.playerController = player;
    }
    createMapItem(offsetZ = 0) {
      let deepColor = new Laya.Vector4(124 / 255, 155 / 255, 230 / 255, 1);
      let pureColor = new Laya.Vector4(125 / 255, 169 / 255, 233 / 255, 1);
      let wallColor = new Laya.Vector4(87 / 255, 93 / 255, 169 / 255, 1);
      for (let i = 0; i < 10; i++) {
        let gameObj;
        let pos;
        let list = [];
        for (let j = 0; j < 6; j++) {
          pos = new Laya.Vector3(j * this.tileDistance, 0, i * this.tileDistance + offsetZ);
          if (j == 0 || j == 5) {
            gameObj = Laya.Pool.getItemByCreateFun("wall", this.createWall, this);
            gameObj.meshRenderer.material.albedoColor = wallColor;
            gameObj.meshRenderer.castShadow = true;
          } else {
            let pr = this.calProbability();
            if (pr == 0) {
              gameObj = Laya.Pool.getItemByCreateFun("tile", this.createTile, this);
              let floor = gameObj.getChildByName("normal_a2");
              floor.meshRenderer.material.albedoColor = deepColor;
              gameObj.meshRenderer.receiveShadow = true;
              if (offsetZ != 0) {
                this.addGem(gameObj);
              }
            } else if (pr == 1) {
              gameObj = Laya.Pool.getItemByCreateFun("hole", this.createHole, this);
            } else if (pr == 2) {
              gameObj = Laya.Pool.getItemByCreateFun("moving_spikes", this.createMovingSpike, this);
              let spike = gameObj.addComponent(Spike);
              spike.setType(2);
            } else if (pr == 3) {
              gameObj = Laya.Pool.getItemByCreateFun("smashing_spikes", this.createSmashingSpike, this);
              let spike = gameObj.addComponent(Spike);
              spike.setType(3);
            }
          }
          gameObj.transform.rotationEuler = this.rotation;
          gameObj.transform.localPosition = pos;
          this.owner.addChild(gameObj);
          list[j] = gameObj;
        }
        this.tileList.push(list);
        list = [];
        for (let j = 0; j < 5; j++) {
          pos = new Laya.Vector3(j * this.tileDistance + this.halfDistance, 0, i * this.tileDistance + this.halfDistance + offsetZ);
          let pr = this.calProbability();
          if (pr == 0) {
            gameObj = Laya.Pool.getItemByCreateFun("tile", this.createTile, this);
            let floor = gameObj.getChildByName("normal_a2");
            floor.meshRenderer.material.albedoColor = pureColor;
            gameObj.meshRenderer.receiveShadow = true;
            if (offsetZ != 0) {
              this.addGem(gameObj);
            }
          } else if (pr == 1) {
            gameObj = Laya.Pool.getItemByCreateFun("hole", this.createHole, this);
          } else if (pr == 2) {
            gameObj = Laya.Pool.getItemByCreateFun("moving_spikes", this.createMovingSpike, this);
            let spike = gameObj.addComponent(Spike);
            spike.setType(2);
          } else if (pr == 3) {
            gameObj = Laya.Pool.getItemByCreateFun("smashing_spikes", this.createSmashingSpike, this);
            let spike = gameObj.addComponent(Spike);
            spike.setType(3);
          }
          gameObj.transform.rotationEuler = this.rotation;
          gameObj.transform.localPosition = pos;
          list[j] = gameObj;
          this.owner.addChild(gameObj);
        }
        this.tileList.push(list);
      }
    }
    resetMap() {
      for (let i = 0; i < this.tileList.length; i++) {
        for (let j = 0; j < this.tileList[i].length; j++) {
          let item = this.tileList[i][j];
          this.destroyItem(item, true);
        }
      }
      this.tileList.length = 0;
      this.downTileIndex = 0;
      this.holeProbability = 0;
      this.movingProbability = 0;
      this.smashingProbability = 0;
      this.gemProbability = 2;
      this.createMapItem();
      this.playerController.resetStatus();
      this.needBuild = false;
      Laya.timer.once(this.fallDownSpan, this, this.tileDown, null, false);
    }
    createWall() {
      return Laya.Sprite3D.instantiate(this.wallPrefab, this.owner);
    }
    createTile() {
      return Laya.Sprite3D.instantiate(this.tilePrefab, this.owner);
    }
    createHole() {
      return new Laya.Sprite3D("hole");
    }
    createMovingSpike() {
      return Laya.Sprite3D.instantiate(this.movingSpikePrefab, this.owner);
    }
    createSmashingSpike() {
      return Laya.Sprite3D.instantiate(this.smashingSpikePrefab, this.owner);
    }
    createGem() {
      return Laya.Sprite3D.instantiate(this.gemPrefab);
    }
    calProbability() {
      let pr = rnd(1, 100);
      if (pr < this.holeProbability) {
        return 1;
      } else if (31 < pr && pr < this.movingProbability + 30) {
        return 2;
      } else if (61 < pr && pr < this.smashingProbability + 60) {
        return 3;
      }
      return 0;
    }
    addProbability() {
      this.holeProbability += 2;
      this.movingProbability += 2;
      this.smashingProbability += 2;
    }
    calcGemcalProbability() {
      let pr = rnd(1, 100);
      if (pr <= this.gemProbability) {
        return true;
      }
      return false;
    }
    addGem(obj) {
      let pr = this.calcGemcalProbability();
      if (pr) {
        let gem = Laya.Pool.getItemByCreateFun("gem", this.createGem, this);
        obj.addChild(gem);
        let target = new Laya.Vector3(0, -0.1, 0.06);
        gem.transform.localPosition = target;
        gem.addComponent(Gem);
      }
    }
    startFallDown() {
      this.startFall = true;
      if (this.needBuild) {
        this.resetMap();
      } else {
        Laya.timer.once(this.fallDownSpan, this, this.tileDown, null, false);
      }
    }
    stopFallDown() {
      this.needBuild = true;
      this.startFall = false;
      Laya.timer.clear(this, this.tileDown);
    }
    tileDown() {
      if (!this.startFall) {
        return;
      }
      for (let i = 0; i < this.tileList[this.downTileIndex].length; i++) {
        let obj = this.tileList[this.downTileIndex][i];
        let rb = obj.getComponent(Laya.Rigidbody3D);
        rb = !rb ? obj.addComponent(Laya.Rigidbody3D) : rb;
        let boxShape = new Laya.BoxColliderShape(this.tileWidth, this.tileWidth, this.tileWidth);
        rb.colliderShape = boxShape;
        let num = rnd(1, 10);
        rb.angularVelocity = new Laya.Vector3(rnd(0, 1) * num, rnd(0, 1) * num, rnd(0, 1) * num);
        rb.gravity = new Laya.Vector3(0, -10, 0);
        let spike = obj.getComponent(Spike);
        if (spike) {
          spike.stop();
        }
        this.destroyItem(obj);
      }
      if (this.playerController.z == this.downTileIndex) {
        this.stopFallDown();
        this.playerController.fallDown();
      }
      this.tileList[this.downTileIndex].length = 0;
      this.downTileIndex++;
      Laya.timer.once(this.fallDownSpan, this, this.tileDown, null, false);
    }
    async destroyItem(item, now = false) {
      if (!now) {
        await sleep(1e3);
      }
      if (item.displayedInStage) {
        item.removeSelf();
        let rb = item.getComponent(Laya.Rigidbody3D);
        if (rb) {
          rb.angularVelocity = new Laya.Vector3();
          rb.gravity = new Laya.Vector3();
          rb.colliderShape = null;
        }
        let spike = item.getComponent(Spike);
        if (spike) {
          spike.resetFloor();
        }
        let child = item.getChildByName("gem");
        if (child) {
          child.removeSelf();
          Laya.Pool.recover(child.name, child);
        }
        Laya.Pool.recover(item.name, item);
      }
    }
  };

  // src/script/PlayerController.ts
  var PlayerController = class extends Laya.Script3D {
    constructor() {
      super();
      this.z = 5;
      this.x = 2;
      this.deepColor = new Laya.Vector4(122 / 255, 85 / 255, 179 / 255, 1);
      this.floorColor = new Laya.Vector4(126 / 255, 93 / 255, 183 / 255, 1);
      this.live = true;
    }
    onEnable() {
      Laya.stage.on("move", this, this.move);
    }
    createRole() {
      if (!this.characterCtrl) {
        this.characterCtrl = this.owner.addComponent(Laya.CharacterController);
      }
      let boxShape = new Laya.BoxColliderShape(0.2, 0.2, 0.2);
      this.characterCtrl.colliderShape = boxShape;
      this.characterCtrl.gravity = new Laya.Vector3(0, 0, 0);
      this.updatePlayerPosition();
    }
    setMap(map) {
      this.map = map;
    }
    resetStatus() {
      this.z = 5;
      this.x = 2;
      this.createRole();
      this.live = true;
    }
    move(keyCode) {
      if (!this.live) {
        return;
      }
      if (keyCode == "right") {
        if (this.x != 0) {
          this.z++;
        }
        if (this.z % 2 == 1 && this.x != 0) {
          this.x--;
        }
        this.updatePlayerPosition();
        this.calcPosition();
      } else if (keyCode == "left") {
        if (this.x != 4 || this.z % 2 != 1) {
          this.z++;
        }
        if (this.z % 2 == 0 && this.x != 4) {
          this.x++;
        }
        this.updatePlayerPosition();
        this.calcPosition();
      }
    }
    updatePlayerPosition() {
      if (this.live) {
        Laya.stage.event("MoveCamera");
      }
      let tile = this.map.tileList[this.z][this.x];
      let position = new Laya.Vector3();
      let transform = tile.transform;
      let floor = tile.getChildByName("normal_a2");
      if (floor) {
        floor.meshRenderer.material.albedoColor = this.z % 2 == 0 ? this.deepColor : this.floorColor;
      } else {
        this.fallDown();
      }
      Laya.Vector3.add(transform.position, new Laya.Vector3(0, this.map.tileWidth / 2, 0), position);
      this.owner.transform.position = position;
      this.owner.transform.rotation = transform.rotation;
      this.owner.transform.localRotationEulerX = 0;
    }
    calcPosition() {
      let tileListCount = this.map.tileList.length;
      if (tileListCount - this.z <= 15) {
        this.map.addProbability();
        let offsetZ = this.map.tileList[tileListCount - 1][0].transform.localPositionZ + this.map.halfDistance;
        this.map.createMapItem(offsetZ);
      }
    }
    onCollisionEnter(Collision) {
      let obj = Collision.other.owner.name;
      if (obj == "moving_spikes_b" || obj == "smashing_spikes_b") {
        this.live = false;
        this.gameOver();
      } else if (obj == "gem 3") {
        Collision.other.owner.parent.getComponent(Gem).destroy();
        Laya.stage.event("updateScore");
      }
    }
    async fallDown() {
      this.characterCtrl.gravity = new Laya.Vector3(0, -10, 0);
      this.live = false;
      await sleep(800);
      this.characterCtrl.colliderShape = null;
      this.gameOver();
    }
    gameOver() {
      Laya.timer.pause();
      Laya.timer.scale = 0;
      Laya.stage.event("over");
    }
  };

  // src/script/App.ts
  var App = class {
    constructor() {
      UIManager.ins.init();
      this.PreloadingRes();
    }
    PreloadingRes() {
      let cubes = ["books", "bread", "brick", "cake", "car", "cheese", "dice", "fruit", "hamburger", "icecube", "jar", "mushroom", "pilis", "safe", "sushi", "toster", "watermelon"];
      this.cubeName = cubes[rnd(0, cubes.length - 1)];
      var resource = [
        `./res/3dScene/cube/Conventional/cube_${this.cubeName}.lh`,
        "./res/3dScene/tile/Conventional/tile.lh",
        "./res/3dScene/moving_spikes/Conventional/moving_spikes.lh",
        "./res/3dScene/smashing_spikes/Conventional/smashing_spikes.lh",
        "./res/3dScene/wall/Conventional/wall.lh",
        "./res/3dScene/gem/Conventional/gem.lh"
      ];
      Laya.loader.create(resource, Laya.Handler.create(this, this.onPreLoadFinish));
    }
    onPreLoadFinish() {
      Laya.Scene3D.load("res/3dScene/LayaScene_Main/Conventional/Main.ls", Laya.Handler.create(this, this.onLoaded));
    }
    onLoaded(scene) {
      console.time("start");
      Laya.stage.addChild(scene);
      scene.zOrder = -1;
      this.start(scene);
    }
    start(scene) {
      let cube = Laya.loader.getRes(`./res/3dScene/cube/Conventional/cube_${this.cubeName}.lh`);
      let player = Laya.Sprite3D.instantiate(cube, scene);
      let playerController = player.addComponent(PlayerController);
      let platform = scene.getChildByName("Platform");
      let map = platform.addComponent(MapManager);
      let camera = scene.getChildByName("Main Camera");
      let cameraFollow = camera.addComponent(CameraFollow);
      let light = scene.getChildByName("Directional Light");
      light.shadowMode = Laya.ShadowMode.SoftHigh;
      map.createMapItem();
      map.setPlayer(playerController);
      playerController.setMap(map);
      playerController.createRole();
      cameraFollow.setTarget(player);
    }
  };

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
      Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    onVersionLoaded() {
      Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }
    onConfigLoaded() {
      this.loadUIRes();
      GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    }
    loadUIRes() {
      fgui.UIPackage.loadPackage("res/fui/home", Laya.Handler.create(this, this.onUILoaded));
    }
    onUILoaded() {
      new App();
    }
  };
  new Main();
})();
//# sourceMappingURL=bundle.js.map

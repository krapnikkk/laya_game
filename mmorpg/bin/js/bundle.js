var polea = (() => {
  // src/Enum.ts
  var LayerEnum;
  (function(LayerEnum2) {
    LayerEnum2[LayerEnum2["MapLayer"] = 0] = "MapLayer";
    LayerEnum2[LayerEnum2["ActorLayer"] = 1] = "ActorLayer";
    LayerEnum2[LayerEnum2["EffectLayer"] = 2] = "EffectLayer";
  })(LayerEnum || (LayerEnum = {}));

  // src/Player.ts
  var Player = class {
    static get ins() {
      if (this._ins == null) {
        this._ins = new Player();
      }
      return this._ins;
    }
    constructor() {
      if (Player._ins) {
        throw "singleton class is not use new constructor!";
      }
      this.displayObject = new Laya.Sprite();
      let child = Laya.Sprite.fromImage("./res/player.png");
      this.displayObject.addChild(child);
      child.x -= 48;
      child.y -= 48;
    }
    moveTo(position) {
      if (this._moveTween) {
        this._moveTween.clear();
      }
      this._moveTween = Laya.Tween.to(this.displayObject, {
        x: position.x,
        y: position.y
      }, 1e3);
    }
  };

  // src/GameConfig.ts
  var GameConfig = class {
    constructor() {
    }
    static init() {
      var reg = Laya.ClassUtils.regClass;
    }
  };
  GameConfig.width = 1334;
  GameConfig.height = 750;
  GameConfig.scaleMode = "noscale";
  GameConfig.screenMode = "none";
  GameConfig.alignV = "top";
  GameConfig.alignH = "left";
  GameConfig.startScene = "test/TestScene.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;
  GameConfig.init();

  // src/MapGrid.ts
  var MapGrid = class {
    constructor() {
      this.gridWidth = 6e3;
      this.gridHeight = 6e3;
      this.cellWidth = 300;
      this.cellHeight = 300;
      this.col = 20;
      this.row = 20;
    }
  };

  // src/MapTile.ts
  var MapTile = class {
    constructor(row, col, parent) {
      this._isLoaded = false;
      this._isLoading = false;
      this._row = row;
      this._col = col;
      this._parent = parent;
      this._resUrl = `./res/map_001/${this._row}_${this._col}.jpg`;
      this._displayobject = new Laya.Sprite();
    }
    loadTile() {
      this._handler = Laya.Handler.create(this, this.onLoaded);
      this._isLoading = true;
      Laya.loader.load(this._resUrl, this._handler);
    }
    onLoaded() {
      if (this._handler) {
        this._handler.recover();
      }
      this._isLoaded = true;
      this._isLoading = false;
      let texture = Laya.loader.getRes(this._resUrl);
      this._displayobject.graphics.drawTexture(texture, 0, 0);
      this._displayobject.x = this._col * 300;
      this._displayobject.y = this._row * 300;
      console.log(this._row, this._col);
      this._parent.addChild(this._displayobject);
    }
    unLoadTile() {
      this._displayobject.graphics.clear();
      if (this._isLoading) {
        Laya.loader.cancelLoadByUrl(this._resUrl);
        this._isLoading = false;
      } else {
        Laya.loader.clearRes(this._resUrl);
      }
      this._isLoaded = false;
      this._parent.removeChild(this._displayobject);
    }
  };

  // src/WorldMap.ts
  var WorldMap = class {
    constructor() {
      this._container = new Laya.Sprite();
      this._grid = new MapGrid();
      this._gridTiles = [];
      this._loadedTile = {};
      if (WorldMap._ins) {
        throw "singleton class is not use new constructor!";
      }
      this.init();
    }
    get container() {
      return this._container;
    }
    get grid() {
      return this._grid;
    }
    get gridTiles() {
      return this._gridTiles;
    }
    static get ins() {
      if (this._ins == null) {
        this._ins = new WorldMap();
      }
      return this._ins;
    }
    init() {
      this._createTiles();
    }
    _createTiles() {
      for (let col = 0; col < this._grid.col; col++) {
        this._gridTiles[col] = [];
        for (let row = 0; row < this._grid.row; row++) {
          this._gridTiles[col][row] = new MapTile(row, col, this._container);
        }
      }
    }
    getNeedLoadTile(x, y) {
      let cellWidth = this.grid.cellWidth;
      let cellHeight = this.grid.cellHeight;
      let rect = new Laya.Rectangle(x - cellWidth, y - cellHeight, GameConfig.width + cellWidth, GameConfig.height + cellHeight);
      let p1 = this.scenePosToGrid(rect.x, rect.y);
      let p2 = this.scenePosToGrid(rect.right, rect.bottom);
      let loadMap = {};
      for (let i = p1.x; i <= p2.x; i++) {
        for (let j = p1.y; j <= p2.y; j++) {
          let item = `${i}_${j}`;
          loadMap[item] = item;
        }
      }
      return loadMap;
    }
    scenePosToGrid(x, y) {
      let p = new Laya.Point();
      p.x = Math.floor(x / this._grid.cellWidth);
      p.y = Math.floor(y / this._grid.cellHeight);
      return p;
    }
    loadTiles(tiles) {
      let col, row, idxArr;
      for (let key in this._loadedTile) {
        if (!tiles[key]) {
          idxArr = key.split("_");
          col = +idxArr[0];
          row = +idxArr[1];
          this._gridTiles[col][row].unLoadTile();
          delete this._loadedTile[key];
        }
      }
      for (let key in tiles) {
        idxArr = key.split("_");
        col = +idxArr[0];
        row = +idxArr[1];
        if (!this._loadedTile[key]) {
          if (col < this.grid.col && row < this.grid.row) {
            this._gridTiles[col][row].loadTile();
            this._loadedTile[key] = key;
          }
        }
      }
    }
    update() {
      let cameraView = SceneManager.ins.camera2d.cameraView;
      let tiles = this.getNeedLoadTile(cameraView.x, cameraView.y);
      this.loadTiles(tiles);
    }
  };

  // src/Camera2D.ts
  var Camera2D = class {
    constructor(scene) {
      this._targetPos = new Laya.Point();
      this._ease = 25e-4;
      this._scene = scene;
      this._cameraView = new Laya.Rectangle(0, 0, GameConfig.width, GameConfig.height);
      this._scene.scrollRect = this.cameraView;
    }
    get cameraView() {
      return this._cameraView;
    }
    focus(target) {
      this._focusTarget = target;
      this._cameraView.x = this._focusTarget.x - (GameConfig.width >> 1);
      this._cameraView.y = this._focusTarget.y - (GameConfig.height >> 1);
    }
    update() {
      if (this._focusTarget) {
        let halfWidth = GameConfig.width >> 1, halfHeight = GameConfig.height >> 1;
        this._targetPos.x = this._focusTarget.x - halfWidth;
        this._targetPos.y = this._focusTarget.y - halfHeight;
        if (this._focusTarget.x + halfWidth < WorldMap.ins.grid.gridWidth && this._focusTarget.x - halfWidth > 0) {
          this._cameraView.x += (this._targetPos.x - this._cameraView.x) * Laya.timer.delta * this._ease;
        }
        if (this._focusTarget.y + halfHeight < WorldMap.ins.grid.gridHeight && this._focusTarget.y - halfHeight > 0) {
          this._cameraView.y += (this._targetPos.y - this._cameraView.y) * Laya.timer.delta * this._ease;
        }
      }
    }
  };

  // src/SceneManager.ts
  var SceneManager = class {
    constructor() {
      this._layerDic = new Map();
      if (SceneManager._ins) {
        throw "singleton class is not use new constructor!";
      }
    }
    static get ins() {
      if (this._ins == null) {
        this._ins = new SceneManager();
      }
      return this._ins;
    }
    get camera2d() {
      return this._camera2d;
    }
    init() {
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
    addToLayer(sprite, layer, x = 0, y = 0) {
      let layerSprite = this._layerDic.get(layer);
      if (layerSprite) {
        layerSprite.addChild(sprite);
        sprite.x = x;
        sprite.y = y;
      } else {
        console.warn("can't find layer: " + layer);
      }
    }
    getMousePos() {
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
  };

  // src/InputManager.ts
  var InputManager = class {
    static get ins() {
      if (this._ins == null) {
        this._ins = new InputManager();
      }
      return this._ins;
    }
    constructor() {
      if (InputManager._ins) {
        throw "singleton class is not use new constructor!";
      }
    }
    init() {
      Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
    }
    mouseHandler(e) {
      let pos = SceneManager.ins.getMousePos();
      Player.ins.moveTo(pos);
    }
  };

  // src/App.ts
  var App = class {
    constructor() {
      this.init();
    }
    init() {
      SceneManager.ins.init();
      SceneManager.ins.addToLayer(WorldMap.ins.container, LayerEnum.MapLayer);
      SceneManager.ins.addToLayer(Player.ins.displayObject, LayerEnum.ActorLayer, 1024, 1024);
      SceneManager.ins.camera2d.focus(Player.ins.displayObject);
      InputManager.ins.init();
      Laya.timer.frameLoop(1, this, this.update);
    }
    update() {
      SceneManager.ins.update();
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
      Laya.alertGlobalError(true);
      Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    onVersionLoaded() {
      Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }
    onConfigLoaded() {
      new App();
    }
  };
  new Main();
})();
//# sourceMappingURL=bundle.js.map

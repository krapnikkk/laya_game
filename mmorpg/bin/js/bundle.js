var polea = (() => {
  // src/Enum.ts
  var LayerEnum;
  (function(LayerEnum2) {
    LayerEnum2[LayerEnum2["MapLayer"] = 0] = "MapLayer";
    LayerEnum2[LayerEnum2["ActorLayer"] = 1] = "ActorLayer";
    LayerEnum2[LayerEnum2["EffectLayer"] = 2] = "EffectLayer";
  })(LayerEnum || (LayerEnum = {}));
  var ActorState;
  (function(ActorState2) {
    ActorState2["IDLE"] = "idle";
    ActorState2["Move"] = "move";
    ActorState2["FLY"] = "fly";
    ActorState2["SKILL"] = "skill";
    ActorState2["Dead"] = "dead";
  })(ActorState || (ActorState = {}));

  // src/actor/ActorType.ts
  var ActorType;
  (function(ActorType2) {
    ActorType2[ActorType2["PLAYER"] = 0] = "PLAYER";
    ActorType2[ActorType2["MONSTER"] = 1] = "MONSTER";
    ActorType2[ActorType2["NPC"] = 2] = "NPC";
  })(ActorType || (ActorType = {}));
  var ActorCamp;
  (function(ActorCamp2) {
    ActorCamp2[ActorCamp2["PLAYER"] = 0] = "PLAYER";
    ActorCamp2[ActorCamp2["ENEMY"] = 1] = "ENEMY";
    ActorCamp2[ActorCamp2["NEUTRAL"] = 2] = "NEUTRAL";
  })(ActorCamp || (ActorCamp = {}));

  // src/property/ActorProperty.ts
  var ActorProperty = class {
    constructor() {
      this._propertiesMap = new Map();
    }
    getProperty(type) {
      if (this._propertiesMap.has(type)) {
        return this._propertiesMap.get(type);
      } else {
        return -1;
      }
    }
    changeProperty(type, value) {
      let old = this.getProperty(type);
      value += old;
      this.setProperty(type, value);
    }
    setProperty(type, value) {
      this._propertiesMap.set(type, value);
    }
    clear() {
      this._propertiesMap.clear();
    }
  };

  // src/property/ActorPropertyType.ts
  var ActorPropertyType;
  (function(ActorPropertyType2) {
    ActorPropertyType2[ActorPropertyType2["HP"] = 0] = "HP";
    ActorPropertyType2[ActorPropertyType2["Speed"] = 1] = "Speed";
    ActorPropertyType2[ActorPropertyType2["FlySpeed"] = 2] = "FlySpeed";
    ActorPropertyType2[ActorPropertyType2["Atk"] = 3] = "Atk";
  })(ActorPropertyType || (ActorPropertyType = {}));

  // src/property/ActorPropertyManager.ts
  var ActorPropertyManager = class {
    constructor(owner) {
      this._owner = owner;
      this._baseProperty = new ActorProperty();
      this._deltaProperty = new ActorProperty();
      this.clear();
    }
    getBaseProperty(type) {
      return this._baseProperty[type];
    }
    setBaseProperty(type, value) {
      this._baseProperty.setProperty(type, value);
    }
    getProperty(type) {
      let max = this._baseProperty.getProperty(type);
      let delta = this._deltaProperty.getProperty(type);
      return max + delta;
    }
    changeProperty(type, value) {
      let max = this.getProperty(type) + value;
      if (max > this.getBaseProperty(type)) {
        this._deltaProperty.setProperty(type, 0);
      } else if (max <= 0) {
        this._deltaProperty.setProperty(type, -this.getBaseProperty(type));
      } else {
        this._deltaProperty.setProperty(type, value);
      }
    }
    clear() {
      for (let i = 0; i < Object.keys(ActorPropertyType).length; i++) {
        this._baseProperty.setProperty(i, 0);
        this._deltaProperty.setProperty(i, 0);
      }
    }
  };

  // src/data/ActorTable.ts
  var ActorTable = class {
  };

  // src/data/ActorContainer.ts
  var ActorContainer = class {
    constructor() {
      this._actorMap = new Map();
      let a1 = new ActorTable();
      a1.id = 1e3;
      a1.hp = 1e4;
      a1.atk = 20;
      a1.file2d = "./res/player.png";
      a1.file3d = "./res/3dScene/cike/Conventional/cike.lh";
      this._actorMap.set(a1.id, a1);
    }
    getActorById(id) {
      if (this._actorMap.has(id)) {
        return this._actorMap.get(id);
      } else {
        console.warn("can't not find actor by id:" + id);
        return null;
      }
    }
  };

  // src/data/DataManager.ts
  var DataManager = class {
    constructor() {
      this.actorContainer = new ActorContainer();
      if (DataManager._ins) {
        throw "singleton class is not use new constructor!";
      }
    }
    static get ins() {
      if (this._ins == null) {
        this._ins = new DataManager();
      }
      return this._ins;
    }
  };

  // src/actor/ActorBase.ts
  var ActorBase = class {
    get templateData() {
      return this._templateData;
    }
    get type() {
      return this._type;
    }
    get camp() {
      return this._camp;
    }
    constructor(templateId, type, camp) {
      this._type = type;
      this._camp = camp;
      this._templateId = templateId;
      this._templateData = DataManager.ins.actorContainer.getActorById(templateId);
    }
    isActorType(type) {
      return this._type == type;
    }
    isActorCamp(camp) {
      return this._camp == camp;
    }
  };

  // src/core/StateMachine.ts
  var _StateMachine = class {
    constructor(owner) {
      this._stateDic = new Map();
      this.owner = owner;
    }
    get owner() {
      return this._owner;
    }
    set owner(val) {
      this._owner = val;
    }
    registerState(stateKey, state) {
      if (this._owner != state.owner) {
        return;
      }
      this._stateDic.set(stateKey, state);
    }
    isExit(stateKey) {
      return this._stateDic.has(stateKey);
    }
    changeState(key, obj) {
      let newState = this._stateDic.get(key);
      if (!newState) {
        return;
      }
      if (this._currentState) {
        this._currentState.onLeave(newState.getStateKey());
      }
      this._currentState = newState;
      this._currentState.onEnter(obj);
    }
    update() {
      if (this._currentState != null) {
        this._currentState.onUpdate();
      }
    }
    getCurrentState() {
      if (this._currentState) {
        return this._currentState.getStateKey();
      }
      return _StateMachine.InvalidState;
    }
    clear() {
      if (this._currentState) {
        this._currentState.onLeave(_StateMachine.InvalidState);
      }
      this._stateDic.clear();
      this._currentState = null;
    }
  };
  var StateMachine = _StateMachine;
  StateMachine.InvalidState = "InvalidState";

  // src/actor/animation/AnimationController.ts
  var AnimationController = class {
    constructor(animator) {
      this._keyframe = -1;
      this._animator = animator;
    }
    playAni(name, isLoop = false, completeHandler = null) {
      if (this._animator) {
        this._completeHandler = completeHandler;
        this._animator.play(name);
        Laya.timer.frameLoop(1, this, () => {
          if (this._animator.getControllerLayer(0).getCurrentPlayState().normalizedTime >= 1) {
            this.onAniFinish();
          }
        });
      }
    }
    onAniFinish() {
      if (this._completeHandler) {
        this._completeHandler.run();
        this._completeHandler = null;
      }
    }
    stop() {
      this._keyframeHandler = null;
      this._completeHandler = null;
      this._keyframe = -1;
    }
    update() {
      if (this._isPlaying) {
        if (this._keyframe > 0 && this._keyframeHandler) {
          this._keyframeHandler.run();
          this._keyframeHandler = null;
        }
      }
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
  GameConfig.width = 750;
  GameConfig.height = 1334;
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

  // src/scene/MapGrid.ts
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

  // src/scene/MapTile.ts
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

  // src/scene/WorldMap.ts
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
      if (y < cellHeight) {
        debugger;
      }
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

  // src/scene/Camera2D.ts
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

  // src/Utils.ts
  var angleToRandin = (angle) => {
    return angle * Math.PI / 180;
  };

  // src/scene/SceneManager.ts
  var SceneManager = class {
    constructor() {
      this._layerDic = new Map();
      this._container3d = new Laya.Sprite3D();
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
    get scene() {
      return this._scene;
    }
    get scene3d() {
      return this._scene3d;
    }
    get camera3d() {
      return this._camera3d;
    }
    get container3d() {
      return this._container3d;
    }
    get camera2d() {
      return this._camera2d;
    }
    init() {
      this.init2d();
      this.init3d();
    }
    init2d() {
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
    init3d() {
      this._scene3d = Laya.stage.addChild(new Laya.Scene3D());
      this._scene3d.addChild(this._container3d);
      this._container3d.transform.rotationEuler = new Laya.Vector3(angleToRandin(30));
      this._camera3d = new Laya.Camera(10, 0.1, 300);
      this._scene3d.addChild(this._camera3d);
      this._camera3d.transform.translate(new Laya.Vector3(0, 0, 150));
      this._camera3d.orthographic = true;
      this._camera3d.orthographicVerticalSize = 10;
      this._camera3d.clearFlag = Laya.CameraClearFlags.SolidColor;
      this._camera3d.clearColor = new Laya.Vector4(0, 0, 0, 0);
      var renderTexture = new Laya.RenderTexture(GameConfig.width, GameConfig.height, Laya.RenderTextureFormat.R8G8B8A8, Laya.RenderTextureDepthFormat.DEPTHSTENCIL_NONE);
      this._camera3d.renderTarget = renderTexture;
      this._camera3d.orthographicVerticalSize = 10;
      this._camera3d.aspectRatio = 0;
      var scene3DImage = new Laya.Image();
      scene3DImage.source = new Laya.Texture(renderTexture);
      Laya.stage.addChild(scene3DImage);
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

  // src/actor/DisplayObjectController.ts
  var DisplayObjectController = class {
    constructor(owner) {
      this._is3dObjLoaded = false;
      this._owner = owner;
      this.create2dObj();
      this.create3dObj();
    }
    get displayObject() {
      return this._displayerObject;
    }
    get animationController() {
      return this._animationController;
    }
    get is3dObjLoaded() {
      return this._is3dObjLoaded;
    }
    create2dObj() {
      this._displayerObject = new Laya.Sprite();
      let child = Laya.Sprite.fromImage(this._owner.templateData.file2d);
      this.displayObject.addChild(child);
      child.x -= 48;
      child.y -= 48;
    }
    create3dObj() {
      Laya.Sprite3D.load(this._owner.templateData.file3d, Laya.Handler.create(this, (sprite) => {
        this._is3dObjLoaded = true;
        this._displayerObject3d = SceneManager.ins.container3d.addChild(sprite);
        this._displayerObject3d.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this._displayerObject3d.transform.localScale = new Laya.Vector3(0.05, 0.05, 0.05);
        let animator = sprite.getComponent(Laya.Animator);
        this._animationController = new AnimationController(animator);
      }));
    }
    update() {
      if (this._animationController) {
        this._animationController.update();
      }
      if (this._displayerObject3d) {
        let pos = this.getGlobalVec3();
        let transform = new Laya.Vector3();
        SceneManager.ins.camera3d.convertScreenCoordToOrthographicCoord(pos, transform);
        this._displayerObject3d.transform.position = transform;
      }
    }
    getGlobalVec3() {
      let pos = new Laya.Vector3();
      let point = SceneManager.ins.scene.localToGlobal(new Laya.Point(this._displayerObject.x, this._displayerObject.y));
      pos.x = point.x;
      pos.y = point.y;
      return pos;
    }
    moveTo(position) {
      if (this._moveTween) {
        this._moveTween.clear();
      }
      this._moveTween = Laya.Tween.to(this._displayerObject, {
        x: position.x,
        y: position.y
      }, 1e3);
    }
  };

  // src/actor/Actor.ts
  var Actor = class extends ActorBase {
    get displayObjectController() {
      return this._displayObjectController;
    }
    get stateMachine() {
      return this._stateMachine;
    }
    get propertyManager() {
      return this._propertyManager;
    }
    constructor(templateId, type, camp) {
      super(templateId, type, camp);
      this.registerStates();
      this.initProperty();
      this._displayObjectController = new DisplayObjectController(this);
    }
    registerStates() {
      this._stateMachine = new StateMachine(this);
    }
    initProperty() {
      this._propertyManager = new ActorPropertyManager(this);
      this._propertyManager.setBaseProperty(ActorPropertyType.HP, this._templateData.hp);
      this._propertyManager.setBaseProperty(ActorPropertyType.Atk, this._templateData.atk);
    }
    changeState(stateKey, obj = null) {
      if (this._stateMachine) {
        this._stateMachine.changeState(stateKey, obj);
      }
    }
    moveTo(position) {
      if (this._displayObjectController) {
        this._displayObjectController.moveTo(position);
      }
    }
    update() {
      if (this._displayObjectController) {
        this._displayObjectController.update();
      }
    }
  };

  // src/core/State.ts
  var State = class {
    get owner() {
      return this._owner;
    }
    constructor(owner) {
      this._owner = owner;
    }
    onEnter(obj) {
    }
    onLeave(newState) {
    }
    getStateKey() {
      return "";
    }
    onUpdate() {
    }
  };

  // src/actor/state/ActorStateBase.ts
  var ActorStateBase = class extends State {
    constructor(owner) {
      super(owner);
      this._actor = owner;
    }
    onEnter(obj) {
      if (this._actor && this._actor.displayObjectController.is3dObjLoaded) {
      }
    }
    onLeave(newState) {
    }
    getStateKey() {
      return "";
    }
    onUpdate() {
    }
  };

  // src/actor/state/ActorIdleState.ts
  var ActorIdleState = class extends ActorStateBase {
    constructor(owner) {
      super(owner);
    }
    onEnter(obj = null) {
      super.onEnter(obj);
      if (this._actor && this._actor.displayObjectController.is3dObjLoaded) {
        this._actor.displayObjectController.animationController.playAni("daiji");
      }
    }
  };

  // src/actor/state/ActorMoveState.ts
  var ActorMoveState = class extends ActorStateBase {
    constructor(owner) {
      super(owner);
    }
    onEnter(obj = null) {
      super.onEnter(obj);
      if (this._actor && this._actor.displayObjectController.is3dObjLoaded) {
        this._actor.displayObjectController.animationController.playAni("paobu");
      }
    }
  };

  // src/actor/state/ActorSkillState.ts
  var ActorSkillState = class extends ActorStateBase {
    constructor(owner) {
      super(owner);
    }
    onEnter(obj = null) {
      super.onEnter(obj);
      if (this._actor && this._actor.displayObjectController.is3dObjLoaded) {
        this._actor.displayObjectController.animationController.playAni("jineng", false, Laya.Handler.create(this, this.onAniFinish));
      }
    }
    keyFrameHandler() {
    }
    onAniFinish() {
      this._actor.changeState(ActorState.IDLE);
    }
  };

  // src/actor/Player.ts
  var Player = class extends Actor {
    static get ins() {
      if (this._ins == null) {
        this._ins = new Player(1e3, ActorType.PLAYER, ActorCamp.PLAYER);
      }
      return this._ins;
    }
    constructor(templateId, type, camp) {
      super(templateId, type, camp);
      if (Player._ins) {
        throw "singleton class is not use new constructor!";
      }
    }
    registerStates() {
      super.registerStates();
      this.stateMachine.registerState(ActorState.IDLE, new ActorIdleState(this));
      this.stateMachine.registerState(ActorState.Move, new ActorMoveState(this));
      this.stateMachine.registerState(ActorState.SKILL, new ActorSkillState(this));
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
      Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
    }
    mouseHandler(e) {
      let pos = SceneManager.ins.getMousePos();
      Player.ins.moveTo(pos);
    }
    onKeyDown(e) {
      if (e.keyCode == 81) {
        Player.ins.changeState(ActorState.Move);
      } else if (e.keyCode == 87) {
        Player.ins.changeState(ActorState.SKILL);
      }
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
      SceneManager.ins.addToLayer(Player.ins.displayObjectController.displayObject, LayerEnum.ActorLayer, 1024, 1024);
      SceneManager.ins.camera2d.focus(Player.ins.displayObjectController.displayObject);
      InputManager.ins.init();
      Player.ins.changeState(ActorState.IDLE);
      Laya.timer.frameLoop(1, this, this.update);
    }
    update() {
      SceneManager.ins.update();
      Player.ins.update();
    }
  };

  // src/Main.ts
  var Main = class {
    constructor() {
      let config3D = new Config3D();
      config3D.isAlpha = true;
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
      Laya.stage.bgColor = null;
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

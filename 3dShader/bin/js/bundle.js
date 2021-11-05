var polea = (() => {
  // src/mesh/VertexObject.ts
  var VertexObject = class {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.nx = 0;
      this.ny = 0;
      this.nz = 0;
      this.u = 0;
      this.v = 0;
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
    }
  };

  // src/mesh/MeshData.ts
  var MeshData = class {
    constructor() {
      this.vertexs = [];
      this.triangle = [];
    }
    createMesh() {
      let vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV,COLOR");
      let vbArray = [];
      for (let i = 0; i < this.vertexs.length; i++) {
        let vertex = this.vertexs[i];
        vbArray.push(vertex.x, vertex.y, vertex.z, vertex.nx, vertex.ny, vertex.nz, vertex.u, vertex.v, vertex.r, vertex.g, vertex.b, vertex.a);
      }
      let vertices = new Float32Array(vbArray);
      let indices = new Uint16Array(this.triangle);
      return Laya.PrimitiveMesh["_createMesh"](vertexDeclaration, vertices, indices);
    }
    addVertex(x, y, z, nx, ny, nz, u, v, r, g, b, a) {
      let vertex = new VertexObject();
      vertex.x = x;
      vertex.y = y;
      vertex.z = z;
      vertex.nx = nx;
      vertex.ny = ny;
      vertex.nz = nz;
      vertex.u = u;
      vertex.v = v;
      vertex.r = r;
      vertex.g = g;
      vertex.b = b;
      vertex.a = a;
      this.vertexs.push(vertex);
    }
    combineMesh(list) {
      for (let i = 0; i < list.length; i++) {
        let data = list[i];
        let begin = this.vertexs.length;
        for (let j = 0; j < data.vertexs.length; j++) {
          this.vertexs.push(data.vertexs[j]);
        }
        for (let j = 0; j < data.triangle.length; j++) {
          this.triangle.push(data.triangle[j] + begin);
        }
      }
      return this;
    }
  };

  // src/mesh/BoxMesh.ts
  var BoxMesh = class {
    static createBox(long = 1, height = 1, width = 1) {
      var halfLong = long / 2;
      var halfHeight = height / 2;
      var halfWidth = width / 2;
      var boxMesh = new MeshData();
      boxMesh.addVertex(-halfLong, halfHeight, -halfWidth, 0, 1, 0, 0, 0, 0, 0, 0, 1);
      boxMesh.addVertex(halfLong, halfHeight, -halfWidth, 0, 1, 0, 1, 0, 0, 0, 0, 1);
      boxMesh.addVertex(halfLong, halfHeight, halfWidth, 0, 1, 0, 1, 1, 0, 0, 0, 1);
      boxMesh.addVertex(-halfLong, halfHeight, halfWidth, 0, 1, 0, 0, 1, 0, 0, 0, 1);
      boxMesh.addVertex(-halfLong, -halfHeight, -halfWidth, 0, -1, 0, 0, 0, 0, 0, 0, 1);
      boxMesh.addVertex(halfLong, -halfHeight, -halfWidth, 0, -1, 0, 1, 0, 0, 0, 0, 1);
      boxMesh.addVertex(halfLong, -halfHeight, halfWidth, 0, -1, 0, 1, 0, 0, 0, 0, 1);
      boxMesh.addVertex(-halfLong, -halfHeight, halfWidth, 0, -1, 0, 0, 0, 0, 0, 0, 1);
      boxMesh.addVertex(-halfLong, halfHeight, -halfWidth, -1, 0, 0, 0, 0, 0, 0, 0, 1);
      boxMesh.addVertex(-halfLong, halfHeight, halfWidth, -1, 0, 0, 1, 0, 0, 0, 0, 1);
      boxMesh.addVertex(-halfLong, -halfHeight, halfWidth, -1, 0, 0, 1, 0, 0, 0, 0, 1);
      boxMesh.addVertex(-halfLong, -halfHeight, -halfWidth, -1, 0, 0, 0, 0, 0, 0, 0, 1);
      boxMesh.addVertex(halfLong, halfHeight, -halfWidth, 1, 0, 0, 1, 0, 0, 0, 0, 1);
      boxMesh.addVertex(halfLong, halfHeight, halfWidth, 1, 0, 0, 0, 0, 0, 0, 0, 1);
      boxMesh.addVertex(halfLong, -halfHeight, halfWidth, 1, 0, 0, 0, 0, 0, 0, 0, 1);
      boxMesh.addVertex(halfLong, -halfHeight, -halfWidth, 1, 0, 0, 1, 0, 0, 0, 0, 1);
      boxMesh.addVertex(-halfLong, halfHeight, halfWidth, 0, 0, 1, 0, 0, 1, 0, 0, 1);
      boxMesh.addVertex(halfLong, halfHeight, halfWidth, 0, 0, 1, 1, 0, 0, 1, 0, 0);
      boxMesh.addVertex(halfLong, -halfHeight, halfWidth, 0, 0, 1, 1, 1, 0, 0, 1, 1);
      boxMesh.addVertex(-halfLong, -halfHeight, halfWidth, 0, 0, 1, 0, 1, 1, 1, 0, 1);
      boxMesh.addVertex(-halfLong, halfHeight, -halfWidth, 0, 0, -1, 1, 0, 1, 0, 0, 1);
      boxMesh.addVertex(halfLong, halfHeight, -halfWidth, 0, 0, -1, 0, 0, 0, 1, 0, 0);
      boxMesh.addVertex(halfLong, -halfHeight, -halfWidth, 0, 0, -1, 0, 1, 0, 0, 1, 1);
      boxMesh.addVertex(-halfLong, -halfHeight, -halfWidth, 0, 0, -1, 1, 1, 1, 1, 0, 1);
      boxMesh.triangle.push(0, 1, 2, 2, 3, 0, 4, 7, 6, 6, 5, 4, 8, 9, 10, 10, 11, 8, 12, 15, 14, 14, 13, 12, 16, 17, 18, 18, 19, 16, 20, 23, 22, 22, 21, 20);
      return boxMesh;
    }
  };

  // src/ui/layaMaxUI.ts
  var Scene = Laya.Scene;
  var REG = Laya.ClassUtils.regClass;
  var ui;
  (function(ui2) {
    let test;
    (function(test2) {
      class TestSceneUI extends Scene {
        constructor() {
          super();
        }
        createChildren() {
          super.createChildren();
          this.loadScene("test/TestScene");
        }
      }
      test2.TestSceneUI = TestSceneUI;
      REG("ui.test.TestSceneUI", TestSceneUI);
    })(test = ui2.test || (ui2.test = {}));
  })(ui || (ui = {}));

  // src/shader/VertexUVAniMatrial.ts
  var _VertexUVAniMatrial = class extends Laya.Material {
    constructor() {
      super();
      this.setShaderName("vertexUVAni");
      this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
      this.WH = new Laya.Vector2(4, 4);
    }
    set albedoColor(value) {
      this._shaderValues.setVector(_VertexUVAniMatrial.ALBODECOLOR, value);
    }
    set albedoTexture(value) {
      if (value) {
        this._shaderValues.addDefine(_VertexUVAniMatrial.DEFINE_ALBEDOTEXTURE);
        this._shaderValues.setTexture(_VertexUVAniMatrial.ALBODETEXTURE, value);
      } else {
        this._shaderValues.removeDefine(_VertexUVAniMatrial.DEFINE_ALBEDOTEXTURE);
      }
    }
    set WH(value) {
      this._shaderValues.setVector2(_VertexUVAniMatrial.WH, value);
    }
  };
  var VertexUVAniMatrial = _VertexUVAniMatrial;
  VertexUVAniMatrial.ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
  VertexUVAniMatrial.ALBODECOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
  VertexUVAniMatrial.WH = Laya.Shader3D.propertyNameToID("u_WH");
  VertexUVAniMatrial.DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

  // src/shader/vertexUVAni.vs
  var vertexUVAni_default = '#include "Lighting.glsl";\n\n#ifdef GPU_INSTANCE\nattribute mat4 a_MvpMatrix;\n#else\nuniform mat4 u_MvpMatrix;\n#endif\n\nattribute vec4 a_Position;\nattribute vec4 a_Color;\nattribute vec2 a_TexCoord0;\n\nuniform vec4 u_TilingOffset;\n\nvarying vec4 v_Color;\nvarying vec2 v_TexCoord0;\n\nvoid main() {\n  v_Color = a_Color;\n  // v_TexCoord0 = a_TexCoord0;\n  v_TexCoord0 = a_TexCoord0 ;\n\n#ifdef GPU_INSTANCE\n  gl_Position = a_MvpMatrix * a_Position;\n#else\n  gl_Position = u_MvpMatrix * a_Position;\n#endif\n\n  gl_Position = remapGLPositionZ(gl_Position);\n}\n';

  // src/shader/vertexUVAni.fs
  var vertexUVAni_default2 = "#ifdef GL_FRAGMENT_PRECISION_HIGHP\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n\nuniform vec4 u_AlbedoColor;\nuniform vec2 u_WH;\nuniform float u_Time;\n\nvarying vec4 v_Color;\nvarying vec2 v_TexCoord0;\n\n#ifdef ALBEDOTEXTURE\nuniform sampler2D u_AlbedoTexture;\n#endif\nvoid main() {\n  vec4 color = u_AlbedoColor;\n\n    #ifdef ALBEDOTEXTURE\n        float index = 4.0;\n        index = floor(u_Time * 10.0);\n\n        float uSize = 1.0/u_WH.x;\n        float vSize = 1.0/u_WH.x;\n\n        float uCount = mod(index,u_WH.x);\n        float vCount = floor(index / u_WH.y);\n\n        vec2 texCoord = vec2(0.0);\n        texCoord.x = v_TexCoord0.x / u_WH.x + uCount * uSize;\n        texCoord.y = v_TexCoord0.y / u_WH.y + uCount * vSize;\n\n\n        color = texture2D(u_AlbedoTexture,texCoord);\n    #endif\n  gl_FragColor = color;\n}";

  // src/shader/VertexUVAniShader.ts
  var VertexUVAniShader = class {
    static initShader() {
      let attributeMap = {
        "a_Position": Laya.VertexMesh.MESH_POSITION0,
        "a_MvpMatrix": Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
        "a_Color": Laya.VertexMesh.MESH_COLOR0,
        "a_TexCoord0": Laya.VertexMesh.MESH_TEXTURECOORDINATE0
      };
      let uniformMap = {
        "u_MvpMatrix": Laya.Shader3D.PERIOD_SPRITE,
        "u_AlbedoTexture": Laya.Shader3D.PERIOD_MATERIAL,
        "u_AlbedoColor": Laya.Shader3D.PERIOD_MATERIAL,
        "u_WH": Laya.Shader3D.PERIOD_MATERIAL,
        "u_Time": Laya.Shader3D.PERIOD_SCENE
      };
      let shader = Laya.Shader3D.add("vertexUVAni");
      let subShader = new Laya.SubShader(attributeMap, uniformMap);
      shader.addSubShader(subShader);
      subShader.addShaderPass(vertexUVAni_default, vertexUVAni_default2);
    }
  };

  // src/script/GameUI.ts
  var GameUI = class extends ui.test.TestSceneUI {
    constructor() {
      super();
      var scene = Laya.stage.addChild(new Laya.Scene3D());
      scene.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);
      var camera = scene.addChild(new Laya.Camera(0, 0.1, 100));
      var directionLight = scene.addChild(new Laya.DirectionLight());
      directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
      directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
      camera.transform.translate(new Laya.Vector3(0, 3, 3));
      camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
      VertexUVAniShader.initShader();
      let meshData = BoxMesh.createBox(1.5, 1.5, 1);
      this.box = scene.addChild(new Laya.MeshSprite3D(meshData.createMesh()));
      this.box.transform.position = new Laya.Vector3(0, 3, 0);
      let material = new VertexUVAniMatrial();
      Laya.Texture2D.load("res/animation.png", Laya.Handler.create(this, (text) => {
        material.albedoTexture = text;
      }));
      this.box.meshRenderer.material = material;
    }
    onSliderWidthChange() {
      let v = this.slider_width.value / 100;
      let material = this.box.meshRenderer.sharedMaterial;
      material.width = v;
    }
    onSliderSpeedChange() {
      let v = this.slider_speed.value / 100;
      let material = this.box.meshRenderer.sharedMaterial;
      material.speed = v;
    }
  };

  // src/GameConfig.ts
  var GameConfig = class {
    constructor() {
    }
    static init() {
      var reg = Laya.ClassUtils.regClass;
      reg("script/GameUI.ts", GameUI);
    }
  };
  GameConfig.width = 640;
  GameConfig.height = 1136;
  GameConfig.scaleMode = "fixedwidth";
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

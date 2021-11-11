import BoxMesh from "../mesh/BoxMesh";
import HollowCylinderMesh from "../mesh/HollowCylinderMesh";
import MeshData from "../mesh/MeshData";
import GerstnerWaveMaterial from "../shader/GerstnerWaveMaterial";
import GerstnerWaveShader from "../shader/GerstnerWaveShader";
import NormalMoveMaterial from "../shader/NormalMoveMaterial";
import NormalMoveShader from "../shader/NormalMoveShader";
import Shader from "../shader/Shader";
import VertexColorMaterial from "../shader/VertexColorMaterial";
import VertexColorShader from "../shader/VertexColorShader";
import VertexUVMaterial from "../shader/VertexUVMaterial";
import VertexUVShader from "../shader/VertexUVShader";
import VertexWaveMaterial from "../shader/VertexWaveMaterial";
import VertexWaveShader from "../shader/VertexWaveShader";
import { ui } from "./../ui/layaMaxUI";
import Rotation from "./Rotation";
import VertexUVAniMaterial from "../shader/VertexUVAniMaterial";
import VertexUVAniShader from "../shader/VertexUVAniShader";
import UVWaterMaterial from "../shader/UVWaterMaterial";
import UVWaterShader from "../shader/UVWaterShader";
import UVBlurMaterial from "../shader/UVBlurMaterial";
import UVBlurShader from "../shader/UVBlurShader";
import UVMosaicMaterial from "../shader/UVMosaicMaterial";
import UVMosaicShader from "../shader/UVMosaicShader";
import TerrainMaterial from "../shader/TerrainMaterial";
import TerrainShader from "../shader/TerrainShader";
import LightingMaterial from "../shader/LightingMaterial";
import LightingShader from "../shader/LightingShader";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    private gameScene: Laya.Scene3D;
    constructor() {
        super();

        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
        scene.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);
        this.gameScene = scene;
        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        // var mesh: MeshData = HollowCylinderMesh.create(0.5, 1, 64, 0.5);
        // // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(mesh.createMesh())) as Laya.MeshSprite3D;
        // // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        // box.transform.position = new Laya.Vector3(0, 1, 0);

        // // var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        // // Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
        // // 		material.albedoTexture = tex;
        // // }));
        // Shader.initShader();
        // let material = new Laya.BlinnPhongMaterial();
        // material.enableVertexColor = true;
        // box.meshRenderer.material = material;

        // box.addComponent(Rotation);

        // VertexColor
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // VertexColorShader.initShader();

        // let box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1, 64, 64))) as Laya.MeshSprite3D;
        // box.transform.position = new Laya.Vector3(0,3,-1);

        // let material = new VertexColorMaterial();
        // box.meshRenderer.material = material;

        // VertexWave
        // camera.transform.translate(new Laya.Vector3(0, 10, 10));
        // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // VertexWaveShader.initShader();
        // this.box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 200,20))) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0,0,-5);

        // let material = new VertexWaveMaterial();
        // this.box.meshRenderer.material = material;
        // this.slider_width.on(Laya.Event.CHANGED,this,this.onSliderWidthChange);
        // this.slider_speed.on(Laya.Event.CHANGED,this,this.onSliderSpeedChange);

        // GerstnerWave
        // camera.transform.translate(new Laya.Vector3(0, 10, 10));
        // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // GerstnerWaveShader.initShader();
        // this.box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 200, 20))) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 0, -5);

        // let material = new GerstnerWaveMaterial();
        // this.box.meshRenderer.material = material;

        //  NormalMove
        // camera.transform.translate(new Laya.Vector3(0, 5, 5));
        // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // NormalMoveShader.initShader();
        // this.box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1, 32, 32))) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 2, 0);

        // let material = new NormalMoveMaterial();
        // this.box.meshRenderer.material = material;

        // VertexUV
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // VertexUVShader.initShader();

        // let meshData =  BoxMesh.createBox(1.5,1.5,1);
        // this.box = scene.addChild(new Laya.MeshSprite3D(meshData.createMesh())) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 3, 0);

        // let material = new VertexUVMaterial();
        // Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,(text)=>{
        //     material.albedoTexture = text;
        //     material.tilingOffset = new Laya.Vector4(2,2,0.5,0.5);
        // }))

        // this.box.meshRenderer.material = material;

        // VertexUVAniS
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // VertexUVAniShader.initShader();

        // let meshData =  BoxMesh.createBox(1.5,1.5,1);
        // this.box = scene.addChild(new Laya.MeshSprite3D(meshData.createMesh())) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 3, 0);

        // let material = new VertexUVAniMaterial();
        // Laya.Texture2D.load("res/animation.png",Laya.Handler.create(this,(text)=>{
        //     material.albedoTexture = text;
        // }))

        // this.box.meshRenderer.material = material;

        // UVWater
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // UVWaterShader.initShader();

        // let meshData =  BoxMesh.createBox(1.5,1.5,1);
        // this.box = scene.addChild(new Laya.MeshSprite3D(meshData.createMesh())) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 3, 0);

        // let material = new UVWaterMaterial();
        // Laya.Texture2D.load("res/water.png",Laya.Handler.create(this,(text)=>{
        //     material.albedoTexture = text;
        // }))

        // this.box.meshRenderer.material = material;

        // UVBlur
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // UVBlurShader.initShader();

        // let meshData =  BoxMesh.createBox(1.5,1.5,1);
        // this.box = scene.addChild(new Laya.MeshSprite3D(meshData.createMesh())) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 3, 0);

        // let material = new UVBlurMaterial();
        // Laya.Texture2D.load("res/blur.png",Laya.Handler.create(this,(text)=>{
        //     material.albedoTexture = text;
        // }))

        // this.box.meshRenderer.material = material;
        // this.slider_width.on(Laya.Event.CHANGED,this,this.onSliderBlurWidthChange);

        // UVMosaic
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // UVMosaicShader.initShader();

        // let meshData =  BoxMesh.createBox(1.5,1.5,1);
        // this.box = scene.addChild(new Laya.MeshSprite3D(meshData.createMesh())) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 3, 0);

        // let material = new UVMosaicMaterial();
        // Laya.Texture2D.load("res/blur.png",Laya.Handler.create(this,(text)=>{
        //     material.albedoTexture = text;
        //     material.texSize = new Laya.Vector2(512,512);
        //     material.mosaicSize = 8.0;
        // }))
        // this.slider_width.on(Laya.Event.CHANGED,this,this.onSliderMosaicChange);

        // this.box.meshRenderer.material = material;

        // Terrain
        // camera.transform.translate(new Laya.Vector3(0, 8, 8));
        // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // Laya.loader.create([
        //     "res/bg1.jpg",
        //     "res/bg2.jpg",
        // ], Laya.Handler.create(this, this.onLoadComplete));

        // lighting
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        var earth = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1.5 , 64 , 64))) as Laya.MeshSprite3D;
        earth.transform.position = new Laya.Vector3(0 , 0 , -3);
        LightingShader.initShader();
        var material:LightingMaterial = new LightingMaterial();
        Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
            material.albedoTexture = tex;
        }));
        // material.albedoColor = new Laya.Vector4(1,1,1,1);
        
        earth.meshRenderer.material = material;
    }

    private onLoadComplete() {
        TerrainShader.initShader();
        // let meshData = BoxMesh.createBox(1.5, 1.5, 1);
        this.box = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 200,20))) as Laya.MeshSprite3D;
        this.box.transform.position = new Laya.Vector3(0, 0, -7);

        let material = new TerrainMaterial();

        material.albedoTexture = Laya.loader.getRes("res/bg1.jpg");
        material.secondTexture = Laya.loader.getRes("res/bg2.jpg");

        this.box.meshRenderer.material = material;


        
    }

    box: Laya.MeshSprite3D;
    private onSliderWidthChange() {
        let v = this.slider_width.value / 100;
        let material: VertexWaveMaterial = this.box.meshRenderer.sharedMaterial as VertexWaveMaterial;
        material.width = v;
    }

    private onSliderBlurWidthChange() {
        let v = this.slider_width.value / 10000;
        let material: UVBlurMaterial = this.box.meshRenderer.sharedMaterial as UVBlurMaterial;
        material.blurWidth = v;
    }

    private onSliderSpeedChange() {
        let v = this.slider_speed.value / 100;
        let material: VertexWaveMaterial = this.box.meshRenderer.sharedMaterial as VertexWaveMaterial;
        material.speed = v;
    }

    private onSliderMosaicChange() {
        let v = this.slider_width.value / 100 * 20 + 5;
        let material: UVMosaicMaterial = this.box.meshRenderer.sharedMaterial as UVMosaicMaterial;
        material.mosaicSize = v;
    }

}
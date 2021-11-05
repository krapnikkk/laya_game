import BoxMesh from "../mesh/BoxMesh";
import HollowCylinderMesh from "../mesh/HollowCylinderMesh";
import MeshData from "../mesh/MeshData";
import GerstnerWaveMatrial from "../shader/GerstnerWaveMatrial";
import GerstnerWaveShader from "../shader/GerstnerWaveShader";
import NormalMoveMatrial from "../shader/NormalMoveMatrial";
import NormalMoveShader from "../shader/NormalMoveShader";
import Shader from "../shader/Shader";
import VertexColorMatrial from "../shader/VertexColorMatrial";
import VertexColorShader from "../shader/VertexColorShader";
import VertexUVMatrial from "../shader/VertexUVMatrial";
import VertexUVShader from "../shader/VertexUVShader";
import VertexWaveMatrial from "../shader/VertexWaveMatrial";
import VertexWaveShader from "../shader/VertexWaveShader";
import { ui } from "./../ui/layaMaxUI";
import Rotation from "./Rotation";
import VertexUVAniMatrial from "../shader/VertexUVAniMatrial";
import VertexUVAniShader from "../shader/VertexUVAniShader";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    constructor() {
        super();

        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
        scene.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);

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

        // let material = new VertexColorMatrial();
        // box.meshRenderer.material = material;

        // VertexWave
        // camera.transform.translate(new Laya.Vector3(0, 10, 10));
        // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // VertexWaveShader.initShader();
        // this.box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 200,20))) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0,0,-5);

        // let material = new VertexWaveMatrial();
        // this.box.meshRenderer.material = material;
        // this.slider_width.on(Laya.Event.CHANGED,this,this.onSliderWidthChange);
        // this.slider_speed.on(Laya.Event.CHANGED,this,this.onSliderSpeedChange);

        // GerstnerWave
        // camera.transform.translate(new Laya.Vector3(0, 10, 10));
        // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // GerstnerWaveShader.initShader();
        // this.box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 200, 20))) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 0, -5);

        // let material = new GerstnerWaveMatrial();
        // this.box.meshRenderer.material = material;

        //  NormalMove
        // camera.transform.translate(new Laya.Vector3(0, 5, 5));
        // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // NormalMoveShader.initShader();
        // this.box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1, 32, 32))) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 2, 0);

        // let material = new NormalMoveMatrial();
        // this.box.meshRenderer.material = material;

        // VertexUV
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // VertexUVShader.initShader();

        // let meshData =  BoxMesh.createBox(1.5,1.5,1);
        // this.box = scene.addChild(new Laya.MeshSprite3D(meshData.createMesh())) as Laya.MeshSprite3D;
        // this.box.transform.position = new Laya.Vector3(0, 3, 0);

        // let material = new VertexUVMatrial();
        // Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,(text)=>{
        //     material.albedoTexture = text;
        //     material.tilingOffset = new Laya.Vector4(2,2,0.5,0.5);
        // }))

        // this.box.meshRenderer.material = material;

        // VertexUVAniS
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        VertexUVAniShader.initShader();

        let meshData =  BoxMesh.createBox(1.5,1.5,1);
        this.box = scene.addChild(new Laya.MeshSprite3D(meshData.createMesh())) as Laya.MeshSprite3D;
        this.box.transform.position = new Laya.Vector3(0, 3, 0);

        let material = new VertexUVAniMatrial();
        Laya.Texture2D.load("res/animation.png",Laya.Handler.create(this,(text)=>{
            material.albedoTexture = text;
        }))

        this.box.meshRenderer.material = material;
    }

    box: Laya.MeshSprite3D;
    private onSliderWidthChange() {
        let v = this.slider_width.value / 100;
        let material: VertexWaveMatrial = this.box.meshRenderer.sharedMaterial as VertexWaveMatrial;
        material.width = v;
    }

    private onSliderSpeedChange() {
        let v = this.slider_speed.value / 100;
        let material: VertexWaveMatrial = this.box.meshRenderer.sharedMaterial as VertexWaveMatrial;
        material.speed = v;
    }

}
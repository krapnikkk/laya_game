import FollowCamera from "./FollowCamera";
import Player from "./Player";
import Rotation from "./Rotation";
import SpawnParticle from "./SpawnParticle";
import SpawnPlatform from "./SpawnPlatform";

export default class App extends Laya.Script {
    constructor() { super(); }
    
    onAwake(){
        Laya.Scene3D.load("res/3dScene/LayaScene_Main/Conventional/Main.ls",Laya.Handler.create(this,this.onLoaded))
    }

    private _column:Laya.Sprite3D;
    private _particlePrefab:Laya.Sprite3D;
    onLoaded(scene:Laya.Scene3D){
        Laya.stage.addChild(scene);
        let parent = scene.getChildByName("Parent");
        parent.addComponent(Rotation);

        let player = scene.getChildByName("Player");
        player.addComponent(Player);

        let platform = parent.getChildByName("Platform") as Laya.Sprite3D;
        let platformPrefab = Laya.Sprite3D.instantiate(platform);
        platform.active =false;
        this.owner.addComponent(SpawnPlatform).init(platformPrefab,parent);

        scene.getChildByName("Main Camera").addComponent(FollowCamera);

        this._column = parent.getChildByName("Column") as Laya.Sprite3D;
        Laya.stage.on("SpawnPlatform",this,this.moveColumn);

        let trail = scene.getChildByName("TrailRender") as Laya.Sprite3D;
        player.addChild(trail);
        trail.transform.localPosition = new Laya.Vector3();

        let particle = scene.getChildByName("Particle") as Laya.Sprite3D;
        let particlePrefab = Laya.Sprite3D.instantiate(particle);
        particle.active =false;
        this.owner.addComponent(SpawnParticle).init(particlePrefab,scene);
    }

    moveColumn(){
        this._column.transform.localPositionY -= 1.5;
    }

    onEnable(): void {
    }

    onDisable(): void {
    }
}
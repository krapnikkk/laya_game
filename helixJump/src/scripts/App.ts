import Player from "./Player";
import Rotation from "./Rotation";

export default class App extends Laya.Script {
    constructor() { super(); }
    
    onAwake(){
        Laya.Scene3D.load("res/3dScene/LayaScene_Main/Conventional/Main.ls",Laya.Handler.create(this,this.onLoaded))
    }

    onLoaded(scene:Laya.Scene3D){
        Laya.stage.addChild(scene);
        scene.getChildByName("Parent").addComponent(Rotation);
        scene.getChildByName("Player").addComponent(Player);
    }

    onEnable(): void {
    }

    onDisable(): void {
    }
}
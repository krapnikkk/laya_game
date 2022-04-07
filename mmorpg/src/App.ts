import { ActorState, LayerEnum } from "./Enum";
import InputManager from "./InputManager";
import Player from "./actor/Player";
import SceneManager from "./scene/SceneManager";
import WorldMap from "./scene/WorldMap";

export default class App{
    constructor(){
        this.init()
    }

    init(){
        SceneManager.ins.init();
        SceneManager.ins.addToLayer(WorldMap.ins.container, LayerEnum.MapLayer);
        SceneManager.ins.addToLayer(Player.ins.displayObjectController.displayObject, LayerEnum.ActorLayer,1024,1024);

        SceneManager.ins.camera2d.focus(Player.ins.displayObjectController.displayObject);
        InputManager.ins.init();

        Player.ins.changeState(ActorState.IDLE);

        Laya.timer.frameLoop(1,this,this.update);

    }

    update(){
        SceneManager.ins.update();
        Player.ins.update();
    }
}
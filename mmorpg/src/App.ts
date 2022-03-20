import { LayerEnum } from "./Enum";
import InputManager from "./InputManager";
import Player from "./Player";
import SceneManager from "./SceneManager";
import WorldMap from "./WorldMap";

export default class App{
    constructor(){
        this.init()
    }

    init(){
        SceneManager.ins.init();
        SceneManager.ins.addToLayer(WorldMap.ins.container, LayerEnum.MapLayer);
        SceneManager.ins.addToLayer(Player.ins.displayObject, LayerEnum.ActorLayer,1024,1024);

        SceneManager.ins.camera2d.focus(Player.ins.displayObject);
        InputManager.ins.init();

        Laya.timer.frameLoop(1,this,this.update);

    }

    update(){
        SceneManager.ins.update();
        Player.ins.update();
    }
}
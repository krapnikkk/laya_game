import UIManager from "../UIManager";
import { rnd } from "../utils";
import CameraFollow from "./CameraFollow";
import MapManager from "./MapManager";
import PlayerController from "./PlayerController";


export default class App {
    constructor() {
        UIManager.ins.init();
        this.PreloadingRes();
     }

    cubeName: string;
    PreloadingRes() {
        let cubes = ["books", "bread", "brick", "cake", "car", "cheese", "dice", "fruit", "hamburger", "icecube", "jar", "mushroom", "pilis", "safe", "sushi", "toster", "watermelon"];
        this.cubeName = cubes[rnd(0, cubes.length - 1)];
        //预加载所有资源
        var resource: Array<string> = [
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

    onLoaded(scene: Laya.Scene3D) {
        console.time("start");
        Laya.stage.addChild(scene);
        scene.zOrder = -1;
        this.start(scene);
    }

    start(scene: Laya.Scene3D) {
        let cube = Laya.loader.getRes(`./res/3dScene/cube/Conventional/cube_${this.cubeName}.lh`);

        let player: Laya.Sprite3D = Laya.Sprite3D.instantiate(cube, scene);
        let playerController:PlayerController = player.addComponent(PlayerController);
        let platform = scene.getChildByName("Platform") as Laya.Sprite3D;
        let map: MapManager = platform.addComponent(MapManager);
        let camera = scene.getChildByName("Main Camera") as Laya.Sprite3D;
        let cameraFollow: CameraFollow = camera.addComponent(CameraFollow);
        let light = scene.getChildByName("Directional Light") as Laya.DirectionLight;
        light.shadowMode = Laya.ShadowMode.SoftHigh;
        map.createMapItem();
        map.setPlayer(playerController);

        playerController.setMap(map);
        playerController.createRole();
        cameraFollow.setTarget(player);

    }
}
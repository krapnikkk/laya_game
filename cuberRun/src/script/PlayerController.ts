import { sleep } from "../utils";
import Gem from "./Gem";
import MapManager from "./MapManager";

export default class PlayerController extends Laya.Script3D {
    constructor() {
        super();
    }

    public z: number = 5;
    public x: number = 2;
    deepColor: Laya.Vector4 = new Laya.Vector4(122 / 255, 85 / 255, 179 / 255, 1);
    floorColor: Laya.Vector4 = new Laya.Vector4(126 / 255, 93 / 255, 183 / 255, 1);
    map: MapManager;
    scene: Laya.Scene3D;
    live: boolean = true;
    characterCtrl: Laya.CharacterController
    onEnable(): void {
        // window.addEventListener("keydown", this.onKeyDown.bind(this));
        Laya.stage.on("move", this, this.move)
    }
    createRole() {
        if (!this.characterCtrl) {
            this.characterCtrl = this.owner.addComponent(Laya.CharacterController);
        }
        let boxShape: Laya.BoxColliderShape = new Laya.BoxColliderShape(0.2, 0.2, 0.2);
        this.characterCtrl.colliderShape = boxShape;
        this.characterCtrl.gravity = new Laya.Vector3(0, 0, 0);
        this.updatePlayerPosition();
    }

    setMap(map: MapManager) {
        this.map = map;
    }

    resetStatus() {
        // this.characterCtrl.gravity = new Laya.Vector3(0, 0, 0);
        this.z = 5;
        this.x = 2;
        // this.updatePlayerPosition();

        this.createRole();
        this.live = true;
    }

    move(keyCode: string): void {
        if (!this.live) {
            return;
        }
        if (keyCode == "right") { // right
            if (this.x != 0) {
                this.z++;
            }
            if (this.z % 2 == 1 && this.x != 0) {
                this.x--;
            }
            this.updatePlayerPosition();
            this.calcPosition();
        } else if (keyCode == "left") { // left
            if (this.x != 4 || this.z % 2 != 1) {
                this.z++;
            }
            if (this.z % 2 == 0 && this.x != 4) {
                this.x++;
            }
            this.updatePlayerPosition();
            this.calcPosition();
        }
    }

    updatePlayerPosition() {
        if (this.live) {
            Laya.stage.event("MoveCamera");
        }
        let tile = this.map.tileList[this.z][this.x];
        let position = new Laya.Vector3();
        let transform = tile.transform;
        let floor = tile.getChildByName("normal_a2") as Laya.MeshSprite3D;
        if (floor) { // 蜗牛痕迹
            (floor.meshRenderer.material as Laya.BlinnPhongMaterial).albedoColor = this.z % 2 == 0 ? this.deepColor : this.floorColor;
        } else {
            this.fallDown();
        }
        Laya.Vector3.add(transform.position, new Laya.Vector3(0, this.map.tileWidth / 2, 0), position);
        (this.owner as Laya.Sprite3D).transform.position = position;
        (this.owner as Laya.Sprite3D).transform.rotation = transform.rotation;
        (this.owner as Laya.Sprite3D).transform.localRotationEulerX = 0;
    }

    calcPosition() {
        let tileListCount = this.map.tileList.length;
        if (tileListCount - this.z <= 15) {
            this.map.addProbability();
            let offsetZ = this.map.tileList[tileListCount - 1][0].transform.localPositionZ + this.map.halfDistance;
            this.map.createMapItem(offsetZ);
        }
    }

    onCollisionEnter(Collision: Laya.Collision): void {
        let obj = Collision.other.owner.name;
        if (obj == "moving_spikes_b" || obj == "smashing_spikes_b") {
            this.live = false;
            this.gameOver();
        } else if (obj == "gem 3") {
            Collision.other.owner.parent.getComponent(Gem).destroy();
            Laya.stage.event("updateScore");
        }
    }

    async fallDown() {
        this.characterCtrl.gravity = new Laya.Vector3(0, -10, 0);
        this.live = false;
        await sleep(800);
        this.characterCtrl.colliderShape = null;
        this.gameOver();
    }

    gameOver() {
        Laya.timer.pause();
        Laya.timer.scale = 0;
        Laya.stage.event("over");
    }

}
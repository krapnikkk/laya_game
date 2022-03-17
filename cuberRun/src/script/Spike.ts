import { sleep } from "../utils";
import { tileType } from "./MapManager";

export default class Spike extends Laya.Script {
    child: Laya.Sprite3D;
    normalPosition: Laya.Vector3;
    targetPosition: Laya.Vector3 = new Laya.Vector3();
    start: boolean = true;
    floor: Laya.MeshSprite3D;
    originColor:Laya.Vector4;
    type: tileType;
    onStart(): void {
        let name = this.type == tileType.MOVIING_SPIKE ? "moving_spikes_b" : "smashing_spikes_b";
        let target = this.type == tileType.MOVIING_SPIKE ? new Laya.Vector3(0, 0, 0.15) : new Laya.Vector3(0, 0, 0.6);
        this.child = this.owner.getChildByName(name) as Laya.Sprite3D;
        this.floor = this.owner.getChildByName("normal_a2") as Laya.MeshSprite3D;
        this.originColor = (this.floor.meshRenderer.material as Laya.BlinnPhongMaterial).albedoColor;
        this.normalPosition = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.add(this.normalPosition, target, this.targetPosition);
        this.play();
    }

    resetFloor(){
        (this.floor.meshRenderer.material as Laya.BlinnPhongMaterial).albedoColor = this.originColor;
    }

    setType(type: tileType) {
        this.type = type;
    }

    async play() {
        await sleep(2000);
        this.up();
        await sleep(2000);
        this.down();
        this.play();
    }

    upTween: Laya.Tween;
    downTween: Laya.Tween;
    up() {
        if (!this.start) {
            return;
        }
        this.upTween = Laya.Tween.to(this.child.transform, {
            localPositionX: this.targetPosition.x,
            localPositionY: this.targetPosition.y,
            localPositionZ: this.targetPosition.z
        }, 1000, Laya.Ease.linearIn);
    }

    down() {
        if (!this.start) {
            return;
        }
        this.downTween = Laya.Tween.to(this.child.transform, {
            localPositionX: this.normalPosition.x,
            localPositionY: this.normalPosition.y,
            localPositionZ: this.normalPosition.z
        }, 1000, Laya.Ease.linearIn);
    }

    stop() {
        console.log("stop");
        this.start = false;
        // let rb = this.child.addComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        // rb.isKinematic = true;
        // rb.gravity = new Laya.Vector3(0, -10, 0);
        // Laya.Tween.clearAll(this.child.transform);
        Laya.Tween.clearTween(this.upTween);
        Laya.Tween.clearTween(this.downTween);
    }

}
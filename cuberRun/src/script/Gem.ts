import { rnd } from "../utils";

export default class Gem extends Laya.Script {
    constructor() {
        super();
    }


    child: Laya.Node;
    onAwake(): void {
        this.child = this.owner.getChildByName("gem 3");
    }
    onUpdate(): void {
        let num = rnd(1, 3);
        let rotation: Laya.Vector3 = num == 1 ? new Laya.Vector3(0.1, 0, 0) : num ? new Laya.Vector3(0, 0.1, 0) : new Laya.Vector3(0, 0, 0.1);
        (this.child as Laya.Sprite3D).transform.rotate(rotation);
    }

    destroy(): void {
        this.owner.removeSelf();
        Laya.Pool.recover("gem", this.owner);
    }
    onDestroy(): void {
        this.destroy();
    }
}
export default class Player extends Laya.Script3D {
    constructor() { super(); }

    characterCtrl: Laya.CharacterController;
    private _physicsSimulation: Laya.PhysicsSimulation;
    private _ray: Laya.Ray;
    private _hitResult: Laya.HitResult;
    onAwake() {
        this.characterCtrl = this.owner.addComponent(Laya.CharacterController);
        let collider = new Laya.SphereColliderShape(0.5);
        this.characterCtrl.colliderShape = collider;
        this.characterCtrl.jumpSpeed = 8;
        this.characterCtrl.fallSpeed = 10;

        this._physicsSimulation = (this.owner.parent as Laya.Scene3D).physicsSimulation;// 发射射线
        this._ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3(0, -1, 0));
        this._hitResult = new Laya.HitResult();

        Laya.timer.frameLoop(1, this, this.rayCast);
    }

    onEnable(): void {
    }

    onDisable(): void {
    }

    private _throughCount: number = 0;
    rayCast() {
        this._ray.origin = (this.owner as Laya.Sprite3D).transform.position;
        if (this._throughCount >= 3 && this._physicsSimulation.rayCast(this._ray, this._hitResult, 0.2)) {//无敌状态碰撞到其他平台时
            let collider = this._hitResult.collider as Laya.PhysicsTriggerComponent;
            let numChildren = collider.owner.parent.numChildren;
            for (let i = 0; i < numChildren; i++) {
                let child = collider.owner.parent.getChildAt(i) as Laya.MeshSprite3D;
                child.name = "Bar";
                (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.x = 0;
                (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.y = 0;
                (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.z = 1;
            }
        }
        if (this._physicsSimulation.rayCast(this._ray, this._hitResult, 0.15)) {
            let collider = this._hitResult.collider as Laya.PhysicsTriggerComponent;
            if (collider.owner.name == "Obstacle") {
                Laya.stage.event("GameOver");
                (this.owner as Laya.Sprite3D).transform.localScaleY = 0.15;
                return;
            }
            if (collider.isTrigger) {
                this._throughCount++;
                collider.owner.parent.removeSelf();
                Laya.Pool.recover("Platform", collider.owner.parent);
                Laya.stage.event("MoveCamera", (collider.owner.parent as Laya.Sprite3D).transform.localPositionY);
                Laya.stage.event("SpawnPlatform");
                if (this._throughCount >= 3) {
                    Laya.stage.event("Hint", 3);
                } else {
                    Laya.stage.event("Hint", 1);
                }
            } else {
                this._throughCount = 0;
                this.characterCtrl.jump();
                Laya.stage.event("SpawnParticle", this._hitResult.point);

            }
        }
    }

    // onCollisionEnter(collision: Laya.Collision) {
    //     // let other = collision.other.owner;
    //     this.characterCtrl.jump();
    // }

    // onTriggerEnter(other: Laya.PhysicsComponent) {
    //     // console.log(other);
    //     other.owner.parent.active = false;
    //     Laya.stage.event("MoveCamera", (other.owner.parent as Laya.Sprite3D).transform.localPositionY);
    // }
}
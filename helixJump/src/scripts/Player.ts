export default class Player extends Laya.Script3D {
    constructor() { super(); }
    
    characterCtrl:Laya.CharacterController;
    onAwake(){
        this.characterCtrl = this.owner.addComponent(Laya.CharacterController);
        let collider = new Laya.SphereColliderShape(0.5);
        this.characterCtrl.colliderShape = collider;
        this.characterCtrl.jumpSpeed = 8;
        this.characterCtrl.fallSpeed = 10;
        console.log(this.characterCtrl);
    }

    onEnable(): void {
    }

    onDisable(): void {
    }

    onCollisionEnter(collision:Laya.Collision){
        // let other = collision.other.owner;
        this.characterCtrl.jump();
    }

    onTriggerEnter(other:Laya.PhysicsComponent){
        console.log(other);
    }
}
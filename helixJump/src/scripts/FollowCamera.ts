export default class FollowCamera extends Laya.Script3D {
    constructor() { super(); }

    characterCtrl: Laya.CharacterController;
    onAwake() {
        Laya.stage.on("MoveCamera", this, this.follow);

        Laya.stage.on("Continue", this, this.reset);
    }

    onEnable(): void {
    }

    onDisable(): void {
    }

    follow(posY) {
        Laya.Tween.to((this.owner as Laya.Sprite3D).transform, { localPositionY: posY }, 300);
    }

    reset() {
        console.log("reset");
        (this.owner as Laya.Sprite3D).transform.localPositionY = 1.3;
    }
}
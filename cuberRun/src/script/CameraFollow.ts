export default class CameraFollow extends Laya.Script{

    target: Laya.Transform3D;
    startPos:Laya.Vector3;
    transform: Laya.Transform3D;
    onAwake(): void {
        this.transform = (this.owner as Laya.Sprite3D).transform;
        this.startPos = this.transform.position.clone();
        Laya.stage.on("MoveCamera", this, this.cameraMove);
        Laya.stage.on("start", this, this.startMove);
        Laya.stage.on("over", this, this.stopMove);
    }

    setTarget(target:Laya.Sprite3D){
        this.target = target.transform;
    }

    moveTween:Laya.Tween;
    cameraMove(){
        if (!this.target){return};
        let nextPos = new Laya.Vector3(this.transform.position.x, this.target.position.y + 1.5, this.target.position.z);
        this.moveTween = Laya.Tween.to(this.transform, {
            localPositionX: nextPos.x,
            localPositionY: nextPos.y,
            localPositionZ: nextPos.z
         }, 250,Laya.Ease.linearIn);
    }

    stopMove(){
        if (this.moveTween) {
            Laya.Tween.clear(this.moveTween);
        }
    }

    startMove(){
        this.transform.position = this.startPos;
    }
}
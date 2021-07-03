export default class Rotation extends Laya.Script {
    constructor() { super(); }

    _gameOver:boolean = false;
    onAwake() {
        Laya.stage.on("GameOver",this,()=>{
            this._gameOver =true;
        });
        if(Laya.Browser.onPC){
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
        }
    }

    _lastMouseX: number = 0;
    onMouseDown(e: Laya.Event) {
        this._lastMouseX = Laya.stage.mouseX;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    }

    onMouseMove(e: Laya.Event) {
        if(this._gameOver)return;
        let deltaX = Laya.stage.mouseX - this._lastMouseX;
        this._lastMouseX = Laya.stage.mouseX;
        (this.owner as Laya.Sprite3D).transform.rotate(new Laya.Vector3(0, deltaX / 5, 0), true, false);
    }

    onMouseUp() {
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    }

    onEnable(): void {
    }

    onDisable(): void {
    }

    _firstTouch: boolean = true;
    onUpdate() {
        if(Laya.Browser.onPC||this._gameOver)return;
        if ((this.owner.parent as Laya.Scene3D).input.touchCount() == 1) {
            let touch = (this.owner.parent as Laya.Scene3D).input.getTouch(0);
            if (this._firstTouch) {
                this._firstTouch = false;
                this._lastMouseX = touch.position.x;
            } else {
                let deltaX = touch.position.x - this._lastMouseX;
                this._lastMouseX = Laya.stage.mouseX;
                (this.owner as Laya.Sprite3D).transform.rotate(new Laya.Vector3(0, deltaX / 5, 0), true, false);
            }
        } else {
            this._firstTouch = true;
            this._lastMouseX = 0;
        }
    }

}
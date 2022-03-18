export default class Player {
    public displayObject: Laya.Sprite;
    private static _ins: Player;
    public static get ins(): Player {
        if (this._ins == null) {
            this._ins = new Player();
        }
        return this._ins;
    }

    private constructor() {
        if (Player._ins) {
            throw "singleton class is not use new constructor!";
        }
        this.displayObject = new Laya.Sprite();
        let child = Laya.Sprite.fromImage("./res/player.png");
        this.displayObject.addChild(child);
        child.x -= 48;
        child.y -= 48;
    }

    private _moveTween: Laya.Tween;
    moveTo(position: Laya.Point) {
        if (this._moveTween) {
            this._moveTween.clear();
        }
        this._moveTween = Laya.Tween.to(this.displayObject, {
            x: position.x,
            y: position.y,
        }, 1000);
    }
}
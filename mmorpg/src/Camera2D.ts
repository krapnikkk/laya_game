import GameConfig from "./GameConfig";
import WorldMap from "./WorldMap";

export default class Camera2D {
    private _cameraView: Laya.Rectangle;
    private _scene: Laya.Sprite;
    public get cameraView(): Laya.Rectangle {
        return this._cameraView;
    }

    constructor(scene: Laya.Sprite) {
        this._scene = scene;
        this._cameraView = new Laya.Rectangle(0, 0, GameConfig.width, GameConfig.height);
        this._scene.scrollRect = this.cameraView;
    }

    private _focusTarget: Laya.Sprite;
    public focus(target: Laya.Sprite): void {
        this._focusTarget = target;
        this._cameraView.x = this._focusTarget.x - (GameConfig.width >> 1);
        this._cameraView.y = this._focusTarget.y - (GameConfig.height >> 1);
    }

    private _targetPos: Laya.Point = new Laya.Point();
    private _ease: number = 0.0025;
    public update(): void {
        if (this._focusTarget) {
            let halfWidth = GameConfig.width >> 1,
                halfHeight = GameConfig.height >> 1;
            this._targetPos.x = this._focusTarget.x - halfWidth;
            this._targetPos.y = this._focusTarget.y - halfHeight;

            if (this._focusTarget.x + halfWidth < WorldMap.ins.grid.gridWidth &&
                this._focusTarget.x - halfWidth > 0) {
                this._cameraView.x += (this._targetPos.x - this._cameraView.x) * Laya.timer.delta * this._ease;
            }
            if (this._focusTarget.y + halfHeight < WorldMap.ins.grid.gridHeight &&
                this._focusTarget.y - halfHeight > 0) {
                this._cameraView.y += (this._targetPos.y - this._cameraView.y) * Laya.timer.delta * this._ease;
            }
        }
    }
}
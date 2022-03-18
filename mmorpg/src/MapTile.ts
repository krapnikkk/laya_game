export default class MapTile {
    private _row: number;
    private _col: number;
    private _resUrl: string;
    private _isLoaded: boolean = false;
    private _isLoading: boolean = false;
    private _displayobject: Laya.Sprite;
    private _parent: Laya.Sprite;
    constructor(row: number, col: number, parent: Laya.Sprite) {
        this._row = row;
        this._col = col;
        this._parent = parent;
        this._resUrl = `./res/map_001/${this._row}_${this._col}.jpg`;
        this._displayobject = new Laya.Sprite();
    }

    private _handler:Laya.Handler;
    loadTile(): void {
        this._handler = Laya.Handler.create(this, this.onLoaded);
        this._isLoading = true;
        Laya.loader.load(this._resUrl, this._handler);
    }

    onLoaded() {
        if (this._handler){
            this._handler.recover();
        }
        this._isLoaded = true;
        this._isLoading = false;
        let texture = Laya.loader.getRes(this._resUrl);
        this._displayobject.graphics.drawTexture(texture,0,0);
        this._displayobject.x = this._col * 300;
        this._displayobject.y = this._row * 300;
        console.log(this._row,this._col);
        this._parent.addChild(this._displayobject);
    }

    unLoadTile(): void {
        this._displayobject.graphics.clear();
        if(this._isLoading){
            Laya.loader.cancelLoadByUrl(this._resUrl);
            this._isLoading =false;
        }else{
            Laya.loader.clearRes(this._resUrl)
        }
        this._isLoaded = false;
        this._parent.removeChild(this._displayobject);
    }
}
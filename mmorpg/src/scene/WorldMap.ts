import GameConfig from "../GameConfig";
import MapGrid from "./MapGrid";
import MapTile from "./MapTile";
import SceneManager from "./SceneManager";

export default class WorldMap {
    private _container: Laya.Sprite = new Laya.Sprite();
    get container(): Laya.Sprite {
        return this._container;
    }
    private _grid: MapGrid = new MapGrid();
    public get grid(): MapGrid {
        return this._grid;
    }
    private _gridTiles: MapTile[][] = [];
    public get gridTiles(): MapTile[][] {
        return this._gridTiles;
    }

    private static _ins: WorldMap;
    public static get ins(): WorldMap {
        if (this._ins == null) {
            this._ins = new WorldMap();
        }
        return this._ins;
    }

    private constructor() {
        if (WorldMap._ins) {
            throw "singleton class is not use new constructor!";
        }
        this.init();
    }

    public init(): void {
        this._createTiles();
    }

    private _createTiles() {
        for (let col = 0; col < this._grid.col; col++) {
            this._gridTiles[col] = [];
            for (let row = 0; row < this._grid.row; row++) {
                this._gridTiles[col][row] = new MapTile(row, col, this._container);
            }
        }
    }

    public getNeedLoadTile(x: number, y: number): { [key: string]: string } {
        let cellWidth = this.grid.cellWidth;
        let cellHeight = this.grid.cellHeight;
        if (y < cellHeight){
            debugger;
        }
        let rect = new Laya.Rectangle(x - cellWidth, y - cellHeight, GameConfig.width + cellWidth, GameConfig.height + cellHeight);
        
        let p1: Laya.Point = this.scenePosToGrid(rect.x, rect.y);
        let p2: Laya.Point = this.scenePosToGrid(rect.right, rect.bottom); // needload
        let loadMap: { [key: string]: string } = {};
        for (let i = p1.x; i <= p2.x; i++) {
            for (let j = p1.y; j <= p2.y; j++) {
                let item = `${i}_${j}`;
                loadMap[item] = item;
            }
        }
        return loadMap;
    }

    public scenePosToGrid(x: number, y: number): Laya.Point {
        let p = new Laya.Point();
        p.x = Math.floor(x / this._grid.cellWidth);
        p.y = Math.floor(y / this._grid.cellHeight);
        return p;
    }

    private _loadedTile: { [key: string]: string } = {};
    public loadTiles(tiles: { [key: string]: string }) {
        let col: number, row: number, idxArr: string[];

        // unload
        for (let key in this._loadedTile){
            if(!tiles[key]){
                idxArr = key.split("_");
                col = +idxArr[0];
                row = +idxArr[1];
                this._gridTiles[col][row].unLoadTile();
                delete this._loadedTile[key];
            }
        }

        for (let key in tiles) {
            idxArr = key.split("_");
            col = +idxArr[0];
            row = +idxArr[1];
            if (!this._loadedTile[key]) {
                if (col < this.grid.col && row < this.grid.row) {
                    this._gridTiles[col][row].loadTile();
                    this._loadedTile[key] = key;
                }
            }
        }
    }

    public update(){
        let cameraView = SceneManager.ins.camera2d.cameraView;
        let tiles = this.getNeedLoadTile(cameraView.x,cameraView.y);
        this.loadTiles(tiles);
    }

}
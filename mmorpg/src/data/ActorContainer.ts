import ActorTable from "./ActorTable";

export default class ActorContainer{
    private _actorMap: Map<number,ActorTable> = new Map();
    public get actorMap(): Map<number, ActorTable>{
        return this._actorMap;
    }
    public constructor(){
        let a1:ActorTable = new ActorTable();
        a1.id = 1000;
        a1.hp = 10000;
        a1.atk = 20;
        a1.file2d = "./res/player.png";
        a1.file3d = "./res/3dScene/cike/Conventional/cike.lh";
        this._actorMap.set(a1.id,a1);
    }

    public getActorById(id:number):ActorTable{
        if(this._actorMap.has(id)){
            return this._actorMap.get(id);
        }else{
            console.warn("can't not find actor by id:" + id);
            return null;
        }
    }
}
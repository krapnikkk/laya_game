export default class SpawnParticle extends Laya.Script {

    constructor() { super(); }



    private _prefab: Laya.Sprite3D;
    private _parent: Laya.Node;
    init(prefab: Laya.Sprite3D, parent: Laya.Node) {
        this._prefab = prefab;
        this._parent = parent;
        Laya.stage.on("SpawnParticle", this, this.spawn);
    }

    spawn(pos:Laya.Vector3) {
        let sprite3D = Laya.Pool.getItemByCreateFun("Particle", this.create, this) as Laya.Sprite3D;
        this._parent.addChild(sprite3D);
        sprite3D.transform.localPosition = pos;
        Laya.timer.once(1500,this,()=>{
            sprite3D.removeSelf();
            Laya.Pool.recover("Particle",sprite3D);
        })
    }

    create() {
        return Laya.Sprite3D.instantiate(this._prefab, this._parent);
    }
}
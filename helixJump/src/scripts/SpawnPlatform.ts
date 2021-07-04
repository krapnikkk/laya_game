export default class SpawnPlatform extends Laya.Script {

    constructor() { super(); }

    onEnable(): void {
    }

    onDisable(): void {
    }

    private _curIdx: number = 0;
    private _curPosY: number = -1;
    private _spanHeight: number = 1.5;
    private _prefab: Laya.Sprite3D;
    private _parent: Laya.Node;
    private _platformArr:Laya.Sprite3D[]=[];
    init(prefab: Laya.Sprite3D, parent: Laya.Node) {
        this._prefab = prefab;
        this._parent = parent;
        this.createPlatform();
        Laya.stage.on("SpawnPlatform", this, this.spawn);
        Laya.stage.on("Continue",this,this.reset);
    }

    reset(){
        this._platformArr.forEach((item)=>{
            if(item.displayedInStage){
                item.removeSelf();
                Laya.Pool.recover("Platform",item);
            }
        })
        this._curIdx = 0;
        this.createPlatform();
        this._platformArr = [];
    }

    createPlatform(){
        for (let i = 0; i < 5; i++) {
            this.spawn();
        }
    }

    spawn() {
        let sprite3D = Laya.Pool.getItemByCreateFun("Platform", this.create, this);
        let posY = this._curPosY - (this._curIdx * this._spanHeight);
        sprite3D.transform.localPosition = new Laya.Vector3(0, posY, 0);
        this._parent.addChild(sprite3D);
        this.emptyPlatform(sprite3D);
        this._platformArr.push(sprite3D);
        this._curIdx++;
    }

    create() {
        return Laya.Sprite3D.instantiate(this._prefab, this._parent);
    }

    emptyPlatform(platform: Laya.Sprite3D) {
        let count = 0;
        let obstacleIdx = this.getRandom(0, platform.numChildren - 1);
        if(this._curIdx==0){
            this.resetPlatform(platform);
            return;
        }
        for (let i = 0; i < platform.numChildren; i++) {
            let child = platform.getChildAt(i) as Laya.MeshSprite3D;
            child.meshRenderer.enable = true;
            child.getComponent(Laya.PhysicsCollider).isTrigger = false;
            (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.x = 0;
            (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.y = 0;
            (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.z = 0;
            child.name = "Bar";
            let rnd = this.getRandom(0, 10);
            if (obstacleIdx != i && count <= 4 && rnd > 8) {
                count++;
                child.meshRenderer.enable = false;
                child.getComponent(Laya.PhysicsCollider).isTrigger = true;
            } else if (obstacleIdx == i) {
                child.name = "Obstacle";
                (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.x = 1;
                (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.y = 0;
                (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.z = 0;
            }
        }

        if (count == 0) {
            let child = platform.getChildAt(0) as Laya.MeshSprite3D;
            child.name = "Bar";
            child.meshRenderer.enable = false;
            child.getComponent(Laya.PhysicsCollider).isTrigger = true;
        }
    }

    resetPlatform(platform: Laya.Sprite3D) {
        for (let i = 0; i < platform.numChildren; i++) {
            let child = platform.getChildAt(i) as Laya.MeshSprite3D;
            (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.x = 0;
            (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.y = 0;
            (child.meshRenderer.material as Laya.PBRStandardMaterial).albedoColor.z = 0;
            child.name = "Bar";
            if (i == 0 || i == 1) {
                child.meshRenderer.enable = false;
                child.getComponent(Laya.PhysicsCollider).isTrigger = true;
            } else {
                child.meshRenderer.enable = true;
                child.getComponent(Laya.PhysicsCollider).isTrigger = false;
            }
        }
    }

    getRandom(min: number, max: number) {
        let delta = max - min;
        let randomValue = Math.random() * delta;
        return min + Math.round(randomValue);
    }
}
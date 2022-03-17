export enum tileType {
    TILE,
    HOLE,
    MOVIING_SPIKE,
    SMASHING_SPIKE
}
import { rnd, sleep } from "../utils";
import Gem from "./Gem";
import PlayerController from "./PlayerController";
import Spike from "./Spike";

export default class MapManager extends Laya.Script {
    constructor() {
        super();
        Laya.stage.on("start", this, this.startFallDown);
        Laya.stage.on("over", this, this.stopFallDown);
    }

    wallPrefab: Laya.Sprite3D;
    tilePrefab: Laya.Sprite3D;
    gemPrefab: Laya.Sprite3D;
    playerController: PlayerController;
    movingSpikePrefab: Laya.Sprite3D;
    smashingSpikePrefab: Laya.Sprite3D;

    onAwake() {
        this.tilePrefab = Laya.Loader.getRes("./res/3dScene/tile/Conventional/tile.lh") as Laya.Sprite3D;
        this.wallPrefab = Laya.Loader.getRes("./res/3dScene/wall/Conventional/wall.lh") as Laya.Sprite3D;
        this.gemPrefab = Laya.Loader.getRes("./res/3dScene/gem/Conventional/gem.lh") as Laya.Sprite3D;
        this.movingSpikePrefab = Laya.Loader.getRes("./res/3dScene/moving_spikes/Conventional/moving_spikes.lh") as Laya.Sprite3D;
        this.smashingSpikePrefab = Laya.Loader.getRes("./res/3dScene/smashing_spikes/Conventional/smashing_spikes.lh") as Laya.Sprite3D;

    }

    setPlayer(player: PlayerController) {
        this.playerController = player;
    }


    // 地板生成
    tileList: Laya.Sprite3D[][] = [];
    tileWidth: number = 0.25;
    tileDistance: number = Math.SQRT2 * this.tileWidth;
    halfDistance: number = this.tileDistance / 2;
    rotation: Laya.Vector3 = new Laya.Vector3(-90, 45, 0);
    createMapItem(offsetZ: number = 0) {
        let deepColor = new Laya.Vector4(124 / 255, 155 / 255, 230 / 255, 1);
        let pureColor = new Laya.Vector4(125 / 255, 169 / 255, 233 / 255, 1);
        let wallColor = new Laya.Vector4(87 / 255, 93 / 255, 169 / 255, 1);
        for (let i = 0; i < 10; i++) {
            let gameObj: Laya.Sprite3D;
            let pos: Laya.Vector3;
            let list = [];
            for (let j = 0; j < 6; j++) {
                pos = new Laya.Vector3(j * this.tileDistance, 0, i * this.tileDistance + offsetZ);
                if (j == 0 || j == 5) {
                    gameObj = Laya.Pool.getItemByCreateFun("wall", this.createWall, this);
                    ((gameObj as Laya.MeshSprite3D).meshRenderer.material as Laya.BlinnPhongMaterial).albedoColor = wallColor;
                    (gameObj as Laya.MeshSprite3D).meshRenderer.castShadow = true;
                } else {
                    let pr = this.calProbability();
                    if (pr == tileType.TILE) {
                        gameObj = Laya.Pool.getItemByCreateFun("tile", this.createTile, this);
                        let floor = gameObj.getChildByName("normal_a2") as Laya.MeshSprite3D;
                        (floor.meshRenderer.material as Laya.BlinnPhongMaterial).albedoColor = deepColor;
                        (gameObj as Laya.MeshSprite3D).meshRenderer.receiveShadow = true;
                        if (offsetZ != 0) {
                            this.addGem(gameObj);
                        }
                    } else if (pr == tileType.HOLE) {
                        gameObj = Laya.Pool.getItemByCreateFun("hole", this.createHole, this);
                    } else if (pr == tileType.MOVIING_SPIKE) {
                        gameObj = Laya.Pool.getItemByCreateFun("moving_spikes", this.createMovingSpike, this);
                        let spike: Spike = gameObj.addComponent(Spike);
                        spike.setType(tileType.MOVIING_SPIKE);
                    } else if (pr == tileType.SMASHING_SPIKE) {
                        gameObj = Laya.Pool.getItemByCreateFun("smashing_spikes", this.createSmashingSpike, this);
                        let spike: Spike = gameObj.addComponent(Spike);
                        spike.setType(tileType.SMASHING_SPIKE);
                    }
                }
                gameObj.transform.rotationEuler = this.rotation;
                gameObj.transform.localPosition = pos;
                this.owner.addChild(gameObj);
                list[j] = gameObj;
            }
            this.tileList.push(list);
            list = [];
            for (let j = 0; j < 5; j++) {
                pos = new Laya.Vector3(j * this.tileDistance + this.halfDistance, 0, i * this.tileDistance + this.halfDistance + offsetZ);
                let pr = this.calProbability();

                if (pr == tileType.TILE) {
                    gameObj = Laya.Pool.getItemByCreateFun("tile", this.createTile, this);
                    let floor = gameObj.getChildByName("normal_a2") as Laya.MeshSprite3D;
                    (floor.meshRenderer.material as Laya.BlinnPhongMaterial).albedoColor = pureColor;
                    (gameObj as Laya.MeshSprite3D).meshRenderer.receiveShadow = true;
                    if (offsetZ != 0) {
                        this.addGem(gameObj);
                    }
                } else if (pr == tileType.HOLE) {
                    gameObj = Laya.Pool.getItemByCreateFun("hole", this.createHole, this);
                } else if (pr == tileType.MOVIING_SPIKE) {
                    gameObj = Laya.Pool.getItemByCreateFun("moving_spikes", this.createMovingSpike, this);
                    let spike: Spike = gameObj.addComponent(Spike);
                    spike.setType(tileType.MOVIING_SPIKE);
                } else if (pr == tileType.SMASHING_SPIKE) {
                    gameObj = Laya.Pool.getItemByCreateFun("smashing_spikes", this.createSmashingSpike, this);
                    let spike: Spike = gameObj.addComponent(Spike);
                    spike.setType(tileType.SMASHING_SPIKE);
                }
                gameObj.transform.rotationEuler = this.rotation;
                gameObj.transform.localPosition = pos;

                list[j] = gameObj;
                this.owner.addChild(gameObj);
            }
            this.tileList.push(list);

        }
    }

    resetMap() {
        for (let i = 0; i < this.tileList.length; i++) {
            for(let j = 0;j<this.tileList[i].length;j++){
                let item = this.tileList[i][j];
                this.destroyItem(item, true);
            }
        }
        this.tileList.length = 0;
        this.downTileIndex = 0;
        this.holeProbability = 0;
        this.movingProbability = 0;
        this.smashingProbability = 0;
        this.gemProbability = 2;
        this.createMapItem();
        this.playerController.resetStatus();
        this.needBuild = false;
        Laya.timer.once(this.fallDownSpan, this, this.tileDown, null, false);
    }

    createWall() {
        return Laya.Sprite3D.instantiate(this.wallPrefab, this.owner);
    }

    createTile() {
        return Laya.Sprite3D.instantiate(this.tilePrefab, this.owner);
    }

    createHole(){
        return new Laya.Sprite3D("hole");
    }

    createMovingSpike() {
        return Laya.Sprite3D.instantiate(this.movingSpikePrefab, this.owner);
    }

    createSmashingSpike() {
        return Laya.Sprite3D.instantiate(this.smashingSpikePrefab, this.owner);
    }

    createGem() {
        return Laya.Sprite3D.instantiate(this.gemPrefab);
    }

    // 陷阱生成
    /**
     * 0 tile
     * 1 hole
     * 2 trap
     * 3 fallTrap
     */
    holeProbability: number = 0;
    movingProbability: number = 0;
    smashingProbability: number = 0;
    gemProbability: number = 2;
    calProbability(): tileType {
        let pr = rnd(1, 100);
        if (pr < this.holeProbability) {
            return tileType.HOLE;
        } else if (31 < pr && pr < this.movingProbability + 30) {
            return tileType.MOVIING_SPIKE;
        } else if (61 < pr && pr < this.smashingProbability + 60) {
            return tileType.SMASHING_SPIKE
        }
        return tileType.TILE;
    }

    addProbability(): void {
        this.holeProbability += 2;
        this.movingProbability += 2;
        this.smashingProbability += 2;
    }

    calcGemcalProbability(): boolean {
        let pr = rnd(1, 100);
        if (pr <= this.gemProbability) {
            return true;
        }
        return false;
    }

    addGem(obj: Laya.Sprite3D) {
        let pr = this.calcGemcalProbability();
        if (pr) {
            let gem: Laya.Sprite3D = Laya.Pool.getItemByCreateFun("gem", this.createGem, this);
            obj.addChild(gem);
            let target = new Laya.Vector3(0, -0.1, 0.06);
            gem.transform.localPosition = target;
            gem.addComponent(Gem);
        }
    }

    downTileIndex: number = 0;
    fallDownSpan: number = 200;
    startFall: boolean = false;
    needBuild: boolean = false;
    startFallDown() {
        this.startFall = true;
        if (this.needBuild) {
            this.resetMap();
        } else {
            Laya.timer.once(this.fallDownSpan, this, this.tileDown, null, false);
        }
        
    }

    stopFallDown() {
        this.needBuild = true;
        this.startFall = false;
        Laya.timer.clear(this, this.tileDown);
    }

    tileDown() {
        if (!this.startFall) {
            return;
        }
        for (let i = 0; i < this.tileList[this.downTileIndex].length; i++) {
            let obj = this.tileList[this.downTileIndex][i];
            let rb: Laya.Rigidbody3D = obj.getComponent(Laya.Rigidbody3D)
            rb = !rb ? obj.addComponent(Laya.Rigidbody3D) : rb;
            let boxShape: Laya.BoxColliderShape = new Laya.BoxColliderShape(this.tileWidth, this.tileWidth, this.tileWidth);
            rb.colliderShape = boxShape;
            let num = rnd(1, 10);
            rb.angularVelocity = new Laya.Vector3(rnd(0, 1) * num, rnd(0, 1) * num, rnd(0, 1) * num);
            rb.gravity = new Laya.Vector3(0,-10,0);
            let spike: Spike = obj.getComponent(Spike);
            if (spike) {
                spike.stop();
            }
            this.destroyItem(obj);
        }

        if (this.playerController.z == this.downTileIndex) {
            this.stopFallDown();
            this.playerController.fallDown();
        }
        this.tileList[this.downTileIndex].length = 0;
        this.downTileIndex++;
        Laya.timer.once(this.fallDownSpan, this, this.tileDown, null, false);
    }

    async destroyItem(item: Laya.Sprite3D, now: boolean = false) {
        if (!now) {
            await sleep(1000);
        }
        if (item.displayedInStage) {
            item.removeSelf();
            let rb = item.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
            if (rb) {
                rb.angularVelocity = new Laya.Vector3();
                rb.gravity = new Laya.Vector3();
                rb.colliderShape = null;
            }
            let spike = item.getComponent(Spike) as Spike;
            if (spike) {
                spike.resetFloor();
            }
            let child = item.getChildByName("gem");
            if (child) {
                child.removeSelf();
                Laya.Pool.recover(child.name, child);
            }
            Laya.Pool.recover(item.name, item);
        }
    }
}
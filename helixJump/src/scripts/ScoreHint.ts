export default class ScoreHint extends Laya.Script {
    /** @prop {name:txt_Hint, tips:"提示文本", type:Prefab, default:null}*/
    public txt_Hint: Laya.Prefab;

    
    constructor() { super(); }
    
    onEnable(): void {
    }

    onDisable(): void {
    }

    onAwake(){
        // Laya.loader.load("prefab/txt_Hint.json",Laya.Handler.create(this,(prefab)=>{

        // }),null,Laya.Loader.PREFAB);
        Laya.stage.on("Hint",this,this.show);
        
    }

    show(score:number){
        let txt_hint = Laya.Pool.getItemByCreateFun("Hint",this.create,this) as Laya.Text;
        txt_hint.text = `+${score}`;
        Laya.stage.addChild(txt_hint);
        txt_hint.pos(250,650);
        Laya.Tween.to(txt_hint,{y:650 - 30},500,Laya.Ease.backIn,Laya.Handler.create(this,()=>{
            txt_hint.removeSelf();
            Laya.Pool.recover("Hint",txt_hint);
        }))
    }

    create(){
        return this.txt_Hint.create();
    }
}
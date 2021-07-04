export default class UIManager extends Laya.Script {
    /** @prop {name:txt_score, tips:"分数文本", type:Node, default:null}*/
    public txt_score: Laya.Text;
    /** @prop {name:panel_result, tips:"结束面板", type:Node, default:null}*/
    public panel_result: Laya.Sprite;
    
    constructor() { super(); }
    
    private _score:number = 0;
    onAwake(){
        Laya.stage.on("AddScore",this,this.addScore);
        Laya.stage.on("GameOver",this,this.gameOver);
    }

    addScore(score:number){
        this._score+=score;
        this.txt_score.text = `${this._score}`;
    }

    gameOver(){
        this.panel_result.visible = true;
        this.txt_score.visible = false;
        (this.panel_result.getChildByName("txt_result_score") as Laya.Text).text = `${this._score}`;
        (this.panel_result.getChildByName("btn_continue") as Laya.Button).on(Laya.Event.CLICK,this,this.onContinue);
    }

    onContinue(){
        this._score = 0;
        this.txt_score.visible = true;
        this.panel_result.visible = false;
        Laya.stage.event("Continue");
        (this.panel_result.getChildByName("btn_continue") as Laya.Button).off(Laya.Event.CLICK,this,this.onContinue);
    }

    onEnable(): void {
    }

    onDisable(): void {
    }
}
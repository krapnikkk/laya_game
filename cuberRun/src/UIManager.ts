export default class UIManager {
    private static _ins: UIManager;
    public static get ins(): UIManager {
        if (this._ins == null) {
            this._ins = new UIManager();
        }
        return this._ins;
    }

    private constructor() {
        if (UIManager._ins) {
            throw "singleton class is not use new constructor!";
        }
    }

    homeView: fairygui.GComponent;
    init() {
        Laya.stage.addChild(fgui.GRoot.inst.displayObject);
        this.homeView = fgui.UIPackage.createObject("home", "Main") as fairygui.GComponent;
        fgui.GRoot.inst.addChild(this.homeView);
        this.initUI();
    }

    gameStart: boolean = false;
    gem: number = 0;
    bestScore: number = 0;
    txtGem: fairygui.GTextField;
    txtBest: fairygui.GTextField;
    startController: fairygui.Controller;
    initUI() {
        let btn_start = this.homeView.getChild("btn_start");
        btn_start.onClick(this, this.startGame);

        let btn_left = this.homeView.getChild("btn_left");
        let btn_right = this.homeView.getChild("btn_right");
        btn_left.onClick(this, this.move, ["left"]);
        btn_right.onClick(this, this.move, ["right"]);

        this.txtBest = this.homeView.getChild("txt_best") as fairygui.GTextField;
        this.txtGem = this.homeView.getChild("txt_gem") as fairygui.GTextField;
        this.bestScore = +Laya.LocalStorage.getItem("best") || 0;
        this.txtBest.text = this.bestScore + "";
        this.startController = this.homeView.getController("status");
        Laya.stage.on("over", this, this.gameOver);
        Laya.stage.on("updateScore", this, this.updateScore);

    }

    move(direction: string) {
        if (this.gameStart) {
            Laya.stage.event("move", direction);
        }
    }

    startGame() {
        this.gameStart = true;
        Laya.stage.event("start");
        Laya.timer.resume();
        Laya.timer.scale = 1;
        this.startController.selectedIndex = 1;
    }

    gameOver() {
        this.gameStart = false;
        this.startController.selectedIndex = 0;
        if (this.bestScore < this.gem) {
            Laya.LocalStorage.setItem("best", this.gem + "");
            this.bestScore = this.gem;
        }
        this.txtBest.text = this.bestScore + "";
        this.gem = 0;
    }

    updateScore() {
        this.gem++;
        this.txtGem.text = this.gem + "";
    }


}
import ActorBase from "../ActorBase";

export default class AnimationController {
    private _animator: Laya.Animator;
    private _completeHandler: Laya.Handler;
    private _keyframeHandler: Laya.Handler;
    private _keyframe: number = -1;
    private _isPlaying: boolean;
    constructor(animator: Laya.Animator) {
        this._animator = animator;
    }

    playAni(name: string, isLoop: boolean = false, completeHandler: Laya.Handler = null) {
        if (this._animator) {
            // let count = isLoop ? Number.MAX_VALUE : 0;
            this._completeHandler = completeHandler;
            // this._keyframeHandler = keyframeHandler;
            // this._keyframe = keyframe;
            // // this._animator

            // let state = new Laya.AnimatorState();
            // //设置动作状态的名称
            // state.name = name;
            // //设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
            // state.clipStart = 10 / 40;
            // //设置动作状态播放的结束时间
            // state.clipEnd = 20 / 40;
            // //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
            // state.clip = this._animator.getDefaultState().clip;
            // //动画播放是否循环
            // state.clip.islooping = isLoop;
            // //添加动画状态到动画组件里
            // this._animator.addState(state);
            //播放动画
            this._animator.play(name);
            Laya.timer.frameLoop(1, this, ()=> {
                if (this._animator.getControllerLayer(0).getCurrentPlayState().normalizedTime >= 1) {
                    this.onAniFinish();
                }
            })
        }
    }

    private onAniFinish(): void {
        if (this._completeHandler) {
            this._completeHandler.run();
            // this._completeHandler.recover();
            this._completeHandler = null;
        }
    }

    private stop(): void {
        this._keyframeHandler = null;
        this._completeHandler = null;
        this._keyframe = -1;
    }

    public update(): void {
        if (this._isPlaying) {
            if (this._keyframe > 0 && this._keyframeHandler) {
                this._keyframeHandler.run();
                this._keyframeHandler = null;
            }
        }
    }

}
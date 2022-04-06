export default class State {

    protected _owner: Object;
    public get owner(): Object {
        return this._owner;
    }

    constructor(owner:object){
        this._owner = owner;
    }

    onEnter(obj: Object): void {

    }

    onLeave(newState: string): void {

    }

    getStateKey(): string {
        return "";
    }

    onUpdate(): void {

    }
}
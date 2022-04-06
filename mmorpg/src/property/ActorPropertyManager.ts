import Actor from "../actor/Actor";
import ActorProperty from "./ActorProperty";
import { ActorPropertyType } from "./ActorPropertyType";

export default class ActorPropertyManager {
    private _owner: Actor;
    protected _baseProperty: ActorProperty;
    protected _deltaProperty: ActorProperty;

    public constructor(owner: Actor) {
        this._owner = owner;
        this._baseProperty = new ActorProperty();
        this._deltaProperty = new ActorProperty();
        this.clear();
    }

    public getBaseProperty(type: ActorPropertyType): number {
        return this._baseProperty[type];
    }

    public setBaseProperty(type: ActorPropertyType,value:number): void {
        this._baseProperty.setProperty(type,value);
    }

    public getProperty(type:number):number{
        let max = this._baseProperty.getProperty(type);
        let delta = this._deltaProperty.getProperty(type);
        return max + delta;
    }

    public changeProperty(type:ActorPropertyType,value:number){
        let max = this.getProperty(type) + value
        if (max>this.getBaseProperty(type)){
            this._deltaProperty.setProperty(type,0);
        }else if(max<=0){
            this._deltaProperty.setProperty(type, -this.getBaseProperty(type));
        } else {
            this._deltaProperty.setProperty(type, value);
        }
    }

    public clear():void{
        for (let i = 0; i < Object.keys(ActorPropertyType).length; i++) {
            this._baseProperty.setProperty(i, 0);
            this._deltaProperty.setProperty(i, 0);
        }
    }

}
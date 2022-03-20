import { ActorPropertyType } from "./ActorPropertyType";

export default class ActorProperty {
    hp: number;
    speed: number;
    private _propertiesMap: Map<ActorPropertyType, number> = new Map();
    constructor() {

    }


    getProperty(type: ActorPropertyType): number {
        if (this._propertiesMap.has(type)) {
            return this._propertiesMap.get(type);
        } else {
            return -1;
        }
    }

    changeProperty(type: ActorPropertyType, value: number): void {
        let old = this.getProperty(type);
        value += old;
        this.setProperty(type,value);
    }

    setProperty(type: ActorPropertyType, value: number){
        this._propertiesMap.set(type,value);
    }

    clear():void{
        this._propertiesMap.clear();
    }

}
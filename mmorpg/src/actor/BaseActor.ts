import ActorProperty from "../property/ActorProperty";
import { ActorCamp, ActorType } from "./ActorType";

export default class ActorBase {
    protected _type: ActorType;
    public get type(): ActorType {
        return this._type;
    }
    protected _camp: ActorCamp;
    public get camp(): ActorCamp {
        return this._camp;
    }

    protected _actorProperty:ActorProperty;
    constructor(type: ActorType, camp: ActorCamp) {
        this._type = type;
        this._camp = camp;
        this._actorProperty = new ActorProperty();
    }

    public isActorType(type: ActorType): boolean {
        return this._type == type;
    }

    public isActorCamp(camp: ActorCamp): boolean {
        return this._camp == camp;
    }
}

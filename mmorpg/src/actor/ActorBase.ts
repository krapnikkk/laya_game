import ActorTable from "../data/ActorTable";
import DataManager from "../data/DataManager";
import ActorProperty from "../property/ActorProperty";
import ActorPropertyManager from "../property/ActorPropertyManager";
import { ActorCamp, ActorType } from "./ActorType";
import DataFactory from "../data/DataFactory";

export default class ActorBase {
    protected _templateId:number;
    protected _templateData:ActorTable;
    public get templateData():ActorTable{
        return this._templateData;
    }
    protected _type: ActorType;
    public get type(): ActorType {
        return this._type;
    }
    protected _camp: ActorCamp;
    public get camp(): ActorCamp {
        return this._camp;
    }
    constructor(templateId:number,type: ActorType, camp: ActorCamp) {
        this._type = type;
        this._camp = camp;
        this._templateId = templateId;
        this._templateData = DataFactory.getActorById(templateId);
        }

    public isActorType(type: ActorType): boolean {
        return this._type == type;
    }

    public isActorCamp(camp: ActorCamp): boolean {
        return this._camp == camp;
    }
}

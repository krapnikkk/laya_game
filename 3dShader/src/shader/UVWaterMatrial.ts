export default class UVWaterMatrial extends Laya.Material {

    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static ALBODECOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static WIDTH = Laya.Shader3D.propertyNameToID("u_Width");
    public static SPEED = Laya.Shader3D.propertyNameToID("u_Speed");

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();
        this.setShaderName("UVWater");
        this.albedoColor = new Laya.Vector4(1.0,1.0,1.0,1.0);

        this.width = 8.0;
        this.speed = 1.0;
    }

    public set albedoColor(value: Laya.Vector4) {
        this._shaderValues.setVector(UVWaterMatrial.ALBODECOLOR, value);
    }

    public set albedoTexture(value: Laya.BaseTexture) {
        if (value) {
            this._shaderValues.addDefine(UVWaterMatrial.DEFINE_ALBEDOTEXTURE);
            this._shaderValues.setTexture(UVWaterMatrial.ALBODETEXTURE, value);
        } else {
            this._shaderValues.removeDefine(UVWaterMatrial.DEFINE_ALBEDOTEXTURE);
        }
    }

    public set speed(value:number){
        this._shaderValues.setNumber(UVWaterMatrial.SPEED,value);
    }

    public set width(value:number){
        this._shaderValues.setNumber(UVWaterMatrial.WIDTH,value);
    }

}
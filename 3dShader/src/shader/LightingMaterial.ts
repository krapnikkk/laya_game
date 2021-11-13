import LightingShader from "./LightingShader";

export default class LightingMaterial extends Laya.Material {

    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static ALBODECOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static SHININESS = Laya.Shader3D.propertyNameToID("u_Shininess");
    public static SPECULARCOLOR = Laya.Shader3D.propertyNameToID("u_SpecularColor");


    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();
        this.setShaderName("Lighting");
        this.albedoColor = new Laya.Vector4(1,1,1,1);
        this.specularColor = new Laya.Vector4(1,1,1,1);

    }

    public set albedoColor(value: Laya.Vector4) {
        this._shaderValues.setVector(LightingMaterial.ALBODECOLOR, value);
    }

    public set albedoTexture(value: Laya.BaseTexture) {
        if (value) {
            this._shaderValues.addDefine(LightingMaterial.DEFINE_ALBEDOTEXTURE);
        } else {
            this._shaderValues.removeDefine(LightingMaterial.DEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(LightingMaterial.ALBODETEXTURE, value);
    }

    public set shininess(value:number){
        this._shaderValues.setNumber(LightingMaterial.SHININESS,value);
    }

    public set specularColor(value:Laya.Vector4){
        this._shaderValues.setVector(LightingMaterial.SPECULARCOLOR,value);
    }
}
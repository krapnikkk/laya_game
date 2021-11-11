export default class LightingMaterial extends Laya.Material {

    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static ALBODECOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");


    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();
        this.setShaderName("Lighting");
        this.albedoColor = new Laya.Vector4(1,1,1,1);

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
}
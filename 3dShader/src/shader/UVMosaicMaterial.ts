export default class UVMosaicMaterial extends Laya.Material {

    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static ALBODECOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");

    public static TEXSIZE = Laya.Shader3D.propertyNameToID("u_TexSize");
    public static MOSAICSIZE = Laya.Shader3D.propertyNameToID("u_MosaicSize");

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();
        this.setShaderName("UVMosaic");
        this.albedoColor = new Laya.Vector4(1.0,1.0,1.0,1.0);

    }

    public set albedoColor(value: Laya.Vector4) {
        this._shaderValues.setVector(UVMosaicMaterial.ALBODECOLOR, value);
    }

    public set albedoTexture(value: Laya.BaseTexture) {
        if (value) {
            this._shaderValues.addDefine(UVMosaicMaterial.DEFINE_ALBEDOTEXTURE);
            this._shaderValues.setTexture(UVMosaicMaterial.ALBODETEXTURE, value);
        } else {
            this._shaderValues.removeDefine(UVMosaicMaterial.DEFINE_ALBEDOTEXTURE);
        }
    }

    public set mosaicSize(value:number){
        this._shaderValues.setNumber(UVMosaicMaterial.MOSAICSIZE,value);
    }

    public set texSize(value:Laya.Vector2){
        this._shaderValues.setVector2(UVMosaicMaterial.TEXSIZE,value);
    }

}
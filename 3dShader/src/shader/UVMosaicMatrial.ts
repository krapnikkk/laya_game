export default class UVMosaicMatrial extends Laya.Material {

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
        this._shaderValues.setVector(UVMosaicMatrial.ALBODECOLOR, value);
    }

    public set albedoTexture(value: Laya.BaseTexture) {
        if (value) {
            this._shaderValues.addDefine(UVMosaicMatrial.DEFINE_ALBEDOTEXTURE);
            this._shaderValues.setTexture(UVMosaicMatrial.ALBODETEXTURE, value);
        } else {
            this._shaderValues.removeDefine(UVMosaicMatrial.DEFINE_ALBEDOTEXTURE);
        }
    }

    public set mosaicSize(value:number){
        this._shaderValues.setNumber(UVMosaicMatrial.MOSAICSIZE,value);
    }

    public set texSize(value:Laya.Vector2){
        this._shaderValues.setVector2(UVMosaicMatrial.TEXSIZE,value);
    }

}
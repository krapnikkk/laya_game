export default class UVBlurMaterial extends Laya.Material {

    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static ALBODECOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static BLURWIDTH = Laya.Shader3D.propertyNameToID("u_BlurWidth");
    public static SPEED = Laya.Shader3D.propertyNameToID("u_Speed");

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();
        this.setShaderName("UVBlur");
        this.albedoColor = new Laya.Vector4(1.0,1.0,1.0,1.0);

        this.blurWidth = 0.0005;
        this.speed = 1.0;
    }

    public set albedoColor(value: Laya.Vector4) {
        this._shaderValues.setVector(UVBlurMaterial.ALBODECOLOR, value);
    }

    public set albedoTexture(value: Laya.BaseTexture) {
        if (value) {
            this._shaderValues.addDefine(UVBlurMaterial.DEFINE_ALBEDOTEXTURE);
            this._shaderValues.setTexture(UVBlurMaterial.ALBODETEXTURE, value);
        } else {
            this._shaderValues.removeDefine(UVBlurMaterial.DEFINE_ALBEDOTEXTURE);
        }
    }

    public set speed(value:number){
        this._shaderValues.setNumber(UVBlurMaterial.SPEED,value);
    }

    public set blurWidth(value:number){
        this._shaderValues.setNumber(UVBlurMaterial.BLURWIDTH,value);
    }

}
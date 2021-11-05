export default class VertexUVAniMatrial extends Laya.Material {

    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static ALBODECOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static WH = Laya.Shader3D.propertyNameToID("u_WH");

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();
        this.setShaderName("vertexUVAni");
        this.albedoColor = new Laya.Vector4(1.0,1.0,1.0,1.0);
        this.WH = new Laya.Vector2(4,4);

    }

    public set albedoColor(value: Laya.Vector4) {
        this._shaderValues.setVector(VertexUVAniMatrial.ALBODECOLOR, value);
    }

    public set albedoTexture(value: Laya.BaseTexture) {
        if (value) {
            this._shaderValues.addDefine(VertexUVAniMatrial.DEFINE_ALBEDOTEXTURE);
            this._shaderValues.setTexture(VertexUVAniMatrial.ALBODETEXTURE, value);
        } else {
            this._shaderValues.removeDefine(VertexUVAniMatrial.DEFINE_ALBEDOTEXTURE);
        }
    }

    public set WH(value:Laya.Vector2){
        this._shaderValues.setVector2(VertexUVAniMatrial.WH,value)
    }

}
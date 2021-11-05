export default class VertexUVMatrial extends Laya.Material {

    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static TILINGOFFSET = Laya.Shader3D.propertyNameToID("u_TilingOffset");

    constructor() {
        super();
        this.setShaderName("VertexUV");
    }

    public set albedoTexture(value: Laya.BaseTexture) {
        this._shaderValues.setTexture(VertexUVMatrial.ALBODETEXTURE, value);
    }

    public set tilingOffset(value:Laya.Vector4){
        this._shaderValues.setVector(VertexUVMatrial.TILINGOFFSET,value);
    }
}
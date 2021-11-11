export default class TerrainMaterial extends Laya.Material {

    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static ALBODECOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static SECONDTEXTURE = Laya.Shader3D.propertyNameToID("u_SecondTexture");

 

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");
    public static DEFINE_SECONDTEXTURE = Laya.Shader3D.getDefineByName("SECONDTEXTURE");

    constructor() {
        super();
        this.setShaderName("Terrain");
        this.albedoColor = new Laya.Vector4(1.0,1.0,1.0,1.0);

    }

    public set albedoColor(value: Laya.Vector4) {
        this._shaderValues.setVector(TerrainMaterial.ALBODECOLOR, value);
    }

    public set albedoTexture(value: Laya.BaseTexture) {
        if (value) {
            this._shaderValues.addDefine(TerrainMaterial.DEFINE_ALBEDOTEXTURE);
            this._shaderValues.setTexture(TerrainMaterial.ALBODETEXTURE, value);
        } else {
            this._shaderValues.removeDefine(TerrainMaterial.DEFINE_ALBEDOTEXTURE);
        }
    }

    public set secondTexture(value: Laya.BaseTexture){
        if (value) {
            this._shaderValues.addDefine(TerrainMaterial.DEFINE_SECONDTEXTURE);
            this._shaderValues.setTexture(TerrainMaterial.SECONDTEXTURE, value);
        } else {
            this._shaderValues.removeDefine(TerrainMaterial.DEFINE_SECONDTEXTURE);
        }
    }


}
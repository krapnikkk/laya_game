export default class Material extends Laya.Material{
    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static DEFINE_ALBEDOCOLOR = Laya.Shader3D.getDefineByName("ALBEDOCOLOR");
    constructor(){
        super();
        
        this.setShaderName("shader");
        this.albedoColor = new Laya.Vector4(0.0,0.0,1.0,1.0);
        this._shaderValues.addDefine(Material.DEFINE_ALBEDOCOLOR);
        // this._shaderValues.removeDefine(Material.DEFINE_ALBEDOCOLOR);
    }

    public set albedoColor(value:Laya.Vector4){
        this._shaderValues.setVector(Material.ALBEDOCOLOR,value)
    }


}
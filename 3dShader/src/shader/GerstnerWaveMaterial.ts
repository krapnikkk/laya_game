export default class GerstnerWaveMaterial extends Laya.Material{
    public static WIDTH = Laya.Shader3D.propertyNameToID("u_Width");
    public static SPEED = Laya.Shader3D.propertyNameToID("u_Speed");
    // public static DEFINE_ALBEDOCOLOR = Laya.Shader3D.getDefineByName("ALBEDOCOLOR");
    constructor(){
        super();
        
        this.setShaderName("GerstnerWave");
        this.width = 0.5;
        this.speed = 0.5;
    }

    public set width(value:number){
        this._shaderValues.setNumber(GerstnerWaveMaterial.WIDTH,value)
    }

    public set speed(value:number){
        this._shaderValues.setNumber(GerstnerWaveMaterial.SPEED,value)
    }
}
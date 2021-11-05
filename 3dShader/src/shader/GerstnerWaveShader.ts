import verticesShader from "./GerstnerWave.vs";
import fragmentShader from "./GerstnerWave.fs";
export default class GerstnerWaveShader {
    public static initShader(): void {
        let attributeMap = {
            "a_Position":Laya.VertexMesh.MESH_POSITION0,
            "a_MvpMatrix":Laya.VertexMesh.MESH_WORLDMATRIX_ROW0
        };
        let uniformMap = {
            "u_MvpMatrix":Laya.Shader3D.PERIOD_SPRITE,
            "u_Time":Laya.Shader3D.PERIOD_SCENE,
            "u_Width":Laya.Shader3D.PERIOD_MATERIAL,
            "u_Speed":Laya.Shader3D.PERIOD_MATERIAL,
        };
        let shader = Laya.Shader3D.add("GerstnerWave");

        let subShader = new Laya.SubShader(attributeMap, uniformMap);

        shader.addSubShader(subShader);

        subShader.addShaderPass(verticesShader,fragmentShader);
    }
}
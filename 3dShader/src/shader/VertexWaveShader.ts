import verticesShader from "./vertexWave.vs";
import fragmentShader from "./vertexWave.fs";
export default class VertexWaveShader {
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
        let shader = Laya.Shader3D.add("VertexWave");

        let subShader = new Laya.SubShader(attributeMap, uniformMap);

        shader.addSubShader(subShader);

        subShader.addShaderPass(verticesShader,fragmentShader);
    }
}
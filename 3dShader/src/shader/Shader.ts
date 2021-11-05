import verticesShader from "./shader.vs";
import fragmentShader from "./shader.fs";
export default class Shader {
    public static initShader(): void {
        let attributeMap = {
            "a_Position":Laya.VertexMesh.MESH_POSITION0,
            "a_MvpMatrix":Laya.VertexMesh.MESH_WORLDMATRIX_ROW0
        };
        let uniformMap = {
            "u_MvpMatrix":Laya.Shader3D.PERIOD_SPRITE,
            "u_AlbedoColor":Laya.Shader3D.PERIOD_MATERIAL
        };
        let shader = Laya.Shader3D.add("shader");
        let subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(verticesShader,fragmentShader);
    }
}
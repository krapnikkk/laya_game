import verticesShader from "./NormalMove.vs";
import fragmentShader from "./NormalMove.fs";
export default class NormalMoveShader {
    public static initShader(): void {
        let attributeMap = {
            "a_Position":Laya.VertexMesh.MESH_POSITION0,
            "a_MvpMatrix":Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
            "a_Normal":Laya.VertexMesh.MESH_NORMAL0
        };
        let uniformMap = {
            "u_MvpMatrix":Laya.Shader3D.PERIOD_SPRITE,
            "u_Time":Laya.Shader3D.PERIOD_SCENE,
            "u_Width":Laya.Shader3D.PERIOD_MATERIAL,
            "u_Speed":Laya.Shader3D.PERIOD_MATERIAL,
        };
        let shader = Laya.Shader3D.add("NormalMove");

        let subShader = new Laya.SubShader(attributeMap, uniformMap);

        shader.addSubShader(subShader);

        subShader.addShaderPass(verticesShader,fragmentShader);
    }
}
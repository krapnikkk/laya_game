import verticesShader from "./UVWater.vs";
import fragmentShader from "./UVWater.fs";
export default class UVWaterShader {
    public static initShader(): void {
        let attributeMap = {
            "a_Position":Laya.VertexMesh.MESH_POSITION0,
            "a_MvpMatrix":Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
            "a_Color":Laya.VertexMesh.MESH_COLOR0,
            "a_TexCoord0":Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };
        let uniformMap = {
            "u_MvpMatrix":Laya.Shader3D.PERIOD_SPRITE,
            "u_Speed":Laya.Shader3D.PERIOD_MATERIAL,
            "u_Width":Laya.Shader3D.PERIOD_MATERIAL,
            "u_AlbedoTexture":Laya.Shader3D.PERIOD_MATERIAL,
            "u_AlbedoColor":Laya.Shader3D.PERIOD_MATERIAL,
            "u_Time":Laya.Shader3D.PERIOD_SCENE
        };
        let shader = Laya.Shader3D.add("UVWater");

        let subShader = new Laya.SubShader(attributeMap, uniformMap);

        shader.addSubShader(subShader);

        subShader.addShaderPass(verticesShader,fragmentShader);
    }
}
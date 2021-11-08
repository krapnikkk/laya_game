import verticesShader from "./Terrain.vs";
import fragmentShader from "./Terrain.fs";
export default class TerrainShader {
    public static initShader(): void {
        let attributeMap = {
            "a_MvpMatrix":Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
            
            "a_Position":Laya.VertexMesh.MESH_POSITION0,
            "a_TexCoord0":Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };
        let uniformMap = {
            "u_MvpMatrix":Laya.Shader3D.PERIOD_SPRITE,

            "u_AlbedoColor":Laya.Shader3D.PERIOD_MATERIAL,
            "u_AlbedoTexture":Laya.Shader3D.PERIOD_MATERIAL,
            "u_SecondTexture":Laya.Shader3D.PERIOD_MATERIAL
        };
        let shader = Laya.Shader3D.add("Terrain");

        let subShader = new Laya.SubShader(attributeMap, uniformMap);

        shader.addSubShader(subShader);

        subShader.addShaderPass(verticesShader,fragmentShader);
    }
}
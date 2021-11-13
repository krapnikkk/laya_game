import verticesShader from "./Lighting.vs";
import fragmentShader from "./Lighting.fs";
export default class LightingShader {
    public static initShader(): void {
        let attributeMap = {
            "a_WorldMat":Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
            "a_MvpMatrix":Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
            
            "a_Position":Laya.VertexMesh.MESH_POSITION0,
            "a_Normal":Laya.VertexMesh.MESH_NORMAL0,
            "a_TexCoord0":Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };
        let uniformMap = {
            "u_MvpMatrix":Laya.Shader3D.PERIOD_SPRITE,
            "u_WorldMat":Laya.Shader3D.PERIOD_SPRITE,
            "u_CameraPos":Laya.Shader3D.PERIOD_CAMERA,

            "u_AlbedoColor":Laya.Shader3D.PERIOD_MATERIAL,
            "u_AlbedoTexture":Laya.Shader3D.PERIOD_MATERIAL,
            "u_Shininess":Laya.Shader3D.PERIOD_MATERIAL,
            "u_SpecularColor":Laya.Shader3D.PERIOD_MATERIAL,

            "u_AmbientColor":Laya.Shader3D.PERIOD_SCENE,
            "u_DirationLightCount":Laya.Shader3D.PERIOD_SCENE,
            "u_LightBuffer":Laya.Shader3D.PERIOD_SCENE
        };
        let shader = Laya.Shader3D.add("Lighting");

        let subShader = new Laya.SubShader(attributeMap, uniformMap);

        shader.addSubShader(subShader);

        subShader.addShaderPass(verticesShader,fragmentShader);
    }
}
import MeshData from "./MeshData";

export default class BoxMesh{
    
    static createBox(long = 1, 
                     height = 1, 
                     width = 1):MeshData {

        var halfLong = long / 2;
        var halfHeight = height / 2;
        var halfWidth = width / 2;

        var boxMesh:MeshData = new MeshData();
        
        //上面
        boxMesh.addVertex(-halfLong, halfHeight, -halfWidth, 0, 1, 0, 0, 0 , 0,0,0,1);
        boxMesh.addVertex(halfLong, halfHeight, -halfWidth, 0, 1, 0, 1, 0 , 0,0,0,1);
        boxMesh.addVertex(halfLong, halfHeight, halfWidth, 0, 1, 0, 1, 1 , 0,0,0,1);
        boxMesh.addVertex(-halfLong, halfHeight, halfWidth, 0, 1, 0, 0, 1 , 0,0,0,1);
        //下面
        boxMesh.addVertex(-halfLong, -halfHeight, -halfWidth, 0, -1, 0, 0, 0 , 0,0,0,1);
        boxMesh.addVertex(halfLong, -halfHeight, -halfWidth, 0, -1, 0, 1, 0 , 0,0,0,1);
        boxMesh.addVertex(halfLong, -halfHeight, halfWidth, 0, -1, 0, 1, 0 , 0,0,0,1);
        boxMesh.addVertex(-halfLong, -halfHeight, halfWidth, 0, -1, 0, 0, 0 , 0,0,0,1);
        //右面
        boxMesh.addVertex(-halfLong, halfHeight, -halfWidth, -1, 0, 0, 0, 0 , 0,0,0,1);
        boxMesh.addVertex(-halfLong, halfHeight, halfWidth, -1, 0, 0, 1, 0 , 0,0,0,1);
        boxMesh.addVertex(-halfLong, -halfHeight, halfWidth, -1, 0, 0, 1, 0 , 0,0,0,1);
        boxMesh.addVertex(-halfLong, -halfHeight, -halfWidth, -1, 0, 0, 0, 0 , 0,0,0,1);
        //左面
        boxMesh.addVertex(halfLong, halfHeight, -halfWidth, 1, 0, 0, 1, 0 , 0,0,0,1);
        boxMesh.addVertex(halfLong, halfHeight, halfWidth, 1, 0, 0, 0, 0 , 0,0,0,1);
        boxMesh.addVertex(halfLong, -halfHeight, halfWidth, 1, 0, 0, 0, 0 , 0,0,0,1);
        boxMesh.addVertex(halfLong, -halfHeight, -halfWidth, 1, 0, 0, 1, 0 , 0,0,0,1);

        //前面
        boxMesh.addVertex(-halfLong, halfHeight, halfWidth, 0, 0, 1, 0, 0 , 1,0,0,1);
        boxMesh.addVertex(halfLong, halfHeight, halfWidth, 0, 0, 1, 1, 0 , 0,1,0,0);
        boxMesh.addVertex(halfLong, -halfHeight, halfWidth, 0, 0, 1, 1, 1 , 0,0,1,1);
        boxMesh.addVertex(-halfLong, -halfHeight, halfWidth, 0, 0, 1, 0, 1 , 1,1,0,1);

        
        //后面
        boxMesh.addVertex(-halfLong, halfHeight, -halfWidth, 0, 0, -1, 1, 0, 1,0,0,1);
        boxMesh.addVertex(halfLong, halfHeight, -halfWidth, 0, 0, -1, 0, 0, 0,1,0,0);
        boxMesh.addVertex(halfLong, -halfHeight, -halfWidth, 0, 0, -1, 0, 1, 0,0,1,1);
        boxMesh.addVertex(-halfLong, -halfHeight, -halfWidth, 0, 0, -1, 1, 1, 1,1,0,1);

        boxMesh.triangle.push(0, 1, 2, 2, 3, 0,
            4, 7, 6, 6, 5, 4,
            8, 9, 10, 10, 11, 8,
            12, 15, 14, 14, 13, 12,
            16, 17, 18, 18, 19, 16,
            20, 23, 22, 22, 21, 20);

        return boxMesh;
    }

}
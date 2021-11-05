import VertexObject from "./VertexObject";

export default class MeshData {
    // 顶点数组
    public vertexs: VertexObject[] = [];
    // 三角形数据
    public triangle: number[] = [];

    public createMesh(): Laya.Mesh {
        let vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV,COLOR");
        let vbArray: number[] = [];
        for (let i = 0; i < this.vertexs.length; i++) {
            let vertex: VertexObject = this.vertexs[i];
            vbArray.push(
                vertex.x,
                vertex.y,
                vertex.z,
                vertex.nx,
                vertex.ny,
                vertex.nz,
                vertex.u,
                vertex.v,
                vertex.r,
                vertex.g,
                vertex.b,
                vertex.a
            )
        }
        let vertices = new Float32Array(vbArray);
        let indices = new Uint16Array(this.triangle);
        return Laya.PrimitiveMesh["_createMesh"](vertexDeclaration, vertices, indices);
    }

    public addVertex(x: number, y: number, z: number, nx: number, ny: number, nz: number, u: number, v: number, r: number, g: number, b: number, a: number): void {
        let vertex: VertexObject = new VertexObject();
        vertex.x = x;
        vertex.y = y;
        vertex.z = z;

        vertex.nx = nx;
        vertex.ny = ny;
        vertex.nz = nz;

        vertex.u = u;
        vertex.v = v;

        vertex.r = r;
        vertex.g = g;
        vertex.b = b;
        vertex.a = a;

        this.vertexs.push(vertex);

    }

    public combineMesh(list: MeshData[]): MeshData {
        for (let i = 0; i < list.length; i++) {
            let data: MeshData = list[i];
            let begin: number = this.vertexs.length;
            for (let j: number = 0; j < data.vertexs.length; j++) {
                this.vertexs.push(data.vertexs[j]);
            }
            for (let j: number = 0; j < data.triangle.length; j++) {
                this.triangle.push(data.triangle[j]+begin);
            }
        }
        return this;
    }
}
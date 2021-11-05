import MeshData from "./MeshData";

export default class HollowCylinderMesh {
    public static create(minRadius: number = 0.5, maxRadius: number = 1, slices: number = 32, height: number = 2): MeshData {
        let sliceAngle = (Math.PI * 2.0) / slices;
        let curAngle = 0;
        let halfHeight = height / 2;

        // 上圆面
        let upMesh = new MeshData();
        for (let tv = 0; tv < slices; tv++) {
            curAngle = tv * sliceAngle;
            upMesh.addVertex(
                Math.cos(curAngle) * minRadius, halfHeight, Math.sin(curAngle) * minRadius,
                0, 1, 0,
                Math.cos(curAngle) * 0.25 + 0.5, Math.sin(curAngle) * 0.25 + 0.5,
                1, 0, 0, 1
            )
        }

        for (let tv = 0; tv < slices; tv++) {
            curAngle = tv * sliceAngle;
            upMesh.addVertex(
                Math.cos(curAngle) * maxRadius, halfHeight, Math.sin(curAngle) * maxRadius,
                0, 1, 0,
                Math.cos(curAngle) * 0.5 + 0.5, Math.sin(curAngle) * 0.5 + 0.5,
                1, 0, 0, 1
            )
        }
        this.setTriangle(upMesh, slices);

        // 下圆面
        let downMesh = new MeshData();
        for (let tv = 0; tv < upMesh.vertexs.length; tv++) {
            let vertex = upMesh.vertexs[tv];
            downMesh.addVertex(
                vertex.x, -halfHeight, vertex.z,
                0, -1, 0,
                vertex.u, vertex.v,
                0, 0, 1, 1
            )
        }
        this.reSetTriangle(downMesh, slices);

        // 外表面
        let outMesh: MeshData = new MeshData();
        for (let tv = slices; tv < slices * 2; tv++) {
            let vertex = upMesh.vertexs[tv];
            outMesh.addVertex(
                vertex.x, vertex.y, vertex.z,
                vertex.x, 0, vertex.z,
                (tv - slices) / slices, 0,
                1, 0, 0, 1
            );
        }

        for (let tv = slices; tv < slices * 2; tv++) {
            let vertex = downMesh.vertexs[tv];
            outMesh.addVertex(
                vertex.x, vertex.y, vertex.z,
                vertex.x, 0, vertex.z,
                (tv - slices) / slices, 1,
                0, 0, 1, 1
            );
        }
        this.setTriangle(outMesh, slices);

        // 内表面
        let inMesh = new MeshData();
        for (let tv = 0; tv < slices; tv++) {
            let vertex = upMesh.vertexs[tv];
            inMesh.addVertex(
                vertex.x, vertex.y, vertex.z,
                -vertex.x, 0, -vertex.z,
                tv / slices, 0,
                1, 0, 0, 1
            );
        }

        for (let tv = 0; tv < slices; tv++) {
            let vertex = downMesh.vertexs[tv];
            inMesh.addVertex(
                vertex.x, vertex.y, vertex.z,
                -vertex.x, 0, -vertex.z,
                tv / slices, 1,
                0, 1, 0, 1
            );
        }
        this.reSetTriangle(inMesh, slices);

        return upMesh.combineMesh([downMesh, outMesh, inMesh]);

    }


    private static setTriangle(mesh: MeshData, slices: number): void {
        for (let tv = 0; tv < slices; tv++) {
            let nn = tv + 1 >= slices ? 0 : tv + 1; // 内环的下一个顶点
            let wd = tv + slices;
            let wn = wd + 1 >= slices * 2 ? slices : wd + 1;
            mesh.triangle.push(tv, wd, wn);
            mesh.triangle.push(wn, nn, tv);
        }
    }

    private static reSetTriangle(mesh: MeshData, slices: number): void {
        for (let tv = 0; tv < slices; tv++) {
            let nn = tv + 1 >= slices ? 0 : tv + 1; // 内环的下一个顶点
            let wd = tv + slices;
            let wn = wd + 1 >= slices * 2 ? slices : wd + 1;
            mesh.triangle.push(tv, nn, wn);
            mesh.triangle.push(wn, wd, tv);
        }
    }
}
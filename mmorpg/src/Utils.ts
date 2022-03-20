export const angleToRandin = (angle: number): number => {
    return angle * Math.PI / 180;
}

export const randinToAngle = (randin: number): number => {
    return randin * 180 / Math.PI;
}

/**
         * 转换2D屏幕坐标系统到3D投影坐标系统（仅限于正交投影）
         * @param	source 源坐标。
         * @param	out 输出坐标。
         */
export const screenCoordTo3DCoord = (source: Laya.Vector3, out: Laya.Vector3,screenWidth:number,screenHeight:number): void=> {
    out.x = ((-screenWidth >> 1) + source.x) * window.devicePixelRatio;
    out.y = ((screenHeight >> 1) - source.y) * window.devicePixelRatio;
    out.z = source.z;
}
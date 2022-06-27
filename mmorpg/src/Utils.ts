export const angleToRandin = (angle: number): number => {
    return angle * Math.PI / 180;
}

export const randinToAngle = (randin: number): number => {
    return randin * 180 / Math.PI;
}

export const isNullOrEmpty = (str: string): boolean => {
    if (str != null) {
        str = str.trim();
        if(str.length>0){
            return false;
        }
    }
    return true;
}

export const splitStrToIntArr = (str:string,splitStr = "+"):Array<number> =>{
    let arr: Array<string> = str.split(splitStr);
    return arr.map((item)=>{
        return +item;
    })
}
#include "Lighting.glsl";

#ifdef GPU_INSTANCE
    attribute mat4 a_MvpMatrix;
#else
    uniform mat4 u_MvpMatrix;
#endif

attribute vec4 a_Position;
varying vec4 v_Color;
uniform float u_Time;
void main(){
    vec4 color1 = vec4(1.0,0.0,0.0,1.0); // red
    vec4 color2 = vec4(0.0,1.0,0.0,1.0); // green

    float ratio = 0.0;

    // if(a_Position.y>=0.0){
    //     ratio = a_Position.y/2.0 + 0.5;
    // }else{
    //     ratio = 0.5-(a_Position.y/-1.0)/2.0;
    // }

    float tSin = sin(u_Time); // -1~1

    float dis = a_Position.y - tSin; // -2~2
    ratio = dis / 4.0 + 0.5; // 0~1

    v_Color = mix(color1,color2,ratio);
    

    #ifdef GPU_INSTANCE
        gl_Position = a_MvpMatrix * a_Position;
    #else
        gl_Position = u_MvpMatrix * a_Position;
    #endif

    gl_Position = remapGLPositionZ(gl_Position);
}

// #include 'Lighting.glsl';

#ifdef GPU_INSTANCE
    attribute mat4 a_MvpMatrix;
    attribute mat3 a_WorldMat;
#else
    uniform mat4 u_MvpMatrix;
    uniform mat4 u_WorldMatrix;
#endif

attribute vec4 a_Position;
varying vec4 v_Color;
varying vec4 v_Position;
void main() {
  v_Color = a_Position;
  v_Position = a_Position;

  #ifdef GPU_INSTANCE
    gl_Position = a_MvpMatrix * a_Position;
  #else
    gl_Position = u_MvpMatrix * a_Position;
  #endif

  

  // gl_Position = remapGLPositionZ(gl_Position);
}
#include "Lighting.glsl";

#ifdef GPU_INSTANCE
attribute mat4 a_MvpMatrix;
#else
uniform mat4 u_MvpMatrix;
#endif

attribute vec4 a_Position;
attribute vec3 a_Normal;
uniform float u_Time;

varying vec4 v_Color;

void main() {
  v_Color = vec4(1.0);
  vec4 position = a_Position;

  float speed = 0.5;

  // float scale = mod(u_Time * speed,3.0)/3.0;

  float scale = (sin(u_Time * speed)+1.0)/2.0;

  v_Color *= scale;

  position.xyz = position.xyz + a_Normal * scale ;




  #ifdef GPU_INSTANCE
    gl_Position = a_MvpMatrix * position;
  #else
    gl_Position = u_MvpMatrix * position;
  #endif
    gl_Position = remapGLPositionZ(gl_Position);
}

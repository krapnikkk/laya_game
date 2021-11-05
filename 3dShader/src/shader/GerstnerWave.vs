#include "Lighting.glsl";

#ifdef GPU_INSTANCE
attribute mat4 a_MvpMatrix;
#else
uniform mat4 u_MvpMatrix;
#endif

attribute vec4 a_Position;
uniform float u_Time;
uniform float u_Width;
uniform float u_Speed;

varying vec4 v_Color;
void main() {
  v_Color = vec4(1.0);
  vec4 position = a_Position;

  float PI = 3.141592653589;

  vec2 dir = vec2(1.0, 0.06);

  float width = PI / 2.0;
  float speed = 0.5;
  float Q = 0.5;
  float A = 1.0;

  float sx = Q * A * dir.x * cos(dot(dir,vec2(position.x,position.z)*width + u_Time * speed));

  float sy = A * sin(dot(dir,vec2(position.x,position.z)*width+u_Time * speed));

  float sz = Q * A * dir.y * cos(dot(dir,vec2(position.x,position.z)*width+u_Time*speed));

  position.x += sx;
  position.y += sy;
  position.z += sz;

  v_Color *= (sy + 1.0)/2.0;


  #ifdef GPU_INSTANCE
    gl_Position = a_MvpMatrix * position;
  #else
    gl_Position = u_MvpMatrix * position;
  #endif
    gl_Position = remapGLPositionZ(gl_Position);
}

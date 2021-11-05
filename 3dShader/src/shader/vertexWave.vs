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

  float sy = 0.0;

  float index = 1.0;

  float ti = 0.06;
  float a = 0.0;
  const int count = 4;
  for (int i = 0; i < 4; ++i) {
    index += 0.5;
    ti += 0.0005;
    if (mod(index, 2.0) == 0.0) {
      dir = vec2(1.0, ti);
    } else {
      dir = vec2(-1.0, -ti);
    }
    
    a = sin(dot(dir, vec2(position.x, position.z)) * u_Width +
                  u_Time * u_Speed);

    sy += a;
  }
  sy = sin(sy);

  position.y = sy;

  a = (a + 1.0) / 2.0; // -1~1 ->0~1
  v_Color *= a;

#ifdef GPU_INSTANCE
  gl_Position = a_MvpMatrix * position;
#else
  gl_Position = u_MvpMatrix * position;
#endif

  gl_Position = remapGLPositionZ(gl_Position);
}

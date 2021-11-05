#include "Lighting.glsl";

#ifdef GPU_INSTANCE
attribute mat4 a_MvpMatrix;
#else
uniform mat4 u_MvpMatrix;
#endif

attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec2 a_TexCoord0;

uniform vec4 u_TilingOffset;

varying vec4 v_Color;
varying vec2 v_TexCoord0;

void main() {
  v_Color = a_Color;
  // v_TexCoord0 = a_TexCoord0;
  v_TexCoord0 = a_TexCoord0 * u_TilingOffset.xy + u_TilingOffset.zw;

#ifdef GPU_INSTANCE
  gl_Position = a_MvpMatrix * a_Position;
#else
  gl_Position = u_MvpMatrix * a_Position;
#endif

  gl_Position = remapGLPositionZ(gl_Position);
}

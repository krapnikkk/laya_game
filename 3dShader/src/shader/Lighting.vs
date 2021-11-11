#include "Lighting.glsl";

#ifdef GPU_INSTANCE
attribute mat4 a_MvpMatrix;
attribute mat4 a_WorldMat;
#else
uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;
#endif

attribute vec4 a_Position;
attribute vec3 a_Normal;

attribute vec2 a_TexCoord0;

varying vec2 v_TexCoord0;

varying vec3 v_Normal; 

void main() {
  mat3 _world2Object;

  v_TexCoord0 = a_TexCoord0;

#ifdef GPU_INSTANCE
  gl_Position = a_MvpMatrix * a_Position;
  _world2Object = INVERSE_MAT(mat3(a_WorldMat));
#else
  gl_Position = u_MvpMatrix * a_Position;
  _world2Object = INVERSE_MAT(mat3(u_WorldMat));
#endif

  v_Normal = normalize(a_Normal * _world2Object);

  gl_Position = remapGLPositionZ(gl_Position);
}

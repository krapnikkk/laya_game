#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#include "Lighting.glsl";

uniform vec4 u_AlbedoColor;

uniform int u_DirationLightCount;

uniform sampler2D u_LightBuffer;

varying vec2 v_TexCoord0;
varying vec3 v_Normal;

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
#endif


void main() {
  vec4 mainColor = u_AlbedoColor;

  #ifdef ALBEDOTEXTURE
    vec4 color = texture2D(u_AlbedoTexture, v_TexCoord0);
    mainColor *= color;
  #endif

  vec3 diffuse = vec3(0.0);

  DirectionLight directionLight;
  float ln;

  for(int i = 0;i<20;i++){
    if(i>=u_DirationLightCount){
        break;
    }

    directionLight = getDirectionLight(u_LightBuffer,i);
    
    ln = dot(v_Normal,directionLight.direction*-1.0);
    ln = max(ln,0.0);

    diffuse += directionLight.color * ln;
    
  }

  mainColor = vec4(mainColor.rgb * diffuse,mainColor.a);

  gl_FragColor = mainColor;
}
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#include "Lighting.glsl";

uniform vec4 u_AlbedoColor;
uniform vec4 u_AmbientColor; // 环境光

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

  for(int i = 0;i<20;i++){
    if(i>=u_DirationLightCount){
        break;
    }

    DirectionLight directionLight = getDirectionLight(u_LightBuffer,i);
    
    float ln = dot(v_Normal,directionLight.direction*-1.0);
    ln = max(ln,0.0); // 兰伯特模型
    // ln = ln * 0.5 + 0.5; // -1~1 -> 0~1 半兰伯特

    diffuse += directionLight.color * ln;
    
  }

  mainColor = vec4(mainColor.rgb * (u_AmbientColor.rgb + diffuse),mainColor.a);

  gl_FragColor = mainColor;
}
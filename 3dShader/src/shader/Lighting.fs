#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#include "Lighting.glsl";

uniform vec4 u_AlbedoColor;
uniform vec4 u_AmbientColor; // 环境光

uniform int u_DirationLightCount;
uniform vec3 u_CameraPos;
uniform float u_Shininess;
uniform vec4 u_SpecularColor;

uniform sampler2D u_LightBuffer;

varying vec2 v_TexCoord0;
varying vec3 v_Normal;
varying vec4 v_Position;

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
#endif


void main() {
  vec4 mainColor = u_AlbedoColor;
  vec3 V = normalize(u_CameraPos - v_Position.xyz);

  #ifdef ALBEDOTEXTURE
    vec4 color = texture2D(u_AlbedoTexture, v_TexCoord0);
    mainColor *= color;
  #endif

  vec3 diffuse = vec3(0.0);
  vec3 specular = vec3(0.0);

  for(int i = 0;i<20;i++){
    if(i>=u_DirationLightCount){
        break;
    }

    DirectionLight directionLight = getDirectionLight(u_LightBuffer,i);
    
    float ln = dot(v_Normal,directionLight.direction*-1.0);
    ln = max(ln,0.0); // 兰伯特模型
    // ln = ln * 0.5 + 0.5; // -1~1 -> 0~1 半兰伯特
    // 漫反射
    diffuse += directionLight.color * ln;

    //高光
    // vec3 L = normalize(directionLight.direction*-1.0);
    // // vec3 R = 2.0 * dot(v_Normal,L)*v_Normal - L;
    // vec3 R = reflect(directionLight.direction,v_Normal); // 内置函数计算反射向量
    // float nR = max(dot(R,V),0.0);
    // specular += u_SpecularColor.rgb * directionLight.color * pow(nR,u_Shininess * 128.0);

    // 半角高光反射 BlinPhong
    vec3 H = normalize(V+directionLight.direction*-1.0);
    float nR = max(0.0,dot(H,v_Normal));
    specular += u_SpecularColor.rgb * directionLight.color * pow(nR,u_Shininess * 128.0);
    
  }

  mainColor = vec4(mainColor.rgb * (u_AmbientColor.rgb + diffuse),mainColor.a);
  mainColor.rgb += specular;

  gl_FragColor = mainColor;
}
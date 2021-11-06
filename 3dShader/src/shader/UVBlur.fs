#ifdef GL_FRAGMENT_PRECISION_HIGHP
precision highp float;
#else
precision mediump float;
#endif

uniform vec4 u_AlbedoColor;
uniform float u_BlurWidth;
uniform float u_Speed;
uniform float u_Time;

varying vec4 v_Color;
varying vec2 v_TexCoord0;

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
#endif
void main() {
  vec4 color = u_AlbedoColor;

    #ifdef ALBEDOTEXTURE
      // color *= texture2D(u_AlbedoTexture,v_TexCoord0);

      // vec2 uv = v_TexCoord0;

      // uv.x = clamp(v_TexCoord0.x + u_BlurWidth,0.0,1.0);
      // // 二次采样
      // color += texture2D(u_AlbedoTexture,uv);

      // uv.x = clamp(v_TexCoord0.x - u_BlurWidth,0.0,1.0);
      // color += texture2D(u_AlbedoTexture,uv);

      // uv.x = v_TexCoord0.x;

      // uv.y = clamp(v_TexCoord0.y + u_BlurWidth,0.0,1.0);
      // color += texture2D(u_AlbedoTexture,uv);

      // uv.y = clamp(v_TexCoord0.y - u_BlurWidth,0.0,1.0);
      // color += texture2D(u_AlbedoTexture,uv);

      // color /= 5.0;// 五次纹理采样

      // 循环采样
      color = vec4(0.0);
      float f = 0.0;
      vec2 op = vec2(0.0);
      vec2 textCoord = vec2(0.0);
      float tot = 0.0;

      for(int i = -5;i<5;i++){
          for(int j = -5;j<5;j++){
              vec2 vp = vec2(float(i),float(j));
              float dis = distance(vp,op); // 0～1
              f = 1.1 - dis / 8.0; // 最少1.0 最多1.1
              tot += f;

              textCoord.x = v_TexCoord0.x + u_BlurWidth * float(j);
              textCoord.y = v_TexCoord0.y + u_BlurWidth * float(i);

              color += texture2D(u_AlbedoTexture,textCoord) * f;
          }
      }
      color /= tot;
    #endif
  gl_FragColor = color;
}
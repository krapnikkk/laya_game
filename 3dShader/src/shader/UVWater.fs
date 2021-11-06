#ifdef GL_FRAGMENT_PRECISION_HIGHP
precision highp float;
#else
precision mediump float;
#endif

uniform vec4 u_AlbedoColor;
uniform float u_Width;
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
        float PI = 3.1411592653589;

        vec2 textCoord = v_TexCoord0;

      // 横向 和 纵向
        // float sinx = sin(textCoord.x * PI * u_Width + u_Time * u_Speed) * 0.01;
        // float siny = cos(textCoord.y * PI * u_Width + u_Time * u_Speed) * 0.01;

        vec2 op = vec2(0.5,0.5);
        // 由外到内
        // float len = distance(textCoord,op);

        // 由内到外
        float len = distance(textCoord,op) * -1.0;

        float sinx = sin(len * PI * u_Width + u_Time * u_Speed) * 0.01;
        float siny = sinx;

        textCoord.x += sinx;
        textCoord.y += siny;

        color = texture2D(u_AlbedoTexture,textCoord);

        sinx = (sinx * 100.0 / 2.0 + 0.5)/ 2.0 + 1.0; // -1~1 -> -0.5~0.5 -> 0~1 -> 0~0.5 -> 1~1.5
        siny = (siny * 100.0 / 2.0 + 0.5)/ 2.0 + 1.0; // -1~1 -> -0.5~0.5 -> 0~1 -> 0~0.5 -> 1~1.5

        color *= (sinx + siny) /2.0; // 2~3
    #endif
  gl_FragColor = color;
}
#ifdef GL_FRAGMENT_PRECISION_HIGHP
precision highp float;
#else
precision mediump float;
#endif

uniform vec4 u_AlbedoColor;
uniform vec2 u_WH;
uniform float u_Time;

varying vec4 v_Color;
varying vec2 v_TexCoord0;

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
#endif
void main() {
  vec4 color = u_AlbedoColor;

    #ifdef ALBEDOTEXTURE
        float index = 4.0;
        index = floor(u_Time * 10.0);

        float uSize = 1.0/u_WH.x;
        float vSize = 1.0/u_WH.x;

        float uCount = mod(index,u_WH.x);
        float vCount = floor(index / u_WH.y);

        vec2 texCoord = vec2(0.0);
        texCoord.x = v_TexCoord0.x / u_WH.x + uCount * uSize;
        texCoord.y = v_TexCoord0.y / u_WH.y + uCount * vSize;


        color = texture2D(u_AlbedoTexture,texCoord);
    #endif
  gl_FragColor = color;
}
#ifdef GL_FRAGMENT_PRECISION_HIGHP
precision highp float;
#else
precision mediump float;
#endif

uniform vec4 u_AlbedoColor;
uniform float u_BlurWidth;
uniform float u_MosaicSize;
uniform vec2 u_TexSize;

varying vec4 v_Color;
varying vec2 v_TexCoord0;

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
#endif
void main() {
  vec4 color = u_AlbedoColor;
  vec2 textCoord = v_TexCoord0;

#ifdef ALBEDOTEXTURE
  // 正方形
  // vec2 uv = v_TexCoord0 * u_TexSize;
  // uv = floor(uv/u_MosaicSize)*u_MosaicSize;// 当前格子的序号

  // textCoord = uv / u_TexSize ; // 0~1

  // color *= texture2D(u_AlbedoTexture,textCoord);

  // 六边形效果
  float len = u_MosaicSize / u_TexSize.x;
  float th = 1.73;
  float tw = 1.0;
  float x = v_TexCoord0.x;
  float y = v_TexCoord0.y;

  float wx = floor(x / tw / len);
  float wy = floor(y / th / len);

  vec2 v1, v2 ;

  if (mod(wx, 2.0) == 0.0) { // 偶数
    if (mod(wy, 2.0) == 0.0) {
      v1 = vec2(wx * tw * len, wy * th * len);
      v2 = vec2((wx + 1.0) * tw * len, (wy + 1.0) * th * len);
    } else {
      v1 = vec2(wx * tw * len, (wy + 1.0) * th * len);
      v2 = vec2((wx + 1.0) * tw * len, wy * th * len);
    }
  } else {
    if (mod(wy, 2.0) == 0.0) {
      v1 = vec2(wx * tw * len, (wy + 1.0) * th * len);
      v2 = vec2((wx + 1.0) * tw * len, wy * th * len);
    } else {
      v1 = vec2(wx * tw * len, wy * th * len);
      v2 = vec2((wx + 1.0) * tw * len, (wy + 1.0) * th * len);
    }
  }

  float s1 = distance(v1,v_TexCoord0);
  float s2 = distance(v2,v_TexCoord0);

  textCoord = s1 < s2 ? v1 :v2;

  color *= texture2D(u_AlbedoTexture, textCoord);
#endif
  gl_FragColor = color;
}
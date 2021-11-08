#ifdef GL_FRAGMENT_PRECISION_HIGHP
precision highp float;
#else
precision mediump float;
#endif

uniform vec4 u_AlbedoColor;
varying vec2 v_TexCoord0;
varying float v_Addy;

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
#endif

#ifdef SECONDTEXTURE
uniform sampler2D u_SecondTexture;
#endif
void main() {
  vec4 color = u_AlbedoColor;

#ifdef ALBEDOTEXTURE
  color *= texture2D(u_AlbedoTexture, v_TexCoord0);
#endif

#ifdef SECONDTEXTURE
  vec4 secondColor = texture2D(u_SecondTexture,v_TexCoord0);
  float addy = v_Addy/2.0;

  color = mix(color,secondColor,addy);
#endif 
  gl_FragColor = color;
}
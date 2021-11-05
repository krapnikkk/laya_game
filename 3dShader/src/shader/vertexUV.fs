#ifdef GL_FRAGMENT_PRECISION_HIGHP
    precision highp float;
#else
    precision mediump float;
#endif
varying vec4 v_Color;
varying vec2 v_TexCoord0;

uniform sampler2D u_AlbedoTexture;
void main()
{
    vec4 color = texture2D(u_AlbedoTexture,v_TexCoord0);

    color *= v_Color;
    // gl_FragColor = vec4(1.0);
    gl_FragColor = color;
}
#ifdef GL_FRAGMENT_PRECISION_HIGHP
    precision highp float;
#else
    precision mediump float;
#endif
varying vec4 v_Color;

void main()
{
   

    // gl_FragColor = vec4(1.0);
    gl_FragColor = v_Color;
}
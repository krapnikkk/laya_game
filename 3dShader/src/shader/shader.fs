#ifdef GL_FRAGMENT_PRECISION_HIGHP
  precision highp float;
#else
  precision mediump float;
#endif

varying vec4 v_Color;
varying vec4 v_Position;

#ifdef ALBEDOCOLOR
  uniform vec4 u_AlbedoColor;
#endif
void main() {
  // vec3 color = vec3(0.0);

  // 颜色叠加 变亮
  //   float circle1 = 0.6;

  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(0.0, 0.1)) <= 0.2) {
  //     circle1 = 1.0;
  //   }

  //   float circle2 = 0.6;

  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(0.1, -0.1)) <= 0.2) {
  //     circle2 = 1.0;
  //   }

  //   float circle3 = 0.6;

  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(-0.1, -0.1)) <= 0.2)
  //   {
  //     circle3 = 1.0;
  //   }

  //   color = vec3(1.0, 0.0, 0.0) * circle1 + vec3(0.0, 1.0, 0.0) * circle2
  //   +vec3(0.0, 0.0, 1.0) * circle3 ;

  // 颜色相乘 变暗
  //   vec3 color1 = vec3(1.0);
  //   vec3 color2 = vec3(1.0);
  //   vec3 color3 = vec3(1.0);

  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(0.0, 0.1)) <= 0.2) {
  //     color1 = vec3(1.0, 0.5, 0.5);
  //   }
  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(-0.1, -0.1)) <= 0.2)
  //   {
  //     color2 = vec3(0.5, 1.0, 0.5);
  //   }
  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(0.1, -0.1)) <= 0.2) {
  //     color3 = vec3(0.5, 0.5, 1.0);
  //   }
  //   color = color1 * color2 * color3;

  // 颜色反相 1-颜色
  //   vec3 color1 = vec3(1.0);
  //   vec3 color2 = vec3(1.0);
  //   vec3 color3 = vec3(1.0);

  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(0.0, 0.1)) <= 0.2) {
  //     color1 = vec3(1.0, 0.5, 0.5);
  //   }
  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(-0.1, -0.1)) <= 0.2)
  //   {
  //     color2 = vec3(0.5, 1.0, 0.5);
  //   }
  //   if (distance(vec2(v_Position.x, v_Position.y), vec2(0.1, -0.1)) <= 0.2) {
  //     color3 = vec3(0.5, 0.5, 1.0);
  //   }
  //   color = color1 * color2 * color3;

  //   color = vec3(1.0) - color;

  // 颜色混合 x*(1-a)+y*a
  //   vec3 color1 = vec3(1.0, 0.0, 0.0);
  //   vec3 color2 = vec3(0.0, 1.0, 0.0);

  //   float a = 0.0;

  //   a = v_Position.x + 0.6;

  //   //   color = color1 * (1.0 - a) + color2 * a;
  //   color = mix(color1, color2, a);

  // gl_FragColor = vec4(color, 1.0);

  vec4 color = vec4(1.0);
  #ifdef ALBEDOCOLOR
    color = u_AlbedoColor;
  #endif

  gl_FragColor = color;
}
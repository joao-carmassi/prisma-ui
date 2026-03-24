'use client';

import { useRef, useEffect } from 'react';

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    float f = 1.0;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p * f);
      a *= 0.5;
      f *= 2.07;
    }
    return v;
  }

  vec3 palette(float t) {
    vec3 a = vec3(0.42, 0.18, 0.78);
    vec3 b = vec3(0.28, 0.25, 0.52);
    vec3 c = vec3(1.00, 0.90, 1.00);
    vec3 d = vec3(0.00, 0.10, 0.45);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

    float t = uTime * 0.12;

    /* --- chromatic aberration offsets (channel-split blobs) --- */
    float ab = 0.018;

    float nr = fbm(uv * 1.7 + vec2(t * 0.52, t * 0.31))
             + fbm(uv * 0.8 + vec2(t * 0.21, t * 0.43));

    float ng = fbm((uv + ab) * 1.7 + vec2(t * 0.52 + 0.12, t * 0.31 + 0.07))
             + fbm((uv + ab) * 0.8 + vec2(t * 0.21 + 0.09, t * 0.43 + 0.05));

    float nb = fbm((uv - ab) * 1.7 + vec2(t * 0.52 - 0.11, t * 0.31 - 0.06))
             + fbm((uv - ab) * 0.8 + vec2(t * 0.21 - 0.08, t * 0.43 - 0.04));

    float bR = smoothstep(0.05, 0.65, nr * 0.5 + 0.5);
    float bG = smoothstep(0.05, 0.65, ng * 0.5 + 0.5);
    float bB = smoothstep(0.05, 0.65, nb * 0.5 + 0.5);

    vec3 cR = palette(nr * 0.5 + t * 0.09) * bR;
    vec3 cG = palette(ng * 0.5 + t * 0.09 + 0.33) * bG;
    vec3 cB = palette(nb * 0.5 + t * 0.09 + 0.66) * bB;

    /* channel-split composite */
    vec3 color = vec3(cR.r, cG.g, cB.b);

    /* edge vignette */
    float vig = smoothstep(1.6, 0.25, length(uv));
    color *= vig;

    /* blend into very dark base */
    color = mix(vec3(0.015, 0.012, 0.030), color * 0.75, 0.88);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function ShaderHero(): React.ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const compileShader = (type: number, src: string): WebGLShader => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes = gl.getUniformLocation(prog, 'uResolution');

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    startRef.current = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startRef.current) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 h-full w-full'
      aria-hidden='true'
    />
  );
}

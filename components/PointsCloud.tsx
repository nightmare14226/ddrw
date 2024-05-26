import React, { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { url } from "inspector";
import { Vector3 } from "three";
import { Color } from "three";
import { MathUtils } from "three";
import { lerp } from "three/src/math/MathUtils.js";
const { randFloat: rnd, randInt, randFloatSpread: rndFS } = MathUtils;
const vertexShader = `
  uniform float uTime;
  attribute vec3 color;
  attribute float size;
  attribute float velocity;
  varying vec4 vColor;
  void main(){
    vColor = vec4(color, 1.0);
    vec3 p = vec3(position);
    p.z = -150. + mod(position.z + uTime, 300.);
    vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
    gl_PointSize = size * (-30.0 / mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec4 vColor;
  void main() {
    gl_FragColor = vColor * texture2D(uTexture, gl_PointCoord);
  }
`;

const PointsCloud: React.FC = () => {
  const ref = useRef<THREE.Points>();
  useFrame((state, delta) => {
    if (ref.current) {
      const material = ref.current.material as any; // cast to any to access custom material properties
      material.uniforms.uTime.value += delta * 5;
      const da = 0.05;
      const tiltX = lerp(ref.current.rotation.x, 0.3 * da, 0.02);
      const tiltY = lerp(ref.current.rotation.y, -0.3 * da, 0.02);
      ref.current.rotation.set(tiltX, tiltY, 0);
    }
  });
  const texture = useLoader(
    THREE.TextureLoader,
    "https://assets.codepen.io/33787/sprite.png"
  );
  const palette = ["#a70267", "#f10c49", "#fb6b41", "#f6d86b", "#339194"];
  const POINTS_COUNT = 50000;
  const positions = new Float32Array(POINTS_COUNT * 3);
  const colors = new Float32Array(POINTS_COUNT * 3);
  const sizes = new Float32Array(POINTS_COUNT);
  const v3 = new Vector3(),
    color = new Color();
  for (let i = 0; i < POINTS_COUNT; i++) {
    v3.set(rndFS(200), rndFS(200), rndFS(300));
    v3.toArray(positions, i * 3);
    color.set(palette[Math.floor(rnd(0, palette.length))]);
    color.toArray(colors, i * 3);
    sizes[i] = rnd(5, 20);
  }

  const uniforms = { uTime: { value: 0.5 }, uTexture: { value: texture } };
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={POINTS_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={POINTS_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={POINTS_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={2}
        depthTest={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      ></shaderMaterial>
    </points>
  );
};

export default PointsCloud;

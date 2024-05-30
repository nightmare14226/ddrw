"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { url } from "inspector";
import { Vector3 } from "three";
import { Color } from "three";
import { MathUtils } from "three";
import { useModeStore } from "./StateProvider";
import useStore from "./StateProvider";
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
const PointsCloud = () => {
  const ref = useRef<THREE.Points>();
  const materialRef = useRef<THREE.ShaderMaterial>();
  const moveOneStep = useModeStore.use.moveOneStep();
  const timeCoef = useModeStore.use.timeCoef();
  useFrame((state, delta) => {
    if (ref.current) {
      materialRef.current.uniforms.uTime.value += delta * 5 * timeCoef;
      moveOneStep();
    }
  });
  const texture = useLoader(
    THREE.TextureLoader,
    "https://assets.codepen.io/33787/sprite.png"
  );
  const palette = [
    "#a70267",
    "#f10c49",
    "#fb6b41",
    "#f6d86b",
    "#339194",
    "#fe4365",
    "#fc9d9a",
    "#f9cdad",
    "#c8c8a9",
    "#83af9b",
    "#490a3d",
    "#bd1550",
    "#e97f02",
    "#f8ca00",
    "#8a9b0f",
    "#3fb8af",
    "#7fc7af",
    "#dad8a7",
    "#ff9e9d",
    "#ff3d7f",
    "#6b0103",
    "#a30006",
    "#c21a01",
    "#f03c02",
  ];
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
  /*useEffect(() => {
    
  });*/
  const uniforms = useMemo(
    () => ({ uTime: { value: 0.5 }, uTexture: { value: texture } }),
    []
  );
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
        ref={materialRef}
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

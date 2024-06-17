"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { url } from "inspector";
import { Vector3 } from "three";
import { Color } from "three";
import { MathUtils } from "three";
import { useModeStore } from "./StateProvider";
import { useState } from "react";
const { randFloat: rnd, randInt, randFloatSpread: rndFS } = MathUtils;
const vertexShader = `
  uniform float uTime;
  attribute vec3 color;
  attribute float size;
  attribute float velocity;
  varying vec4 vColor;
  float random(float seed) {
    return fract(sin(seed) * 43758.5453123);
  }
  void main(){
    vColor = vec4(color, 1.0);
    vec3 p = vec3(position);
    p.z = -150. + mod(position.z + uTime, 300.);
    if(p.z > 50.) {
      float rand = random(p.x * 12.9898 + p.y * 78.233 + uTime);
      p.x = floor(100. * (rand - 0.5));
      float rand1 = random(p.x * 8.3586 + p.y * 58.578 + uTime);
      p.y = floor(100. * (rand1 - 0.5));
    }
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
  const timeCoef = useModeStore.use.timeCoef();
  const targetTimeCoef = useModeStore.use.targetTimeCoef();
  const turboMode = useModeStore.use.turboMode();
  const initTurboMode = useModeStore.use.setTurboMode();
  const [tc, setTc] = useState(timeCoef);
  useFrame((state, delta) => {
    materialRef.current.uniforms.uTime.value += delta * 5 * tc;
    if (!turboMode) setTc(tc + (targetTimeCoef - tc) * 0.02);
    else setTc(tc + (targetTimeCoef - tc) * 0.2);
    if (turboMode && tc < 1.1 && targetTimeCoef == 1) initTurboMode();
  });
  const texture = useLoader(THREE.TextureLoader, "/assets/images/sprite.png");
  const palette = [
    "#a70267",
    "#f10c49",
    "#fb6b41",
    "#f6d86b",
    "#fe4365",
    "#fc9d9a",
    "#f9cdad",
    "#bd1550",
    "#e97f02",
    "#f8ca00",
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
  const positions = useMemo(() => {
    return new Float32Array(POINTS_COUNT * 3 + 10);
  }, []);
  const colors = useMemo(() => {
    return new Float32Array(POINTS_COUNT * 4 + 10);
  }, []);
  const sizes = useMemo(() => {
    return new Float32Array(POINTS_COUNT + 10);
  }, []);
  useEffect(() => {
    for (let i = 0; i < POINTS_COUNT; i++) {
      const v3 = new Vector3(),
        color = new Color();
      v3.set(rndFS(200), rndFS(200), rndFS(300));
      v3.toArray(positions, i * 3);
      color.set(palette[Math.floor(rnd(0, palette.length))]);
      color.toArray(colors, i * 3);
      sizes[i] = rnd(5, 20);
    }
  });
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
          itemSize={4}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={POINTS_COUNT}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        blending={1}
        depthTest={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      ></shaderMaterial>
    </points>
  );
};

export default PointsCloud;

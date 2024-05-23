"use client";

import React from "react";
import { NextPage } from "next";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Scene } from "three";
import { Color } from "three";
import { EffectComposer } from "@react-three/postprocessing";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { useRef } from "react";
import { useEffect } from "react";
const PointsCloud = dynamic(() => import("./PointsCloud.tsx"), { ssr: false });
const LightPoints: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  }, []);
  function onCreated({ gl, scene }) {
    gl.setClearColor(new Color("black"));
    scene.background = new Color("black");
  }
  return (
    <Canvas
      ref={canvasRef}
      camera={{
        aspect: canvasRef.current
          ? canvasRef.current.clientWidth / canvasRef.current.clientHeight
          : 1,
        fov: 50,
        near: 1,
        far: 30,
        up: [0, 0, 0],
        position: [0, 0, 5],
        zoom: 0.05,
      }}
      gl={{ alpha: false }}
      onCreated={onCreated}
    >
      <ambientLight intensity={0.5} />
      <PointsCloud />
    </Canvas>
  );
};
export default LightPoints;

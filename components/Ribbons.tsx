"use client";

import React, { createContext } from "react";
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
const RibbonDraw = dynamic(() => import("./RibbonDraw.tsx"), { ssr: false });
export const CanvasContext = createContext<HTMLCanvasElement | null>(null);

const Ribbons: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  }, []);
  function onCreated({ gl, scene }) {
    gl.setClearColor(new Color("#3f36b9"));
    scene.background = new Color("#3f36b9");
  }
  return (
    <Canvas
      ref={canvasRef}
      camera={{
        fov: 50,
        position: [0, 0, 5],
        zoom: 0.05,
      }}
      gl={{ alpha: false }}
      onCreated={onCreated}
    >
      <ambientLight intensity={0.5} />
      <RibbonDraw canvasRef={canvasRef} />
    </Canvas>
  );
};
export default Ribbons;

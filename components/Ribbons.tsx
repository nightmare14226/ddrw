"use client";

import React, { createContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Color } from "three";
import { useRef } from "react";
import { useEffect } from "react";
const RibbonDraw = dynamic(() => import("./RibbonDraw.tsx"), { ssr: false });
const Ribbons: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  function onCreated({ gl, scene }) {
    gl.setClearColor(new Color("transparent"));
    scene.background = new Color("transparent");
  }
  return (
    <Canvas
      ref={canvasRef}
      camera={{
        fov: 75,
        position: [0, 0, 1000],
        zoom: 1.5,
      }}
      gl={{ alpha: true, antialias: true }}
      onCreated={onCreated}
    >
      <ambientLight intensity={0.5} />
      <RibbonDraw canvasRef={canvasRef} />
    </Canvas>
  );
};
export default Ribbons;

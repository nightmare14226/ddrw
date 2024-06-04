"use client";

import React, { Suspense, useContext } from "react";
import { NextPage } from "next";
import { Canvas, useThree } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Color, Vector2 } from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomUnrealBloom from "./CustomUnrealBloom.tsx";
declare global {
  namespace JSX {
    interface IntrinsicElements {}
  }
}
const PointsCloud = dynamic(() => import("./PointsCloud.tsx"), { ssr: false });
const LightPoints: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomStrength = useState(0);
  const composerRef = useRef<any>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    //console.log(composerRef.current);
  }, []);
  function onCreated({ gl, scene, camera }) {
    gl.setClearColor(new Color("black"));
    scene.background = new Color("black");
    if (composerRef) {
    }
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
        far: 70,
        position: [0, 0, 0],
        zoom: 0.3,
      }}
      gl={{ alpha: true, antialias: true }}
      onCreated={onCreated}
      id="pointscanvas"
    >
      <ambientLight color={0xcccccc} />
      <pointLight color="#b307b5" position={[-2, -2, 2]} intensity={0.5} />
      <pointLight color="#8132aa" position={[-2, 2, 2]} intensity={0.5} />
      <pointLight color="#5737d0" position={[2, 2, 2]} intensity={0.5} />
      <pointLight color="#0d25bb" position={[2, -2, 2]} intensity={0.5} />
      <pointLight color="#ffffff" position={[0, 0, 5]} intensity={1} />
      <PointsCloud />
      <CustomUnrealBloom />
      {/* <EffectComposer ref={composerRef}>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.8} height={300} />
      </EffectComposer> */}
      {/* <Effects
        multisamping={8}
        renderIndex={1}
        disableGamma={true}
        disableRenderPass={true}
        disableRender={true}
      /> */}
    </Canvas>
  );
};
export default LightPoints;

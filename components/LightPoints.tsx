"use client";

import React, { useContext } from "react";
import { NextPage } from "next";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Effects, OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Renderer, Scene, Vector2 } from "three";
import { Color } from "three";
import {
  Bloom,
  EffectComposer,
  EffectComposerContext,
  SSAO,
} from "@react-three/postprocessing";
import { useRef } from "react";
import { useEffect } from "react";
import { ReactThreeFiber, extend } from "@react-three/fiber";
import { useState } from "react";
import { RenderPass, UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { SSAOPass } from "three/examples/jsm/Addons.js";
import { BlendFunction } from "postprocessing";
extend({ SSAOPass, RenderPass, UnrealBloomPass });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      sSAOPass: SSAOPass;
      unrealBloomPass: UnrealBloomPass;
    }
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
  }, []);
  function onCreated({ gl, scene, camera }) {
    gl.setClearColor(new Color("black"));
    scene.background = new Color("black");
    const renderPass = new RenderPass(scene, camera);
    if (composerRef) {
      console.log(composerRef.current);
      console.log(composerRef.current.getRenderer());
    }
  }
  function onResize() {}
  return (
    <Canvas
      ref={canvasRef}
      camera={{
        aspect: canvasRef.current
          ? canvasRef.current.clientWidth / canvasRef.current.clientHeight
          : 1,
        fov: 100,
        near: 1,
        far: 100,
        up: [0, 0, 10],
        position: [0, 0, 0],
        zoom: 0.7,
      }}
      gl={{ alpha: false }}
      onCreated={onCreated}
      onResize={onResize}
    >
      <pointLight color="light1Color" position={[-2, -2, 2]} intensity={0.5} />
      <pointLight color="light2Color" position={[-2, 2, 2]} intensity={0.5} />
      <pointLight color="light3Color" position={[2, 2, 2]} intensity={0.5} />
      <pointLight color="light4Color" position={[2, -2, 2]} intensity={0.5} />
      <PointsCloud />
      <EffectComposer ref={composerRef}>
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} height={300} />
        <renderPass />
      </EffectComposer>
      <Effects
        multisamping={8}
        renderIndex={1}
        disableGamma={false}
        disableRenderPass={false}
        disableRender={false}
      ></Effects>
    </Canvas>
  );
};
export default LightPoints;

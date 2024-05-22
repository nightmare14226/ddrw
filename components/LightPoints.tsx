"use client";

import React from "react";
import { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Scene } from "three";
import { Color } from "three";
import { EffectComposer } from "@react-three/postprocessing";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";
const PointsCloud = dynamic(() => import("./PointsCloud.tsx"), { ssr: false });
const LightPoints: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: false }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new Color("black"));
          scene.background = new Color("black");
        }}
      >
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <PointsCloud />
      </Canvas>
    </div>
  );
};
export default LightPoints;

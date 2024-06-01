"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Color } from "three";
import { useRef } from "react";
import { useMemo } from "react";
import RibbonDraw from "./RibbonDraw";
const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec4 vColor;
  void main() {
    gl_FragColor = vColor * texture2D(uTexture, gl_PointCoord);
  }
`;
const Ribbons: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0.5 } }), []);
  function onCreated({ gl, scene }) {
    gl.setClearColor(new Color("black"));
    scene.background = new Color("black");
  }
  return (
    <Canvas
      ref={canvasRef}
      camera={{
        fov: 75,
        position: [0, 0, 1000],
        zoom: 1.5,
      }}
      gl={{ alpha: true }}
      onCreated={onCreated}
      id="ribboncanvas"
    >
      <ambientLight intensity={0.5} />
      <RibbonDraw canvasRef={canvasRef} />
    </Canvas>
  );
};
export default Ribbons;

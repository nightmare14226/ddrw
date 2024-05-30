"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Color } from "three";
import { useRef } from "react";
import { useMemo } from "react";
const RibbonDraw = dynamic(() => import("./RibbonDraw.tsx"), { ssr: false });
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
    >
      <ambientLight intensity={0.5} />
      <RibbonDraw canvasRef={canvasRef} />
      <shaderMaterial
        blending={2}
        depthTest={false}
        vertexShader={vertexShader}
        uniforms={uniforms}
      ></shaderMaterial>
    </Canvas>
  );
};
export default Ribbons;

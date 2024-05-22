"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Mesh } from "three";

function MeshComponent() {
  const fileUrl = "/pcd/ea.glb";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function DDRW() {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <Canvas className="h-[100px] w-[100px] z-10">
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 110]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Color, Mesh, Points, PointsMaterial } from "three";

function MeshComponent() {
  const fileUrl = "/pcd/ea.glb";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });
  useEffect(() => {
    if (gltf && mesh.current) {
      gltf.scene.traverse((child) => {
        const pointsChild = child.children[0] as Points;
        if (pointsChild) {
          const pointsMaterial = pointsChild.material as PointsMaterial;
          if (pointsMaterial) pointsMaterial.color.set(new Color("#ffffff"));
        }
      });
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function DDRW() {
  return (
    <div className="w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] mr-0 ml-auto hidden sm:block">
      <Canvas className="z-10 w-full h-full" camera={{ manual: true }}>
        <PerspectiveCamera
          fov={50}
          position={[0, 0, 5]}
          zoom={1.6}
          manual
          makeDefault
        />
        <ambientLight />
        <pointLight position={[0, 0, 1]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}

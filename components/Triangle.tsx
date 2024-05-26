import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Material } from "three";
const Triangle = ({ vertices, col, alpha }) => {
  const ref = useRef<THREE.Mesh>(null);
  const f32array = useMemo(
    () =>
      Float32Array.from(
        new Array(vertices.length)
          .fill(0)
          .flatMap((item, index) => vertices[index].toArray())
      ),
    [vertices]
  );
  useFrame(() => {
    if (ref.current) {
      ref.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(f32array, 3)
      );
      (ref.current.material as THREE.MeshBasicMaterial).setValues({
        color: col,
        opacity: alpha,
        side: THREE.DoubleSide,
        wireframe: false,
        depthWrite: true,
        depthTest: true,
        transparent: true,
      });
    }
    //  ref.current.geometry.setFromPoints(
    //     [start, end].map((point) => new Vector3(...point))
    //   );
  });
  return (
    <mesh position={[0, 0, 0]} ref={ref}>
      <meshBasicMaterial
        isMaterial={true}
        color={col}
        opacity={100}
        transparent={true}
        wireframe={false}
        depthTest={false}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Triangle;

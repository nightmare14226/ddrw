import { extend, useFrame, useThree } from "@react-three/fiber";
import { MotionBlurPass } from "./blur/MotionBlurPass";
import { EffectComposer } from "three/examples/jsm/Addons.js";
import { RenderPass } from "three/examples/jsm/Addons.js";
import React, { useEffect, useRef } from "react";
import { Vector2 } from "three";
// Extend the JSX namespace to include UnrealBloomPass
declare global {
  namespace JSX {
    interface IntrinsicElements {
      motionBlurPass: any;
    }
  }
}

extend({ MotionBlurPass });

const CustomMotionBlur = ({
  bloomStrength = 2,
  bloomRadius = 0,
  bloomThreshold = 0,
}) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer>();

  useEffect(() => {
    const motionBlurPass = new MotionBlurPass(scene, camera, {
      enabled: true,
      samples: 7,
      expandGeometry: 0,
      interpolateGeometry: 1,
      renderCameraBlur: false,
      renderTargetScale: 1,
      smearIntensity: 0.5,
      jitter: 1,
      jitterStrategy: 2,
    });

    composer.current = new EffectComposer(gl);
    composer.current.addPass(motionBlurPass);

    gl.setSize(size.width, size.height);
    composer.current.setSize(size.width, size.height);
  }, [gl, scene, camera, size, bloomStrength, bloomRadius, bloomThreshold]);

  useFrame(() => {
    if (composer.current) composer.current.render();
  }, 1);

  return null;
};

export default CustomMotionBlur;

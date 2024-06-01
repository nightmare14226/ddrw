import { extend, useFrame, useThree } from "@react-three/fiber";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { EffectComposer } from "three/examples/jsm/Addons.js";
import { RenderPass } from "three/examples/jsm/Addons.js";
import { MotionBlurPass } from "./blur/MotionBlurPass";
import { ShaderPass } from "three/examples/jsm/Addons.js";
import React, { useEffect, useRef } from "react";
import { Vector2 } from "three";
import ZoomBlur from "./blur/ZoomBlur";
import { useMemo } from "react";
import { useModeStore } from "./StateProvider";
import { useState } from "react";
// Extend the JSX namespace to include UnrealBloomPass
declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: any;
      motionBlurPass: any;
    }
  }
}

extend({ UnrealBloomPass, MotionBlurPass });

const CustomUnrealBloom = ({
  bloomStrength = 2,
  bloomRadius = 0.6,
  bloomThreshold = 0,
  zoomStrength = 0,
}) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer>();
  const timeCoef = useModeStore.use.timeCoef();
  const targetTimeCoef = useModeStore.use.targetTimeCoef();
  const [tc, setTc] = useState(timeCoef);
  const zoomUniforms = useMemo(
    () => ({
      tDiffuse: null,
      center: { value: new Vector2(0.5, 0.5) },
      strength: { value: 0 },
    }),
    []
  );
  useEffect(() => {
    const renderPass = new RenderPass(scene, camera);
    const unrealBloomPass = new UnrealBloomPass(
      new Vector2(size.width, size.height),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    );
    const motionBlurPass = new MotionBlurPass(scene, camera, {
      samples: 8,
      expandGeometry: 0,
      interpolateGeometry: 0.5,
      smearIntensity: 2.8,
      blurTransparent: false,
      renderCameraBlur: false,
    });
    const zoomBlurPass = new ShaderPass({
      ...ZoomBlur,
      uniforms: zoomUniforms,
    });
    //zoomBlurPass.uniforms.strength = { value: 0.5 };
    composer.current = new EffectComposer(gl);
    composer.current.addPass(renderPass);
    composer.current.addPass(unrealBloomPass);
    composer.current.addPass(motionBlurPass);
    composer.current.addPass(zoomBlurPass);

    gl.setSize(size.width, size.height);
    composer.current.setSize(size.width, size.height);
  }, [gl, scene, camera, size, bloomStrength, bloomRadius, bloomThreshold]);

  useFrame(() => {
    if (composer.current.passes.at(3)) {
      //console.log((composer.current.passes.at(3) as ShaderPass).uniforms);
      if ((composer.current.passes.at(3) as ShaderPass).uniforms)
        (composer.current.passes.at(3) as ShaderPass).uniforms.strength = {
          value: tc * 0.004,
        };
    }
    setTc(tc + (targetTimeCoef - tc) * 0.02);
    if (composer.current) composer.current.render();
  }, 1);

  return null;
};

export default CustomUnrealBloom;

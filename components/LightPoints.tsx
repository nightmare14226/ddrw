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
import { useRef } from "react";
import { useEffect } from "react";
const PointsCloud = dynamic(() => import("./PointsCloud.tsx"), { ssr: false });
const LightPoints: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*_drawRibbonSectionfunction (section) {
    if (section) {
        if (section.phase >= 1 && section.alpha <= 0) {
            return true; // done
        }
        if (section.delay <= 0) {
            section.phase += 0.02;
            section.alpha = Math.sin(section.phase) * 1;
            section.alpha =
                section.alpha <= 0 ? 0 : section.alpha;
            section.alpha =
                section.alpha >= 1 ? 1 : section.alpha;

            if (this._options.animateSections) {
                var mod =
                    Math.sin(
                        1 + (section.phase * Math.PI) / 2
                    ) * 0.1;

                if (section.dir === "right") {
                    section.point1.add(mod, 0);
                    section.point2.add(mod, 0);
                    section.point3.add(mod, 0);
                } else {
                    section.point1.subtract(mod, 0);
                    section.point2.subtract(mod, 0);
                    section.point3.subtract(mod, 0);
                }
                section.point1.add(0, mod);
                section.point2.add(0, mod);
                section.point3.add(0, mod);
            }
        } else {
            section.delay -= 0.5;
        }

        var s = this._options.colorSaturation,
            l = this._options.colorBrightness,
            c =
                "hsla(" +
                section.color +
                ", " +
                s +
                ", " +
                l +
                ", " +
                section.alpha +
                " )";

        this._context.save();

        if (this._options.parallaxAmount !== 0) {
            this._context.translate(
                0,
                this._scroll * this._options.parallaxAmount
            );
        }
        this._context.beginPath();
        this._context.moveTo(
            section.point1.x,
            section.point1.y
        );
        this._context.lineTo(
            section.point2.x,
            section.point2.y
        );
        this._context.lineTo(
            section.point3.x,
            section.point3.y
        );
        this._context.fillStyle = c;
        this._context.fill();

        if (this._options.strokeSize > 0) {
            this._context.lineWidth = this._options.strokeSize;
            this._context.strokeStyle = c;
            this._context.lineCap = "round";
            this._context.stroke();
        }
        this._context.restore();
    }
    return false; // not done yet
}
  function _onDraw() {
        // cleanup on ribbons list to rtemoved finished ribbons
        for (var i = 0, t = this._ribbons.length; i < t; ++i) {
            if (!this._ribbons[i]) {
                this._ribbons.splice(i, 1);
            }
        }

        // draw new ribbons
        this._context.clearRect(0, 0, this._width, this._height);

        for (
            var a = 0;
            a < this._ribbons.length;
            ++a // single ribbon
        ) {
            var ribbon = this._ribbons[a],
                numSections = ribbon.length,
                numDone = 0;

            for (
                var b = 0;
                b < numSections;
                ++b // ribbon section
            ) {
                if (this._drawRibbonSection(ribbon[b])) {
                    numDone++; // section done
                }
            }
            if (numDone >= numSections) {
                // ribbon done
                this._ribbons[a] = null;
            }
        }
        // maintain optional number of ribbons on canvas
        if (this._ribbons.length < this._options.ribbonCount) {
            this.addRibbon();
        }
        requestAnimationFrame(this._onDraw);
    }*/
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    //const context = canvas.getContext("2d");
  }, []);
  return (
    <div className="w-full min-h-screen absolute inset-0 blur-sm">
      <Canvas
        ref={canvasRef}
        camera={{
          aspect: canvasRef.current
            ? canvasRef.current.clientWidth / canvasRef.current.clientHeight
            : 1,
          fov: 50,
          near: 1,
          far: 30,
          up: [0, 0, 0],
          position: [0, 0, 5],
          zoom: 0.05,
        }}
        gl={{ alpha: false }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new Color("black"));
          scene.background = new Color("black");
        }}
      >
        <ambientLight intensity={0.5} />
        <PointsCloud />
      </Canvas>
    </div>
  );
};
export default LightPoints;

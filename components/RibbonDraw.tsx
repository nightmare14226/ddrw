"use client";

import React, { MutableRefObject, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Point from "@/classes/Point";
//import { CanvasContext } from "./Ribbons";
import { DoubleSide, Line } from "three";
import { Vector3 } from "three";
import { ReactThreeFiber, extend } from "@react-three/fiber";
import Triangle from "./Triangle";
import { useModeStore } from "./StateProvider";
extend({ Line_: Line });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<Line, typeof Line>;
    }
  }
}

const random = (args: number[]) => {
  if (args.length === 1) {
    // only 1 argument
    if (Array.isArray(args[0])) {
      // extract index from array
      //@ts-ignore
      var index = Math.round(random([0, args[0].length - 1]));
      return args[0][index];
    }
    //@ts-ignore
    return random([0, args[0]]); // assume numeric
  } else if (args.length === 2) {
    // two arguments range
    return Math.random() * (args[1] - args[0]) + args[0];
  }
  return 0; // default
};
interface RibbonDrawProps {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
}

type RibbonEdgeProps = {
  start: Vector3;
  end: Vector3;
  keyn: number;
};

const RibbonEdge: React.FC<RibbonEdgeProps> = ({ start, end, keyn }) => {
  const ref = useRef<Line>(null!);
  useFrame(() => {
    if (ref.current) ref.current.geometry.setFromPoints([start, end]);
  });
  return (
    <line_ ref={ref} key={keyn}>
      <bufferGeometry />
      <lineBasicMaterial color="hotpink" side={DoubleSide} />
    </line_>
  );
};
const RibbonDraw: React.FC<RibbonDrawProps> = ({ canvasRef }) => {
  //const canvas2D = useContext(CanvasContext);
  const ribbons = useModeStore.use.ribbons();
  const setSection = useModeStore.use.setSection();
  const deleteRibbon = useModeStore.use.deleteRibbon();
  const addRibbon = useModeStore.use.addRibbon();
  const [width, setWidth] = useState(canvasRef.current.width);
  const [height, setHeight] = useState(canvasRef.current.height);
  const [vis, setVis] = useState<boolean>(true);
  const [idx, setIdx] = useState(0);
  let sto = null;
  let scroll = 0;
  const options = {
    // ribbon color HSL saturation amount
    colorSaturation: "80%",
    // ribbon color HSL brightness amount
    colorBrightness: "60%",
    // ribbon color opacity amount
    colorAlpha: 0.3,
    // how fast to cycle through colors in the HSL color space
    colorCycleSpeed: 6,
    // where to start from on the Y axis on each side (top|min, middle|center, bottom|max, random)
    verticalPosition: "random",
    // how fast to get to the other side of the screen
    horizontalSpeed: 150,
    // how many ribbons to keep on screen at any given time
    ribbonCount: 3,
    // add stroke along with ribbon fill colors
    strokeSize: 0,
    // move ribbons vertically by a factor on page scroll
    parallaxAmount: -0.5,
    // add animation effect to each ribbon section over time
    animateSections: true,
  };
  function addOne() {
    // movement data
    //@ts-ignore
    var dir = Math.round(random([1, 9])) > 5 ? "right" : "left",
      stop = 1000,
      hide = 200,
      min = 0 - width / 2 - hide,
      max = width / 2 + hide,
      movex = 0,
      movey = 0,
      startx = dir === "right" ? min : max,
      //@ts-ignore
      starty = Math.round(random([-height / 2, height / 2]));
    // asjust starty based on options
    if (/^(top|min)$/i.test(options.verticalPosition)) {
      starty = -height / 2 + hide;
    } else if (/^(middle|center)$/i.test(options.verticalPosition)) {
      starty = 0;
    } else if (/^(bottom|max)$/i.test(options.verticalPosition)) {
      starty = height / 2 - hide;
    }
    // ribbon sections data
    var ribbon = [],
      point1 = new Point(startx, starty),
      point2 = new Point(startx, starty),
      point3 = null,
      //@ts-ignore
      color = Math.round(random([0, 360])),
      delay = 0;
    // builds ribbon sections
    while (true) {
      if (stop <= 0) break;
      stop--;

      movex = Math.round((Math.random() * 1 - 0.2) * options.horizontalSpeed);
      movey = Math.round((Math.random() * 1 - 0.5) * (height * 0.25));
      //@ts-ignore
      point3 = new Point();
      point3.copy(point2);
      if (dir === "right") {
        point3.add(movex, movey);
        if (point2.x >= max) break;
      } else if (dir === "left") {
        point3.subtract(movex, movey);
        if (point2.x <= min) break;
      }
      // point3.clampY( 0, this._height );

      ribbon.push({
        // single ribbon section
        point1: new Point(point1.x, point1.y),
        point2: new Point(point2.x, point2.y),
        point3: new Point(point3.x, point3.y),
        color: color,
        delay: delay,
        dir: dir,
        alpha: 0,
        phase: 0,
        id: idx,
      });

      point1.copy(point2);
      point2.copy(point3);

      delay += 4;
      color += options.colorCycleSpeed;
    }
    setIdx(idx + 1);
    addRibbon(ribbon);
  }
  const drawRibbonSection = (section) => {
    if (section) {
      if (section.phase >= 1 && section.alpha <= 0) {
        return [section, true]; // done
      }
      var t = section.delay;
      if (section.delay <= 0) {
        section.phase += 0.02;
        section.alpha = Math.sin(section.phase) * 1;
        section.alpha = section.alpha <= 0 ? 0 : section.alpha;
        section.alpha = section.alpha >= 1 ? 1 : section.alpha;
        if (options.animateSections) {
          var mod = Math.sin(1 + (section.phase * Math.PI) / 2) * 0.1;

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
    }
    return [section, false]; // not done yet
  };
  function onDraw() {
    // console.log(ribbons.length);
    for (
      var a = ribbons.length - 1;
      a >= 0;
      --a // single ribbon
    ) {
      if (!ribbons[a]) continue;
      var ribbon = ribbons[a];
      var numSections = ribbon.length,
        numDone = 0;

      for (
        var b = 0;
        b < numSections;
        ++b // ribbon section
      ) {
        var res;
        var section = { ...ribbon[b] };
        res = drawRibbonSection(section);
        setSection(a, b, res[0]);
        if (res[1]) {
          numDone++; // section done
          // console.log("done", numDone, numSections);
        }
      }
      if (numDone >= numSections) {
        // console.log("done");
        deleteRibbon(a);
        // ribbon done
      }
    }
    // maintain optional number of ribbons on canvas
    // console.log(ribbons.length);
    if (ribbons.length < options.ribbonCount) addOne();
  }
  useEffect(() => {}, []);
  useFrame((state, delta) => {
    onDraw();
    if (vis) {
      setVis(false);
    }
  });
  return (
    <>
      {ribbons[0] &&
        ribbons[0].map((k, index) => {
          const vertices = [
            new Vector3(k.point1.x, k.point1.y, 0),
            new Vector3(k.point2.x, k.point2.y, 0),
            new Vector3(k.point3.x, k.point3.y, 0),
          ];
          return (
            <>
              <Triangle
                vertices={vertices}
                key={k.id}
                col={
                  "hsl(" +
                  k.color +
                  ", " +
                  options.colorSaturation +
                  ", " +
                  options.colorBrightness +
                  ")"
                }
                alpha={k.alpha}
              />
            </>
          );
        })}
      {ribbons[1] &&
        ribbons[1].map((k, index) => {
          const vertices = [
            new Vector3(k.point1.x, k.point1.y, 0),
            new Vector3(k.point2.x, k.point2.y, 0),
            new Vector3(k.point3.x, k.point3.y, 0),
          ];
          return (
            <>
              <Triangle
                vertices={vertices}
                key={k.id}
                col={
                  "hsl(" +
                  k.color +
                  ", " +
                  options.colorSaturation +
                  ", " +
                  options.colorBrightness +
                  ")"
                }
                alpha={k.alpha}
              />
            </>
          );
        })}
      {ribbons[2] &&
        ribbons[2].map((k, index) => {
          const vertices = [
            new Vector3(k.point1.x, k.point1.y, 0),
            new Vector3(k.point2.x, k.point2.y, 0),
            new Vector3(k.point3.x, k.point3.y, 0),
          ];
          return (
            <>
              <Triangle
                vertices={vertices}
                key={k.id}
                col={
                  "hsl(" +
                  k.color +
                  ", " +
                  options.colorSaturation +
                  ", " +
                  options.colorBrightness +
                  ")"
                }
                alpha={k.alpha}
              />
            </>
          );
        })}
    </>
  );
};

export default RibbonDraw;

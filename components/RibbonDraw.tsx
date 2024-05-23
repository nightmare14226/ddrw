"use client";

import React, {
  MutableRefObject,
  useRef,
  useEffect,
  useState,
} from "react";
import { useLayoutEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import Point from "@/classes/Point";
//import { CanvasContext } from "./Ribbons";
interface RibbonDrawProps {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
}
function Line({ start, end }) {
  const ref = useRef<();
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints(
      [start, end].map((point) => new THREE.Vector3(...point))
    );
  }, [start, end]);
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="hotpink" />
    </line>
  );
}
const RibbonDraw: React.FC<RibbonDrawProps> = ({ canvasRef }) => {
  //const canvas2D = useContext(CanvasContext);
  const [context2D, setContext2D] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [ribbons, setRibbons] = useState<any[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  let sto = null;
  let scroll = 0;
  const options = {
    // ribbon color HSL saturation amount
    colorSaturation: "80%",
    // ribbon color HSL brightness amount
    colorBrightness: "60%",
    // ribbon color opacity amount
    colorAlpha: 0.65,
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
  function addRibbon() {
    // movement data
    //@ts-ignore
    var dir = Math.round(random(1, 9)) > 5 ? "right" : "left",
      stop = 1000,
      hide = 200,
      min = 0 - hide,
      max = width + hide,
      movex = 0,
      movey = 0,
      startx = dir === "right" ? min : max,
      //@ts-ignore
      starty = Math.round(random(0, height));

    // asjust starty based on options
    if (/^(top|min)$/i.test(options.verticalPosition)) {
      starty = 0 + hide;
    } else if (/^(middle|center)$/i.test(options.verticalPosition)) {
      starty = height / 2;
    } else if (/^(bottom|max)$/i.test(options.verticalPosition)) {
      starty = height - hide;
    }

    // ribbon sections data
    var ribbon = [],
      point1 = new Point(startx, starty),
      point2 = new Point(startx, starty),
      point3 = null,
      //@ts-ignore
      color = Math.round(random(0, 360)),
      delay = 0;

    // buils ribbon sections
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
        point3: point3,
        color: color,
        delay: delay,
        dir: dir,
        alpha: 0,
        phase: 0,
      });

      point1.copy(point2);
      point2.copy(point3);

      delay += 4;
      color += options.colorCycleSpeed;
    }
    ribbons.push(ribbon);
  }
  function drawRibbonSection(section) {
    if (section) {
      if (section.phase >= 1 && section.alpha <= 0) {
        return true; // done
      }
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

      var s = options.colorSaturation,
        l = options.colorBrightness,
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

      context2D.save();

      if (options.parallaxAmount !== 0) {
        context2D.translate(
          0,
          canvasRef.current.scrollHeight * options.parallaxAmount
        );
      }
      context2D.beginPath();
      context2D.moveTo(section.point1.x, section.point1.y);
      context2D.lineTo(section.point2.x, section.point2.y);
      context2D.lineTo(section.point3.x, section.point3.y);
      context2D.fillStyle = c;
      context2D.fill();

      if (options.strokeSize > 0) {
        context2D.lineWidth = options.strokeSize;
        context2D.strokeStyle = c;
        context2D.lineCap = "round";
        context2D.stroke();
      }
      context2D.restore();
    }
    return false; // not done yet
  }
  function onDraw() {
    if (!context2D) return;
    // cleanup on ribbons list to rtemoved finished ribbons
    for (var i = 0, t = ribbons.length; i < t; ++i) {
      if (!ribbons[i]) {
        ribbons.splice(i, 1);
      }
    }

    // draw new ribbons
    context2D.clearRect(0, 0, width, height);

    for (
      var a = 0;
      a < ribbons.length;
      ++a // single ribbon
    ) {
      var ribbon = ribbons[a],
        numSections = ribbon.length,
        numDone = 0;

      for (
        var b = 0;
        b < numSections;
        ++b // ribbon section
      ) {
        if (drawRibbonSection(ribbon[b])) {
          numDone++; // section done
        }
      }
      if (numDone >= numSections) {
        // ribbon done
        ribbons[a] = null;
      }
    }
    // maintain optional number of ribbons on canvas
    if (ribbons.length < options.ribbonCount) {
      addRibbon();
    }
    requestAnimationFrame(onDraw);
  }
  useEffect(() => {}, [canvasRef.current]);
  useFrame((state, delta) => {});
  return <Line start={[0, 0, 0]} end={[1, 0, 0]} />;
};

export default RibbonDraw;

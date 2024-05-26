"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import Point from "@/classes/Point";
export type RibbonType = {
  point1: Point;
  point2: Point;
  point3: Point;
  color: number;
  delay: number;
  dir: string;
  alpha: number;
  phase: number;
};
type Matrix = RibbonType[][];
interface MatrixContextType {
  ribbons: Matrix;
  addOne: (item: RibbonType[]) => void;
  resetRibbons: (newOne: Matrix) => void;
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);
export const useMatrix = () => {
  const context = useContext(MatrixContext);
  return context;
};
type Props = {
  children: ReactNode;
};
export const MatrixProvider: React.FC<Props> = ({ children }) => {
  const [ribbons, setRibbons] = useState<Matrix>([]);

  const addOne = (item: RibbonType[]) => {
    setRibbons([...ribbons, item]);
  };
  const resetRibbons = (newOne: Matrix) => {
    const temp: RibbonType[][] = [];
    for (var i = 0; i < newOne.length; i++) {
      if (newOne[i]) {
        temp.push([]);
        for (var j = 0; j < newOne[i].length; j++)
          temp[i].push({
            // single ribbon section
            point1: new Point(newOne[i][j].point1.x, newOne[i][j].point1.y),
            point2: new Point(newOne[i][j].point2.x, newOne[i][j].point2.y),
            point3: new Point(newOne[i][j].point3.x, newOne[i][j].point3.y),
            color: newOne[i][j].color,
            delay: newOne[i][j].delay,
            dir: newOne[i][j].dir,
            alpha: newOne[i][j].alpha,
            phase: newOne[i][j].phase,
          });
      } else temp.push(null);
    }
    setRibbons(temp);
  };

  return (
    <MatrixContext.Provider value={{ ribbons, addOne, resetRibbons }}>
      {children}
    </MatrixContext.Provider>
  );
};
export default MatrixProvider;

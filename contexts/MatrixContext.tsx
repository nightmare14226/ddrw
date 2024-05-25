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
      if (newOne[i]) temp.push([...newOne[i]]);
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

"use client";

import { CanvasContext } from "@/components/Ribbons";
import { Canvas } from "@react-three/fiber";
import { ReactNode, useState } from "react";

interface IProps {
  children: ReactNode;
}

const CanvasProvider: React.FC<IProps> = ({ children }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(
    new HTMLCanvasElement()
  );
  const contextValue = {
    canvas,
    setCanvas,
  };
  return (
    <CanvasContext.Provider value={contextValue}>
      {children}
    </CanvasContext.Provider>
  );
};
export default CanvasProvider;

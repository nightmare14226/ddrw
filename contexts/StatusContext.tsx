"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface StatusContextType {
  timeCoef: number;
  targetTimeCoef: number;
  hyperMode: boolean;
  setTimeCoef: (tc: number) => void;
  setTargetTimeCoef: (ttc: number) => void;
  setHyperMode: (hm: boolean) => void;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);
export const useStatus = () => {
  const context = useContext(StatusContext);
  return context;
};
type Props = {
  children: ReactNode;
};
export const StatusProvider: React.FC<Props> = ({ children }) => {
  const [timeCoef, setTimeCoef] = useState(1);
  const [targetTimeCoef, setTargetTimeCoef] = useState(1);
  const [hyperMode, setHyperMode] = useState(false);

  return (
    <StatusContext.Provider
      value={{
        timeCoef,
        targetTimeCoef,
        hyperMode,
        setTimeCoef,
        setTargetTimeCoef,
        setHyperMode,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
export default StatusProvider;

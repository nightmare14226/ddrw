"use client";
import { createOvermind } from "overmind";
import { config } from "./StateProvider";
import { Provider } from "overmind-react";
const ForwardState = ({ children }) => {
  const overmind = createOvermind(config);
  return <Provider value={overmind}>{children}</Provider>;
};
export default ForwardState;

import { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
interface CanvasContextType {
  canvas: HTMLCanvasElement | null;
  setCanvas: Dispatch<SetStateAction<HTMLCanvasElement | null>>;
}

const defaultState: CanvasContextType = {
  canvas: null,
  setCanvas: () => {},
};
const CanvasContext = createContext<CanvasContextType>(defaultState);
export default CanvasContext;

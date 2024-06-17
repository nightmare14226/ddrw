"use client";
import { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";
import Point from "@/classes/Point";
import { produce } from "immer";
export type RibbonType = {
  point1: Point;
  point2: Point;
  point3: Point;
  color: number;
  delay: number;
  dir: string;
  alpha: number;
  phase: number;
  id: number;
};
type Matrix = RibbonType[][];

interface ModeStore {
  ribbons: RibbonType[][];
  addRibbon: (rb: RibbonType[]) => void;
  deleteRibbon: (id: number) => void;
  setRibbons: (rbs: Matrix) => void;
  setSection: (row: number, col: number, sec: RibbonType) => void;
}
const useStore = create<ModeStore>()((set) => ({
  ribbons: [],
  deleteRibbon: (id: number) =>
    set((state) => {
      const temp = [...state.ribbons];
      temp.splice(id, 1);
      return {
        ribbons: temp,
      };
    }),
  setSection: (row, col, sec) =>
    set((state) => {
      const newRibbons = state.ribbons.map((r, i) =>
        i === row ? r.map((val, j) => (j === col ? sec : val)) : r
      );
      return { ribbons: newRibbons };
    }),
  addRibbon: (rb: RibbonType[]) =>
    set((state) => ({
      ribbons: [...state.ribbons, [...rb]],
    })),
  setRibbons: (rbs: Matrix) =>
    set(
      produce(() => ({
        ribbons: [...rbs],
      }))
    ),
}));

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
export const useRibbonStore = createSelectors(useStore);
export default useStore;

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
  timeCoef: number;
  targetTimeCoef: number;
  hyperMode: boolean;
  turboMode: boolean;
  ribbons: any[][];
  addRibbon: (rb: any[]) => void;
  deleteRibbon: (id: number) => void;
  setRibbons: (rbs: Matrix) => void;
  setSection: (row: number, col: number, sec: RibbonType) => void;
  setHyperMode: (hm: boolean) => void;
  setTurboMode: () => void;
  changeHyperMode: () => void;
  changeTurboMode: () => void;
  initTurboMode: () => void;
  setTimeCoef: (tc: number) => void;
  setTargetTimeCoef: (ttc: number) => void;
  moveOneStep: () => void;
}
const useStore = create<ModeStore>()((set) => ({
  timeCoef: 1,
  targetTimeCoef: 1,
  hyperMode: false,
  turboMode: false,
  ribbons: [],
  setHyperMode: (hm) =>
    set({
      hyperMode: hm,
    }),
  initTurboMode: () =>
    set({
      targetTimeCoef: 1,
    }),
  setTurboMode: () =>
    set({
      turboMode: false,
    }),
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
  changeHyperMode: () =>
    set((state) =>
      state.hyperMode == true
        ? {
            hyperMode: false,
            targetTimeCoef: 1,
          }
        : {
            hyperMode: true,
            targetTimeCoef: 100,
          }
    ),
  changeTurboMode: () => {
    set((state) =>
      state.hyperMode == true
        ? {
            turboMode: state.turboMode,
          }
        : {
            turboMode: true,
            targetTimeCoef: 100,
          }
    );
  },
  setTimeCoef: (tc) => set({ timeCoef: tc }),
  setTargetTimeCoef: (ttc) => set({ targetTimeCoef: ttc }),
  moveOneStep: async () =>
    set((state) => {
      return state.turboMode
        ? {
            timeCoef:
              state.timeCoef + (state.targetTimeCoef - state.timeCoef) * 0.02,
            targetTimeCoef: state.timeCoef > 40 ? 1 : state.targetTimeCoef,
            turboMode:
              state.timeCoef < 10 && state.targetTimeCoef == 1 ? false : true,
          }
        : {
            timeCoef:
              state.timeCoef + (state.targetTimeCoef - state.timeCoef) * 0.02,
          };
    }),
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
export const useModeStore = createSelectors(useStore);
export default useStore;

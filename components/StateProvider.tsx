"use client";
import { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";
interface ModeStore {
  timeCoef: number;
  targetTimeCoef: number;
  hyperMode: boolean;
  setHyperMode: (hm: boolean) => void;
  changeHyperMode: () => void;
  setTimeCoef: (tc: number) => void;
  setTargetTimeCoef: (ttc: number) => void;
  moveOneStep: () => void;
}
const useStore = create<ModeStore>()((set) => ({
  timeCoef: 1,
  targetTimeCoef: 1,
  hyperMode: false,
  setHyperMode: (hm) =>
    set({
      hyperMode: hm,
    }),
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
  setTimeCoef: (tc) => set({ timeCoef: tc }),
  setTargetTimeCoef: (ttc) => set({ targetTimeCoef: ttc }),
  moveOneStep: () =>
    set((state) => ({
      timeCoef: state.timeCoef + (state.targetTimeCoef - state.timeCoef) * 0.02,
    })),
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

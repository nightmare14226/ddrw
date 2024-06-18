"use client";
import { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";
import Point from "@/classes/Point";
import { produce } from "immer";
import { createJSONStorage, persist } from "zustand/middleware";
interface ModeStore {
  timeCoef: number;
  targetTimeCoef: number;
  hyperMode: boolean;
  turboMode: boolean;
  setHyperMode: (hm: boolean) => void;
  setTurboMode: () => void;
  changeHyperMode: () => void;
  changeTurboMode: () => void;
  initTurboMode: () => void;
  setTimeCoef: (tc: number) => void;
  setTargetTimeCoef: (ttc: number) => void;
  moveOneStep: () => void;
}
const useStore = create<ModeStore>()(
  persist(
    (set) => ({
      timeCoef: 1,
      targetTimeCoef: 1,
      hyperMode: false,
      turboMode: false,
      setHyperMode: (hm) =>
        set({
          hyperMode: hm,
        }),
      initTurboMode: () =>
        set((state) =>
          state.hyperMode == true
            ? {
                targetTimeCoef: 100,
              }
            : {
                targetTimeCoef: 1,
              }
        ),
      setTurboMode: () =>
        set({
          turboMode: false,
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
      changeTurboMode: () => {
        set((state) =>
          state.hyperMode == true
            ? {
                turboMode: state.turboMode,
              }
            : {
                turboMode: true,
                targetTimeCoef: 50,
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
                  state.timeCoef +
                  (state.targetTimeCoef - state.timeCoef) * 0.02,
                targetTimeCoef: state.timeCoef > 40 ? 1 : state.targetTimeCoef,
                turboMode:
                  state.timeCoef < 10 && state.targetTimeCoef == 1
                    ? false
                    : true,
              }
            : {
                timeCoef:
                  state.timeCoef +
                  (state.targetTimeCoef - state.timeCoef) * 0.02,
              };
        }),
    }),
    {
      name: "mode-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

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

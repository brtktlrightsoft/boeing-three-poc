import { create } from 'zustand';

interface ControlsState {
  enableControls: boolean;
  toggleControls: () => void;
  setEnableControls: (enableControls: boolean) => void;
}

export const useControlsStore = create<ControlsState>((set) => ({
  enableControls: false,
  setEnableControls: (enableControls: boolean) => set({ enableControls }),
  toggleControls: () => set((state) => ({ enableControls: !state.enableControls })),
})); 
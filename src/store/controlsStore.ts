import { create } from 'zustand';

interface ControlsState {
  enableControls: boolean;
  toggleControls: () => void;
}

export const useControlsStore = create<ControlsState>((set) => ({
  enableControls: false,
  toggleControls: () => set((state) => ({ enableControls: !state.enableControls })),
})); 
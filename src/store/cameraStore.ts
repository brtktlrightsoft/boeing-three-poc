import {create} from 'zustand';

interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  updateCameraPosition: (newPosition: [number, number, number]) => void;
  updateCameraTarget: (newTarget: [number, number, number]) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  // Set an initial camera position if needed
  position: [25.81, 10.65, 41.48],
  target: [0, 0, 0],
  updateCameraPosition: (newPosition: [number, number, number]) =>
    set({ position: newPosition }),
  updateCameraTarget: (newTarget: [number, number, number]) =>
    set({ target: newTarget }),
}));
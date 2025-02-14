import { create } from 'zustand';
import { Vector3 } from 'three';

interface CameraInformationStore {
  position: Vector3;
  lookAt: Vector3;
  updatePosition: (newPosition: Vector3) => void;
  updateLookAt: (newLookAt: Vector3) => void;
}

const initialPosition = new Vector3(25.81, 10.65, 41.48);

export const useCameraInformationStore = create<CameraInformationStore>((set) => ({
  position: initialPosition,
  updatePosition: (newPosition) => set({ position: newPosition }),
  lookAt: new Vector3(0, 0, 0),
  updateLookAt: (newLookAt) => set({ lookAt: newLookAt }),
})); 
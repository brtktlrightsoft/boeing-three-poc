import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useCameraInformationStore } from '../../store/cameraInformationStore';
import { useCameraStore } from '../../store/cameraStore';
import * as THREE from 'three';
import { useControlsStore } from '../../store/controlsStore';

export const CameraPositionUpdater = () => {
  const { camera } = useThree();
  const enableControls = useControlsStore((state) => state.enableControls);
  const updatePosition = useCameraInformationStore((state) => state.updatePosition);
  const position = useCameraStore((state) => state.position);
  const target = useCameraStore((state) => state.target);
  const isAnimating = useRef(false);
  const targetPosition = useRef(new THREE.Vector3());
  useEffect(() => {
    const updateCameraPosition = () => {
      updatePosition(camera.position.clone());
    };

    const interval = setInterval(updateCameraPosition, 100);
    return () => clearInterval(interval);
  }, [camera, updatePosition]);

  useEffect(() => {
    if(enableControls) return;
    // When position changes from store, start animation
    targetPosition.current.set(position[0], position[1], position[2]);
    isAnimating.current = true;
  }, [position,target,camera,enableControls]);

  useFrame(() => {
    if (isAnimating.current) {
      // Check if we're close enough to the target
      if (camera.position.distanceTo(targetPosition.current) < 1) {
        isAnimating.current = false;
        return;
      }
      // Lerp from the current camera position towards the target
      camera.position.lerp(targetPosition.current, 0.08);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}; 
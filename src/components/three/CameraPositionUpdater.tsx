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

  // Animation state
  const isAnimating = useRef(false);
  const startPosition = useRef(new THREE.Vector3());
  const targetPosition = useRef(new THREE.Vector3());
  const startRotation = useRef(new THREE.Quaternion());
  const endRotation = useRef(new THREE.Quaternion());
  const progress = useRef(0);

  // Update camera position in store
  useEffect(() => {
    updatePosition(camera.position.clone());
  }, [camera.position, updatePosition]);

  // Start animation when position changes
  useEffect(() => {
    if (enableControls) return;

    // Store start state
    startPosition.current.copy(camera.position);
    startRotation.current.copy(camera.quaternion);

    // Set target position
    targetPosition.current.set(position[0], position[1], position[2]);

    // Calculate target rotation
    const targetVec = new THREE.Vector3(target[0], target[1], target[2]);
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.lookAt(targetPosition.current, targetVec, camera.up);
    endRotation.current.setFromRotationMatrix(rotationMatrix);

    // Reset animation
    progress.current = 0;
    isAnimating.current = true;
  }, [position, target, camera, enableControls]);

  // Handle camera animation
  useFrame(() => {
    if (!isAnimating.current) return;

    // Update progress
    progress.current += 0.02;

    // Check if animation is complete
    if (progress.current >= 1) {
      camera.position.copy(targetPosition.current);
      camera.quaternion.copy(endRotation.current);
      isAnimating.current = false;
      progress.current = 0;
      return;
    }

    // Calculate smooth easing
    const t = progress.current;
    const smoothT = t < 0.5
      ? 4 * t * t * t  // Ease in
      : 1 - Math.pow(-2 * t + 2, 3) / 2;  // Ease out

    // Move camera
    camera.position.lerpVectors(
      startPosition.current,
      targetPosition.current,
      smoothT
    );

    // Rotate camera
    camera.quaternion.slerpQuaternions(
      startRotation.current,
      endRotation.current,
      smoothT
    );

    camera.updateProjectionMatrix();
  });

  return null;
}; 
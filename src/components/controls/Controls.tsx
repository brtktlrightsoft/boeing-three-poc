import { OrbitControls as DreiOrbitControls, OrbitControlsChangeEvent } from "@react-three/drei";
import { ControlsProps } from "../../types/viewer";
import { useEffect, useRef } from "react";
import { useCameraStore } from "../../store/cameraStore";
import { useControlsStore } from "../../store/controlsStore";
import * as THREE from "three";
import { useCameraInformationStore } from "../../store/cameraInformationStore";
import { useFrame } from "@react-three/fiber";

export const Controls = ({
  autoRotate = true,
}: ControlsProps) => {
  const target = useCameraStore((state) => state.target);
  const enableControls = useControlsStore((state) => state.enableControls);
  const controlsRef = useRef(null);
  const updateLookAt = useCameraInformationStore((state) => state.updateLookAt);
  const isAnimating = useRef(false);
  const targetVector = useRef(new THREE.Vector3());
  const startVector = useRef(new THREE.Vector3());
  const progress = useRef(0);

  useEffect(() => {
    if (!enableControls && controlsRef.current) {
      // @ts-expect-error - OrbitControls instance has a target property at runtime
      startVector.current.copy(controlsRef.current.target);
      targetVector.current.set(target[0], target[1], target[2]);
      progress.current = 0;
      isAnimating.current = true;
    }
  }, [target, enableControls]);

  // useFrame(() => {
  //   if (isAnimating.current && controlsRef.current) {
  //     progress.current += 0.02; // Match camera animation speed

  //     if (progress.current >= 1) {
  //       // @ts-expect-error - OrbitControls instance has a target property at runtime
  //       controlsRef.current.target.copy(targetVector.current);
  //       isAnimating.current = false;
  //       progress.current = 0;
  //       return;
  //     }

  //     // Use same cubic easing as camera
  //     const t = progress.current;
  //     const smoothT = t < 0.5
  //       ? 4 * t * t * t
  //       : 1 - Math.pow(-2 * t + 2, 3) / 2;

  //     // @ts-expect-error - OrbitControls instance has a target property at runtime
  //     const controls = controlsRef.current;
  //     controls.target.lerpVectors(
  //       startVector.current,
  //       targetVector.current,
  //       smoothT
  //     );
  //     controls.update();
  //     updateLookAt(controls.target);
  //   }
  // });

  const handleChange = (e?: OrbitControlsChangeEvent) => {
    if (e?.target) {
      const controls = e.target;
      updateLookAt(controls.target);
    }
  };

  useEffect(() => {
    if (controlsRef.current) {
      // @ts-expect-error 
      controlsRef.current.enableRotate = enableControls;
      // @ts-expect-error 
      controlsRef.current.enablePan = enableControls;
      // @ts-expect-error
      controlsRef.current.enableZoom = enableControls;
    }
  }, [enableControls]);

  return (
    <DreiOrbitControls
      ref={controlsRef}
      target0={new THREE.Vector3(-16.84, -7.26, 1.85)}
      // enableDamping={false}
      // dampingFactor={50}
      // autoRotate={autoRotate}
      
      // autoRotateSpeed={0.5}
      enableZoom={enableControls}
      enablePan={enableControls}
      minDistance={10}
      maxDistance={500}
      onChange={handleChange}
    />
  );
};

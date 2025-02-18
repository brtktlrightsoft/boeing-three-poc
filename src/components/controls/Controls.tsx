import { OrbitControls as DreiOrbitControls, OrbitControlsChangeEvent } from "@react-three/drei";
import { ControlsProps } from "../../types/viewer";
import { useEffect, useRef } from "react";
import { useCameraStore } from "../../store/cameraStore";
import { useControlsStore } from "../../store/controlsStore";
import * as THREE from "three";
import { useCameraInformationStore } from "../../store/cameraInformationStore";

export const Controls = ({
  autoRotate = true,
}: ControlsProps) => {
  const target = useCameraStore((state) => state.target);
  const enableControls = useControlsStore((state) => state.enableControls);
  const controlsRef = useRef(null);
  const updateLookAt = useCameraInformationStore((state) => state.updateLookAt);

  useEffect(() => {
    if (controlsRef.current) {
      const targetVector = new THREE.Vector3(target[0], target[1], target[2]);
      // @ts-expect-error - OrbitControls instance has a target property at runtime
      controlsRef.current.target.copy(targetVector);
    }
  }, [target]);

  const handleChange = (e?: OrbitControlsChangeEvent) => {
    if (e?.target) {
      const controls = e.target;
      console.log("Target:", controls.target);
      updateLookAt(controls.target);
    }
  };
  useEffect(() => {
    if (controlsRef.current) {
       // @ts-expect-error - OrbitControls instance has a target property at runtime
       controlsRef.current.enableRotate = enableControls;
      // @ts-expect-error - OrbitControls instance has a target property at runtime
      controlsRef.current.enablePan = enableControls;
      // @ts-expect-error - OrbitControls instance has a target property at runtime
      controlsRef.current.enableZoom = enableControls;
      if (!enableControls) {
        const targetVector = new THREE.Vector3(target[0], target[1], target[2]);
        // @ts-expect-error - OrbitControls instance has a target property at runtime
        controlsRef.current.target.copy(targetVector);
      }
    }
  }, [enableControls])
  return (
    <DreiOrbitControls
      ref={controlsRef}
      target0={new THREE.Vector3(-16.84, -7.26, 1.85)}
      enableDamping
      dampingFactor={0.05}
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      enableZoom={enableControls}
      enablePan={enableControls}
      minDistance={10}
      maxDistance={50}
      onChange={handleChange}
    />
  );
};

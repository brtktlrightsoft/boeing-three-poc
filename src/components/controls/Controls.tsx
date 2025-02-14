import { OrbitControls as DreiOrbitControls, OrbitControlsChangeEvent } from "@react-three/drei";
import { ControlsProps } from "../../types/viewer";
import { useEffect, useRef } from "react";
import { useCameraStore } from "../../store/cameraStore";
import * as THREE from "three";

export const Controls = ({
  autoRotate = true,
  enableZoom = true,
  enablePan = true,
}: ControlsProps) => {
  const target = useCameraStore((state) => state.target);
  const controlsRef = useRef(null);

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
    }
  };

  return (
    <DreiOrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      enableZoom={enableZoom}
      enablePan={enablePan}
      minDistance={10}
      maxDistance={50}
      onChange={handleChange}
    />
  );
};

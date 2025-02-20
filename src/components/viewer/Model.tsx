import { useLoader } from "@react-three/fiber";
//@ts-expect-error
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect } from "react";
import * as THREE from "three";

export const Model = ({ url, onLoad, onError }: any) => {
  const gltf = useLoader(GLTFLoader, url, undefined, (error) => {
    console.error("Error loading model:", error);
    onError?.(error);
  });

  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          // Enable environment map reflections on all materials
          if (child.material) {
            child.material.envMapIntensity = 1;
            child.material.needsUpdate = true;
          }
        }
      });
      onLoad?.();
    }
  }, [gltf, onLoad]);

  return <primitive object={gltf.scene} />;
}; 
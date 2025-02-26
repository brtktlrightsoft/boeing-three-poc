import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { ModelViewerProps } from "../../types/viewer";
import { Model } from "./Model";
import { Controls } from "../controls/Controls";
import { LoadingScreen } from "../ui/LoadingScreen";
import { CameraPositionDisplay } from "../ui/CameraPositionDisplay";
import { CameraPositionUpdater } from "../three/CameraPositionUpdater";
import { HotSpotNavigation } from "../ui/HotSpotNavigation";
import { HotSpotCard } from "../ui/HotSpotCard";
import { ControlsToggle } from "../ui/ControlsToggle";
import { Environment } from "../three/Environment";
import { HotSpotIndicator } from "../ui/HotSpotIndicator";
import { useControlsStore } from "../../store/controlsStore";
import * as THREE from "three";
import { HomeNavigation } from "../ui/HomeNavigation";
import { useProductStore } from "../../store/productStore";
export const ModelViewer = ({
  modelUrl,
}: ModelViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [_, setError] = useState<string>();
  const enableControls = useControlsStore((state) => state.enableControls);
  const product = useProductStore((state) => state.product);
  const setCurrentHotspotIndex = useProductStore((state) => state.setCurrentHotspotIndex);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);
  const isFreeMode = product?.hotspots.length === currentHotspotIndex;
  const handleModelLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleError = (err: string) => {
    setError(err);
    // setIsLoading(false);
  };
  useEffect(() => {
    return () => {
      setCurrentHotspotIndex(0);
    }
  }, []);
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          position: [2.92, 4.53, 31.64],
          fov: 45,
        }}
        className="w-full h-full"
        gl={{
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          <Model
            url={modelUrl}
            onLoad={handleModelLoad}
            onError={handleError}
          />
          <Environment />
        </Suspense>
        {enableControls && <Controls autoRotate={false} />
        }
        <CameraPositionUpdater />
      </Canvas>
      <HomeNavigation />
      <ControlsToggle />
      <HotSpotIndicator />
      {!isLoading && <HotSpotNavigation />}
      {!isLoading && !enableControls && !isFreeMode && <HotSpotCard />}
      <LoadingScreen isLoading={isLoading} />
    </div>
  );
};

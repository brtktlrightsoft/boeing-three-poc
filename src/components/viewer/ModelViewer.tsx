import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
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

export const ModelViewer = ({
  modelUrl,
  backgroundColor = "#1a1a1a",
}: ModelViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const enableControls = useControlsStore((state) => state.enableControls);

  const handleModelLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleError = (err: string) => {
    setError(err);
    // setIsLoading(false);
  };

  return (
    <div
      style={{ width: "100%", height: "100vh", background: backgroundColor }}
    >
      <Canvas
        camera={{
          position: [2.92, 4.53, 31.64],
          fov: 45,
        }}
        style={{ width: "100%", height: "100%" }}
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
        <Controls autoRotate={false} />
        <CameraPositionUpdater />
      </Canvas>
      <HomeNavigation />
      <CameraPositionDisplay />
      <ControlsToggle />
      <HotSpotIndicator />
      {!isLoading && !enableControls && <HotSpotNavigation />}
      {!isLoading && !enableControls && <HotSpotCard />}
      <LoadingScreen isLoading={isLoading}  />
    </div>
  );
};

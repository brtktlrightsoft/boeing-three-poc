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

export const ModelViewer = ({
  modelUrl,
  backgroundColor = "#1a1a1a",
}: ModelViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const handleModelLoad = () => {
    setIsLoading(false);
  };

  const handleError = (err: string) => {
    setError(err);
    setIsLoading(false);
  };

  return (
    <div
      style={{ width: "100%", height: "100vh", background: backgroundColor }}
    >
      <Canvas
        camera={{
          position: [9.56, -12, 49],
          fov: 45,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model
            url={modelUrl}
            onLoad={handleModelLoad}
            onError={handleError}
          />
        </Suspense>
        <Controls autoRotate={false} />
        <CameraPositionUpdater />
      </Canvas>
      <CameraPositionDisplay />
      {!isLoading && <HotSpotNavigation />}
      {!isLoading && <HotSpotCard />}
      <LoadingScreen isLoading={isLoading} error={error} />
    </div>
  );
};

import { useCameraInformationStore } from '../../store/cameraInformationStore';

export const CameraPositionDisplay = () => {
  const position = useCameraInformationStore((state) => state.position);
  const lookAt = useCameraInformationStore((state) => state.lookAt);

  return (
    <div className="absolute bottom-12 left-5 flex gap-4 bg-black/70 p-2.5 rounded text-white font-mono text-sm z-[1000]">
      <div>
        <div>Camera Position:</div>
        <div>X: {position.x.toFixed(2)}</div>
        <div>Y: {position.y.toFixed(2)}</div>
        <div>Z: {position.z.toFixed(2)}</div>
      </div>
      <div>
        <div>Look At:</div>
        <div>X: {lookAt.x.toFixed(2)}</div>
        <div>Y: {lookAt.y.toFixed(2)}</div>
        <div>Z: {lookAt.z.toFixed(2)}</div>
      </div>

    </div>
  );
}; 
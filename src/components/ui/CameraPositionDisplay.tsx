import { useCameraInformationStore } from '../../store/cameraInformationStore';

export const CameraPositionDisplay = () => {
  const position = useCameraInformationStore((state) => state.position);
  const lookAt = useCameraInformationStore((state) => state.lookAt);
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        zIndex: 1000,
      }}
    >
      <div>Camera Position:</div>
      <div>X: {position.x.toFixed(2)}</div>
      <div>Y: {position.y.toFixed(2)}</div>
      <div>Z: {position.z.toFixed(2)}</div>
      <div>Look At:</div>
      <div>X: {lookAt.x.toFixed(2)}</div>
      <div>Y: {lookAt.y.toFixed(2)}</div>
      <div>Z: {lookAt.z.toFixed(2)}</div>
    </div>
  );
}; 
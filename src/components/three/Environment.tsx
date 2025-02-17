import { Environment as DreiEnvironment } from '@react-three/drei';

export const Environment = () => {
  return (
    <DreiEnvironment
      preset="studio"
      background={false}
      blur={0.8}
    />
  );
}; 
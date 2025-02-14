import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useModel } from '../../hooks/useModel';

interface ModelProps {
  url?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export const Model = ({ url, onLoad, onError }: ModelProps) => {
  const { model, error } = useModel(url);
  const { scene } = useThree();

  useEffect(() => {
    if (model) {
      // Center the model
      model.scene.position.set(0, 0, 0);
      model.scene.scale.set(1, 1, 1);
      
      // Clear existing model if any
      scene.children = scene.children.filter(child => 
        child.type === 'DirectionalLight' || child.type === 'AmbientLight'
      );
      
      // Add the new model
      scene.add(model.scene);
      
      // Call onLoad callback
      onLoad?.();
    }
  }, [model, scene, onLoad]);

  useEffect(() => {
    if (error) {
      console.error('Error loading model:', error);
      onError?.(error);
    }
  }, [error, onError]);

  return null;
}; 
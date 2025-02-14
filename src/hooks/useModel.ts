import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const useModel = (url?: string) => {
  const [model, setModel] = useState<GLTF | undefined>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    setIsLoading(true);
    setError(undefined);

    const loader = new GLTFLoader();
    
    loader.load(
      url,
      (gltf: GLTF) => {
        setModel(gltf);
        setIsLoading(false);
      },
      undefined,
      (error: unknown) => {
        console.error('Error loading model:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setIsLoading(false);
      }
    );
  }, [url]);

  return { model, isLoading, error };
}; 
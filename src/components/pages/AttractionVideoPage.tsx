import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/button';
import { activationStorage } from '../../config/storage';
import { ActivationData } from '../../types/activation-data';
import { useProductStore } from '../../store/productStore';

export const AttractionVideoPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const setProduct = useProductStore((state) => state.setProduct);

  useEffect(() => {
    const loadVideo = async () => {
      const pin = localStorage.getItem('pin');
      if (!pin) {
        navigate('/pin-entry', { replace: true });
        return;
      }

      try {
        const data = await activationStorage.getItem<ActivationData>(pin);
        if (!data?.attractionVideo) {
          navigate('/', { replace: true });
          return;
        }

        // Create URL from Blob
        const url = URL.createObjectURL(data.attractionVideo);
        setVideoUrl(url);

        // Auto play video
        if (videoRef.current) {
          videoRef.current.play();
        }

        // Cleanup URL on unmount
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error('Error loading video:', error);
        navigate('/', { replace: true });
      }
    };

    loadVideo();
  }, [navigate]);

  const handleStart = async () => {
    try {
      const pin = localStorage.getItem('pin');
      if (!pin) {
        navigate('/', { replace: true });
        return;
      }

      const data = await activationStorage.getItem<ActivationData>(pin);
      if (!data?.products?.[0]) {
        console.error('No product data found');
        navigate('/', { replace: true });
        return;
      }

      // Set the first product in the store
      setProduct(data.products[0]);
      
      // Navigate to view product page
      navigate('/select-language');
    } catch (error) {
      console.error('Error loading product:', error);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Video Player */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        playsInline
        loop
        autoPlay
        muted
      />

      {/* Overlay for button */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-16 bg-gradient-to-t from-black/50 to-transparent h-32">
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onPress={handleStart}
          className="w-64 text-xl font-semibold"
        >
          Start
        </Button>
      </div>
    </div>
  );
}; 
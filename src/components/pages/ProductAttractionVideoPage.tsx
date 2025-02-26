import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { BoeingButton } from '../ui/BoeingButton';
import { useTranslation } from 'react-i18next';
import MenuButton from '../ui/MenuButton';
export const ProductAttractionVideoPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const product = useProductStore((state) => state.product);
  const { t } = useTranslation();
  useEffect(() => {
    const loadVideo = async () => {
      const pin = localStorage.getItem('pin');
      if (!pin) {
        navigate('/pin-entry', { replace: true });
        return;
      }

      try {
        if (!product?.attractionVideo) {
          navigate('/', { replace: true });
          return;
        }

        // Create URL from Blob
        const url = URL.createObjectURL(product.attractionVideo);
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
    navigate('/view-product');
  };

  return (
    <div className="relative w-screen h-screen">
      <MenuButton />
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
        <BoeingButton onClick={handleStart}>
          {t('buttons.explore')}
        </BoeingButton>
      </div>
    </div>
  );
}; 
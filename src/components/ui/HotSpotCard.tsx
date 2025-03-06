import { useProductStore } from "../../store/productStore";
import { useEffect, useRef, useState } from "react";
import { DashedLine } from './DashedLine';
import { useTranslation } from 'react-i18next';
import HotspotMediaPopup from "./HotspotMediaPopup";
import FadeDialog from "./FadeInDialog";

export const HotSpotCard = () => {
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);
  const { i18n } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, _] = useState(true);
  const [linePoints, setLinePoints] = useState({
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 }
  });
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const isLeftSide = currentHotspotIndex % 2 === 0;

  useEffect(() => {
    const updateLine = () => {
      if (cardRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const lineStartX = isLeftSide ? cardRect.right : cardRect.left;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        setLinePoints({
          startPoint: { x: screenCenterX, y: screenCenterY },
          endPoint: { x: lineStartX, y: cardCenterY }
        });
      }
    };

    updateLine();
    window.addEventListener('resize', updateLine);
    return () => window.removeEventListener('resize', updateLine);
  }, [currentHotspotIndex, isLeftSide]);

  if (!product) return null;

  const currentHotspot = product.hotspots[currentHotspotIndex];
  const currentLanguage = i18n.language;


  const [hotspotMediaUrls, setHotspotMediaUrls] = useState<string[]>([]);
  useEffect(() => {
    const getMediaUrlsFromBlobs = async () => {
      const urls = await Promise.all(product.hotspots.map(async (hotspot) => {
        const url = URL.createObjectURL(hotspot.media);
        return url;
      }));
      setHotspotMediaUrls(urls);
    };
    getMediaUrlsFromBlobs();
  }, [product]);

  
  return (
    <>
      <DashedLine {...linePoints} />
      {isMediaPopupOpen && <FadeDialog isOpen={isMediaPopupOpen} onClose={() => setIsMediaPopupOpen(false)}><HotspotMediaPopup  mediaType={currentHotspot.mediaType} mediaUrl={hotspotMediaUrls[currentHotspotIndex]} /></FadeDialog>}
      <div
        ref={cardRef}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isLeftSide ? 'left-[5%]' : 'right-[5%]'
        } bg-[#0046c0] w-[26.25rem] h-[30rem] flex flex-col shadow-lg z-[10] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } overflow-hidden`}
      >
        <div className="p-8 h-[15rem] bg-[#0046c0]">
          <p className="m-0 text-base leading-relaxed text-white text-18 ">
            {currentHotspot.description[currentLanguage]}
          </p>
        </div>
        <div onClick={() => setIsMediaPopupOpen(true)} className="w-full h-[15rem] overflow-hidden">
          {currentHotspot.mediaType === 'image' ? (
            <img 
              src={hotspotMediaUrls[currentHotspotIndex]}
              alt={currentHotspot.name[currentLanguage]}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={hotspotMediaUrls[currentHotspotIndex]}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
}; 
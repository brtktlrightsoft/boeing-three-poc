import { useProductStore } from "../../store/productStore";
import { useEffect, useRef, useState } from "react";
import { DashedLine } from './DashedLine';

export const HotSpotCard = () => {
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [linePoints, setLinePoints] = useState({
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 }
  });

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

  return (
    <>
      <DashedLine {...linePoints} />
      <div
        ref={cardRef}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isLeftSide ? 'left-[5%]' : 'right-[5%]'
        } bg-[#0046c0] w-[310px] h-[350px] flex flex-col shadow-lg z-[1000] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } overflow-hidden`}
      >
        <div className="p-8 flex-grow bg-[#0046c0]">
          <p className="m-0 text-base leading-relaxed text-white font-semibold">
            {currentHotspot.description}
          </p>
        </div>
        <div className="w-full h-[175px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&auto=format&fit=crop"
            alt={currentHotspot.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}; 
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
        style={{
          position: 'absolute',
          ...(isLeftSide
            ? { left: '10%' }
            : { right: '10%' }),
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#0046c0',
          borderRadius: '0px',
          color: 'white',
          width: '310px',
          height: '350px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          opacity: isVisible ? 1 : 0,
          overflow: 'hidden',
        }}
      >
        <div style={{ 
          padding: '30px',
          flexGrow : "1",
          background: '#0046c0',
        }}>
          <p style={{ 
            margin: '0', 
            fontSize: '16px', 
            lineHeight: '1.5',
            color: 'white',
            fontWeight: '600',
          }}>
            {currentHotspot.description}
          </p>
        </div>
        <div style={{
          width: '100%',
          height: '175px',
          overflow: 'hidden',
        }}>
          <img 
            src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&auto=format&fit=crop"
            alt={currentHotspot.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </>
  );
}; 
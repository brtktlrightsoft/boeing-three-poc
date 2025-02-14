import { useProductStore } from "../../store/productStore";
import { useEffect, useRef, useState } from "react";

export const HotSpotCard = () => {
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isLeftSide = currentHotspotIndex % 2 === 0;

  useEffect(() => {
    // Fade out
    setIsVisible(false);
    
    // Fade in after position update
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Match the transition duration

    return () => clearTimeout(timer);
  }, [currentHotspotIndex]);

  useEffect(() => {
    const updateLine = () => {
      if (cardRef.current && lineRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const lineStartX = isLeftSide ? cardRect.right : cardRect.left;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const deltaX = screenCenterX - lineStartX;
        const deltaY = screenCenterY - cardCenterY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        lineRef.current.style.width = `${length}px`;
        lineRef.current.style.transform = `rotate(${angle}deg)`;
        lineRef.current.style.left = `${lineStartX}px`;
        lineRef.current.style.top = `${cardCenterY}px`;
        
        if (isLeftSide) {
          lineRef.current.style.background = 'linear-gradient(to right, #4a9eff, transparent)';
          lineRef.current.style.transformOrigin = 'left center';
        } else {
          lineRef.current.style.background = 'linear-gradient(to right, transparent, #4a9eff)';
          lineRef.current.style.transformOrigin = 'left center';
        }
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
      <div
        ref={cardRef}
        style={{
          position: 'absolute',
          ...(isLeftSide
            ? { left: '10%' }
            : { right: '10%' }),
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          color: 'white',
          width: '300px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', color: '#4a9eff' }}>
          {currentHotspot.name}
        </h3>
        <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.5' }}>
          {currentHotspot.description}
        </p>
        <div style={{ marginTop: '15px', fontSize: '12px', color: '#888' }}>
          <div>Position: {currentHotspot.cameraPosition.map(n => n.toFixed(2)).join(', ')}</div>
          <div>Target: {currentHotspot.cameraTarget.map(n => n.toFixed(2)).join(', ')}</div>
        </div>
      </div>
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          height: '2px',
          pointerEvents: 'none',
          zIndex: 999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </>
  );
}; 
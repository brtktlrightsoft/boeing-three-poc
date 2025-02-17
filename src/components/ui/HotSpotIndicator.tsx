import { useProductStore } from "../../store/productStore";

export const HotSpotIndicator = () => {
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);

  if (!product) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '40px',
        right: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        zIndex: 1000,
      }}
    >
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'end',
      }}>
        {product.hotspots.map((_, index) => (
          <div
            key={index}
            style={{
              width: '60px',
              height: '3px',
              backgroundColor: 'white',
              opacity: index === currentHotspotIndex ? 1 : 0.3,
              transition: 'opacity 0.3s ease',
            }}
          />
        ))}
      </div>
      <div style={{
        color: 'white',
        fontSize: '24px',
        fontWeight: '500',
        marginRight: '16px',
        textAlign: 'end',
        minHeight: '24px',
      }}>
        {product.hotspots[currentHotspotIndex]?.name}
      </div>
    </div>
  );
}; 
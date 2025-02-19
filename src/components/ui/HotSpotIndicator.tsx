import { useTranslation } from "react-i18next";
import { useProductStore } from "../../store/productStore";

export const HotSpotIndicator = () => {
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  if (!product) return null;

  return (
    <div className="absolute top-10 right-[5%] flex flex-col items-end gap-4 z-[1000]">
      <div className="flex gap-2 items-end">
        {product.hotspots.map((_, index) => (
          <div
            key={index}
            className={`w-[60px] h-[3px] bg-white transition-opacity duration-300 ${
              index === currentHotspotIndex ? 'opacity-100' : 'opacity-30'
            }`}
          />
        ))}
      </div>
      <div className="text-white text-2xl font-medium mr-4 text-right min-h-[24px]">
        {product.hotspots[currentHotspotIndex]?.name[currentLanguage]}
      </div>
    </div>
  );
}; 
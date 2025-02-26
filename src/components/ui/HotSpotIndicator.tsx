import { useTranslation } from "react-i18next";
import { useProductStore } from "../../store/productStore";

export const HotSpotIndicator = () => {
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  if (!product) return null;
  const isFreeMode = product.hotspots.length === currentHotspotIndex;
  return (
    <div className="absolute top-[5.4375rem] right-[4.6875rem] flex flex-col items-end gap-4 z-[1000]">
      <div className="flex gap-2 items-end">
        {product.hotspots.map((_, index) => (
          <div
            key={index}
            className={`w-[3.75rem] h-[4px] bg-white transition-opacity duration-300 ${index === currentHotspotIndex ? 'opacity-100' : 'opacity-30'
              }`}
          />
        ))}
        <div
          key={'free_mode_key'}
          className={`w-[3.75rem] h-[4px] bg-white transition-opacity duration-300 ${isFreeMode ? 'opacity-100' : 'opacity-30'
            }`}
        />
      </div>
      <div className="text-white text-35 font-medium mr-4 text-right min-h-[24px]">
        {isFreeMode ? t('freeMode') : product.hotspots[currentHotspotIndex]?.name[currentLanguage]}
      </div>
    </div>
  );
}; 
import { useEffect } from "react";
import { useCameraStore } from "../../store/cameraStore";
import { useProductStore } from "../../store/productStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const HotSpotNavigation = () => {
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);
  const setCurrentHotspotIndex = useProductStore((state) => state.setCurrentHotspotIndex);
  const updateCameraPosition = useCameraStore(
    (state) => state.updateCameraPosition
  );
  const updateCameraTarget = useCameraStore(
    (state) => state.updateCameraTarget
  );

  if (!product) return null;

  const handlePrevious = () => {
    setCurrentHotspotIndex(
      currentHotspotIndex === 0
        ? product.hotspots.length - 1
        : currentHotspotIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentHotspotIndex(
      currentHotspotIndex === product.hotspots.length - 1
        ? 0
        : currentHotspotIndex + 1
    );
  };

  useEffect(() => {
    const newPosition = product?.hotspots[currentHotspotIndex].cameraPosition;
    const newTarget = product?.hotspots[currentHotspotIndex].cameraTarget;
    if (newPosition && newTarget) {
      updateCameraPosition(newPosition);
      updateCameraTarget(newTarget);
    }
  }, [currentHotspotIndex, product, updateCameraPosition, updateCameraTarget]);

  return (
    <div className="absolute bottom-[120px] left-1/2 -translate-x-1/2 flex justify-center items-center gap-[400px]">
      <i
        onClick={handlePrevious}
        className="relative w-[80px] h-[80px] rounded-full border-[3px] border-white bg-transparent text-white cursor-pointer text-[45px] flex items-center justify-center  hover:bg-white/10 transition-colors"
      >
        <ChevronLeft className="w-18 h-18" />
      </i>
      <i
        onClick={handleNext}
        className="relative w-[80px] h-[80px] rounded-full border-[3px] border-white bg-transparent text-white cursor-pointer text-[45px] flex items-center justify-center  hover:bg-white/10 transition-colors"
      >
        <ChevronRight className="w-18 h-18" />
      </i>
    </div>
  );
};

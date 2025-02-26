import { useEffect } from "react";
import { useCameraStore } from "../../store/cameraStore";
import { useProductStore } from "../../store/productStore";
import LeftChevron from "../icons/left-chevron";
import RightChevron from "../icons/right-chevron";

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
        ? product.hotspots.length
        : currentHotspotIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentHotspotIndex(
      currentHotspotIndex === product.hotspots.length
        ? 0
        : currentHotspotIndex + 1
    );
  };

  useEffect(() => {
    if (product?.hotspots.length === currentHotspotIndex) return;
    const newPosition = product?.hotspots[currentHotspotIndex].cameraPosition;
    const newTarget = product?.hotspots[currentHotspotIndex].cameraTarget;
    if (newPosition && newTarget) {
      updateCameraPosition(newPosition);
      updateCameraTarget(newTarget);
    }
  }, [currentHotspotIndex, product, updateCameraPosition, updateCameraTarget]);

  return (
    <>
      <span
        onClick={handlePrevious}
        className="absolute left-[33%]  bottom-[16.75rem]  rounded-full bg-transparent text-white cursor-pointer text-[45px] flex items-center justify-center  hover:bg-white/10 transition-colors"
      >
        <LeftChevron />
      </span>
      <span
        onClick={handleNext}
        className="absolute  right-[33%] bottom-[16.75rem]  rounded-full bg-transparent text-white cursor-pointer text-[45px] flex items-center justify-center  hover:bg-white/10 transition-colors"
      >
        <RightChevron />
      </span>
    </>
  );
};

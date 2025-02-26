import { useEffect } from 'react';
import { useControlsStore } from '../../store/controlsStore';
import { useProductStore } from '../../store/productStore';

export const ControlsToggle = () => {
  const { enableControls, setEnableControls,toggleControls } = useControlsStore();
  const product = useProductStore((state) => state.product);
  const currentHotspotIndex = useProductStore((state) => state.currentHotspotIndex);
  const isFreeMode = product?.hotspots.length === currentHotspotIndex;

  useEffect(() => {
    setEnableControls(isFreeMode);
  }, [isFreeMode]);
  return null;
  return (
    <div className="absolute bottom-2 left-5 bg-black/70 p-2.5 rounded text-white font-mono text-sm z-[10]">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enableControls}
          onChange={toggleControls}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        Enable Pan & Zoom
      </label>
    </div>
  );
}; 
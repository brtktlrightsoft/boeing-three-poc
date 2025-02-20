import { useControlsStore } from '../../store/controlsStore';

export const ControlsToggle = () => {
  const { enableControls, toggleControls } = useControlsStore();

  return (
    <div className="absolute bottom-2 left-5 bg-black/70 p-2.5 rounded text-white font-mono text-sm z-[1000]">
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
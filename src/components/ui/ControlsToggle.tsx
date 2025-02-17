import { useControlsStore } from '../../store/controlsStore';

export const ControlsToggle = () => {
  const { enableControls, toggleControls } = useControlsStore();

  return (
    <div
      style={{
        position: 'absolute',
        top: '250px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        zIndex: 1000,
      }}
    >
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={enableControls}
          onChange={toggleControls}
        />
        Enable Pan & Zoom
      </label>
    </div>
  );
}; 
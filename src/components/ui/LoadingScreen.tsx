import { LoaderProps } from '../../types/viewer';

export const LoadingScreen = ({ isLoading, error }: LoaderProps) => {
  if (!isLoading && !error) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        fontSize: '1.5rem',
        zIndex: 1000,
      }}
    >
      {error ? (
        <div style={{ color: '#ff6b6b' }}>Error: {error}</div>
      ) : (
        <div className="loading-container">
          <div style={{ marginBottom: '1rem' }}>Loading 3D Model...</div>
          <div
            style={{
              width: '150px',
              height: '4px',
              background: '#2a2a2a',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '50%',
                height: '100%',
                background: '#4a9eff',
                borderRadius: '2px',
                animation: 'loading 1.5s infinite',
              }}
            />
          </div>
          <style>
            {`
              @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
}; 
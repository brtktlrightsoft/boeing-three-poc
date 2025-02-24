import { LoaderProps } from '../../types/viewer';

export const LoadingScreen = ({ isLoading, error }: LoaderProps) => {
  if (!isLoading && !error) return null;
  
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black/70 text-white text-2xl z-[1000]">
      {error ? (
        <div className="text-red-400">Error: {error}</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-4">Loading 3D Model...</div>
          <div className="w-[150px] h-1 bg-neutral-800 rounded overflow-hidden">
            <div className="w-1/2 h-full bg-blue-500 rounded animate-loading" />
          </div>
        </div>
      )}
    </div>
  );
}; 
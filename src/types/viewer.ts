export interface ModelViewerProps {
  modelUrl?: string;
  autoRotate?: boolean;
  backgroundColor?: string;
}

export interface ControlsProps {
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
}

export interface LoaderProps {
  isLoading: boolean;
  error?: string;
} 
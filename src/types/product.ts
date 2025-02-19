export interface Product {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  hotspots: Hotspot[];
  modelUrl: string;
}

export interface Hotspot {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}
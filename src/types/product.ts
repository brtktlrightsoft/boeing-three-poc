export interface Product {
  id: string;
  name: string;
  description: string;
  hotspots: Hotspot[];
  modelUrl: string;
}

export interface Hotspot {
  id: string;
  name: string;
  description: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}
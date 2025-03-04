
export interface Product {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  hotspots: Hotspot[];
  model: Blob;
  attractionVideo: Blob;
}

export interface ProductDto {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  hotspots: HotspotDto[];
  modelUrl: string;
  attractionVideoUrl: string;
}

export interface HotspotDto {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

export interface Hotspot {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  media:Blob;
  mediaType: 'image' | 'video';
}
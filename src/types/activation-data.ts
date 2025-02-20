import { Product, ProductDto } from "./product";

export interface ActivationDataDto {
  pin: string;
  deviceId: string;
  name: string;
  attractionVideoUrl: string;
  languages: Record<string, string>;
  products: ProductDto[];
}

export interface ActivationData {
  pin: string;
  deviceId: string;
  name: string;
  attractionVideo: Blob;
  languages: Record<string, string>;
  products: Product[];
}
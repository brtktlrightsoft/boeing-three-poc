import { Product } from "./product";

export interface ActivationData {
  pin: string;
  deviceId: string;
  name:string;
  attractionVideoUrl:string;
  languages:Record<string,string>;
  products:Product[];
}
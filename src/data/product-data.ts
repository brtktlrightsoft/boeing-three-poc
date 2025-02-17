import { Product } from "../types/product";
import modelUrl from '../assets/models/KC_46.glb?url';

export const mockProduct: Product = {
  id: "1",
  name: "Product 1",
  description: "Product 1 description",
  modelUrl: modelUrl,
  hotspots: [
    {
      id: "1",
      name: "Front View",
      description: "View of the aircraft's front section",
      cameraPosition: [2.92, 4.53, 31.64],
      cameraTarget: [-16.84, -7.26, 1.85],
    },
    {
      id: "2",
      name: "Side View",
      description: "View of the aircraft's right side",
      cameraPosition: [50, 10, 0],
      cameraTarget: [20, 5, 0],
    },
    {
      id: "3",
      name: "Top View",
      description: "Aerial view of the aircraft",
      cameraPosition: [0, 50, 0],
      cameraTarget: [0, 10, 0],
    },
    {
      id: "4",
      name: "Rear View",
      description: "View of the aircraft's tail section",
      cameraPosition: [0, 10, 40],
      cameraTarget: [0, 0, 0],
    },
  ],
};
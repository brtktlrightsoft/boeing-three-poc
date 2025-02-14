import { create } from "zustand";
import { Product } from "../types/product";

interface ProductState {
  product: Product | null;
  currentHotspotIndex: number;
  setProduct: (product: Product) => void;
  setCurrentHotspotIndex: (index: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  product: null,
  currentHotspotIndex: 0,
  setProduct: (product: Product) => set({ product }),
  setCurrentHotspotIndex: (index: number) => set({ currentHotspotIndex: index }),
}));

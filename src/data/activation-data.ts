import { ActivationData } from "../types/activation-data";
import { mockProduct } from "./product-data";

export const activationData: ActivationData = {
  pin: "1234",
  deviceId: "KC46-001",
  name: "Tokyo Tower",
  languages:{"en" : "English", "jp" : "日本語"} ,
  attractionVideoUrl: "https://videos.pexels.com/video-files/7456210/7456210-hd_1920_1080_25fps.mp4",
  products: [mockProduct]
};


import {  ProductDto } from "../types/product";

export const mockProduct: ProductDto = {
  id: "1",
  name: {
    en: "KC-46",
    jp: "KC-46"
  },
  description: {
    en: "Product 1 description",
    jp: "製品1の説明"
  },
  attractionVideoUrl: "https://videos.pexels.com/video-files/7456210/7456210-hd_1920_1080_25fps.mp4",
  modelUrl: "http://localhost:5173/models/KC_46.glb",
  hotspots: [
    {
      id: "1",
      name: {
        en: "Wing Air Refueling Pods",
        jp: "ウイング空中給油ポッド"
      },
      description: {
        en: "400 GPM Offload Rate with improved house response and improved fault detection and isolation.",
        jp: "改良されたハウスレスポンスと改良された故障検出および分離機能を備えた400 GPMオフロードレート。"
      },
      cameraPosition: [2.92, 4.53, 31.64],
      cameraTarget: [-16.84, -7.26, 1.85],
      mediaUrl: "https://videos.pexels.com/video-files/3657467/3657467-hd_1920_1080_30fps.mp4",
      mediaType: "video",
    },
    {
      id: "2",
      name: {
        en: "Side View",
        jp: "サイドビュー"
      },
      description: {
        en: "View of the aircraft's right side",
        jp: "航空機の右側の眺め"
      },
      cameraPosition: [50, 10, 0],
      cameraTarget: [20, 5, 0],
      mediaUrl: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&auto=format&fit=crop",
      mediaType: "image",
    },
    {
      id: "4",
      name: {
        en: "Rear View",
        jp: "リアビュー"
      },
      description: {
        en: "View of the aircraft's tail section",
        jp: "航空機の尾部セクションの眺め"
      },
      cameraPosition: [0.2, 10, 40],
      cameraTarget: [0, 0, 0],
      mediaUrl: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&auto=format&fit=crop",
      mediaType: "image",
    },
    {
      id: "3",
      name: {
        en: "Top View",
        jp: "トップビュー"
      },
      description: {
        en: "Aerial view of the aircraft",
        jp: "航空機の空撮図"  
      },
      cameraPosition: [0, 50, 0.5],
      cameraTarget: [0, 10, 0],
      mediaUrl: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&auto=format&fit=crop",
      mediaType: "image",
    },
  
  ],
};
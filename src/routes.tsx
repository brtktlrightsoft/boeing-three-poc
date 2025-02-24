import { createBrowserRouter } from "react-router-dom";
import { PinEntry } from "./components/pages/PinEntry";
import ViewProductPage from "./components/pages/ViewProductPage";
import { SelectLanguagePage } from "./components/pages/SelectLanguagePage";
import { ProtectedLayout } from "./components/layouts/ProtectedLayout";
import { AssetDownloaderPage } from "./components/pages/AssetDownloaderPage";
import { AttractionVideoPage } from "./components/pages/AttractionVideoPage";
import { SelectProductPage } from "./components/pages/SelectProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AttractionVideoPage />,
  },
  {
    path: "/pin-entry",
    element: <PinEntry />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/asset-downloader",
        element: <AssetDownloaderPage />,
      },
      {
        path: "/select-language",
        element: <SelectLanguagePage />,
      },
      {
        path: "/attraction",
        element: <AttractionVideoPage />,
      },
      {
        path: "/view-product",
        element: <ViewProductPage />,
      },
      {
        path: "/select-product",
        element: <SelectProductPage />,
      },
    ],
  },
]); 
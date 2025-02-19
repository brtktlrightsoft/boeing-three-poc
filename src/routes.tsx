import { createBrowserRouter } from "react-router-dom";
import { PinEntry } from "./components/pages/PinEntry";
import ViewProductPage from "./components/pages/ViewProductPage";
import { SelectLanguagePage } from "./components/pages/SelectLanguagePage";
import { ProtectedLayout } from "./components/layouts/ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PinEntry onComplete={(pin) => {
      localStorage.setItem("pin", pin);
      // Navigate to language selection after successful PIN entry
      console.log('PIN entered:', pin);
    }} />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/select-language",
        element: <SelectLanguagePage />,
      },
      {
        path: "/model-viewer",
        element: <ViewProductPage />,
      },
    ],
  },
]); 
import { useEffect, useState } from "react";
import { useProductStore } from "../../store/productStore";
import { ModelViewer } from "../viewer/ModelViewer";
import { BoeingLogo } from "../ui/BoeingLogo";

function ViewProductPage() {
  const product = useProductStore((state) => state.product);
  const [modelUrl, setModelUrl] = useState<string>('');

  useEffect(() => {
    if (product?.model) {
      // Create URL from Blob
      const url = URL.createObjectURL(product.model);
      setModelUrl(url);
      // Cleanup URL on unmount or when product changes
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [product]);

  if (!modelUrl) return null;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BoeingLogo />
      <ModelViewer
        modelUrl={modelUrl}
        autoRotate={true}
        backgroundColor="#1a1a1a"
      />
    </div>
  );
}

export default ViewProductPage;

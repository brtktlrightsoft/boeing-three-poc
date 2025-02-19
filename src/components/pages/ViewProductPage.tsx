import { useEffect } from "react";
import { useProductStore } from "../../store/productStore";
import { mockProduct } from "../../data/product-data";
import { ModelViewer } from "../viewer/ModelViewer";

function ViewProductPage() {
  const setProduct = useProductStore((state) => state.setProduct);
  const product = useProductStore((state) => state.product);
  useEffect(() => {
    setProduct(mockProduct);
  }, [setProduct]);
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
      <ModelViewer
        modelUrl={product?.modelUrl}
        autoRotate={true}
        backgroundColor="#1a1a1a"
      />
    </div>
  );
}

export default ViewProductPage;

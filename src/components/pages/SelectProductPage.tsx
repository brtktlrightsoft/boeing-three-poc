import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { BoeingLogo } from "../ui/BoeingLogo";
import { activationStorage } from "../../config/storage";
import { ActivationData } from "../../types/activation-data";
import { useProductStore } from "../../store/productStore";
import { useTranslation } from "react-i18next";

export const SelectProductPage = () => {
  const [products, setProducts] = useState<ActivationData["products"]>([]);
  const navigate = useNavigate();
  const setProduct = useProductStore((state) => state.setProduct);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadProducts = async () => {
      const pin = localStorage.getItem("pin");
      if (!pin) {
        navigate("/pin-entry", { replace: true });
        return;
      }

      try {
        const data = await activationStorage.getItem<ActivationData>(pin);
        if (data?.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        navigate("/pin-entry", { replace: true });
      }
    };

    loadProducts();
  }, [navigate]);

  const handleProductSelect = (productIndex: number) => {
    setProduct(products[productIndex]);
    navigate("/view-product");
  };

  return (
    <div className="min-h-screen w-screen bg-neutral-900 relative">
      <BoeingLogo />
      
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Select Product
          </h1>
        </div>
        
        <div className="flex overflow-x-auto px-8 pb-4 gap-6 snap-x snap-mandatory">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="snap-center shrink-0 first:ml-[calc(50%-216px)] last:mr-[calc(50%-216px)]"
            >
              <Card className="w-[400px] bg-white/10 backdrop-blur-sm border border-white/20">
                <CardBody>
                  <div className="flex flex-col gap-4 items-center text-white">
                    <h2 className="text-2xl font-semibold">
                      {product.name[currentLanguage]}
                    </h2>
                    <p className="text-sm opacity-80 text-center">
                      {product.description[currentLanguage]}
                    </p>
                    <Button
                      variant="solid"
                      color="primary"
                      size="lg"
                      onPress={() => handleProductSelect(index)}
                      className="w-full mt-4"
                    >
                      View Model
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoeingLogo } from "../ui/BoeingLogo";
import { activationStorage } from "../../config/storage";
import { ActivationData } from "../../types/activation-data";
import { useProductStore } from "../../store/productStore";
import { useTranslation } from "react-i18next";
import { Scrollbar } from "react-scrollbars-custom";

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
    navigate("/select-language");
  };

  return (
    <div className="min-h-screen w-screen relative">
      <BoeingLogo />

      <div className="absolute bottom-[10.40625rem] left-0 right-0 ">
        <Scrollbar
          style={{ width: "100%", height: "43.75rem" }}
          thumbXProps={{
            renderer: props => {
              const { elementRef, ...restProps } = props;
              return (
                <div
                  {...restProps}
                  ref={elementRef}
                  style={{
                    ...props.style,
                    background: "#fff",
                    borderRadius: "0px",
                  }}
                />
              );
            }
          }}
          trackXProps={{
            renderer: props => {
              const { elementRef, ...restProps } = props;
              return <div {...restProps} ref={elementRef} 
              style={{ ...props.style, background: "rgba(255, 255, 255, 0.3)", borderRadius: "0px", width:'calc(100% - 12.5rem)', left:'unset', right:'0.625rem',bottom:0 }} />;
            }
          }}
        >
          <div className="flex gap-6">
            {[products, products, products, products, products].flat().map((product, index) => (
              <div
                onClick={() => handleProductSelect(index)}
                key={index}
                className="cursor-pointer shrink-0 first:ml-[12.5rem] last:pr-[6.25rem]"
              >
                <div className="flex flex-col gap-[2.375rem] items-center">
                  <div className="w-[24.0625rem] h-[32.6875rem] bg-blue-700/50 rounded-lg overflow-hidden">
                    <img
                      src="https://picsum.photos/385/523"
                      alt={product.name[currentLanguage]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-white text-25 font-semibold uppercase">
                    {product.name[currentLanguage]}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}; 
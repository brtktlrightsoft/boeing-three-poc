import { useTranslation } from "react-i18next";
import { useProductStore } from "../../store/productStore";
import { HomeButton } from "./HomeButton";
import { ProductName } from "./ProductName";

export const HomeNavigation = () => {
  const product = useProductStore((state) => state.product);
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  if (!product) return null;

  return (
    <div className="absolute z-50 bottom-[90px] left-[50%] -translate-x-1/2 flex gap-[30px] items-center px-8">
      <HomeButton />
      <ProductName name={product.name[currentLanguage]} />
    </div>
  );
}; 
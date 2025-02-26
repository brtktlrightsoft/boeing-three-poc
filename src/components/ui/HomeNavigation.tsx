import { useProductStore } from "../../store/productStore";
import { HomeButton } from "./HomeButton";

export const HomeNavigation = () => {
  const product = useProductStore((state) => state.product);

  if (!product) return null;

  return (
    <div className="absolute z-50 bottom-[84px] left-[50%] -translate-x-1/2 flex gap-[30px] items-center px-8">
      <HomeButton />
      {/* <ProductName name={product.name[currentLanguage]} /> */}
    </div>
  );
}; 
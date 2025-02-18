interface ProductNameProps {
  name: string;
}

export const ProductName = ({ name }: ProductNameProps) => {
  return (
    <div className="flex items-center justify-center min-w-[120px] h-[64px] bg-white/90 rounded-full px-8">
      <span className="text-black font-medium text-lg">{name}</span>
    </div>
  );
}; 
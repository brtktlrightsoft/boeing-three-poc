import { Home } from "lucide-react";

export const HomeButton = () => {
  return (
    <div className="cursor-pointer bg-transparent flex items-center justify-center w-[120px] h-[64px] border-2 border-white rounded-full py-4">
      <Home className="w-10  h-10 text-white" />
    </div>
  );
}; 
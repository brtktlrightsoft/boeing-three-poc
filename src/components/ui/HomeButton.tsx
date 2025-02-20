import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/attraction")} className="relative z-60 cursor-pointer bg-transparent flex items-center justify-center w-[120px] h-[64px] border-2 border-white rounded-full py-4">
      <Home className="w-10  h-10 text-white" />
    </div>
  );
}; 
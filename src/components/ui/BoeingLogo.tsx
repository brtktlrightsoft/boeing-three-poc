import logo from "../../assets/images/boeing_white.png";

export const BoeingLogo = () => {
  return (
    <div className="absolute top-8 left-8 z-[1000]">
      <img 
        src={logo} 
        alt="Boeing Logo" 
        className="w-[450px] h-auto"
      />
    </div>
  );
}; 
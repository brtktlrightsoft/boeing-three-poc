import logo from "../../assets/images/boeing_white.png";

export const BoeingLogo = () => {
  return (
    <div className="absolute top-[3.625rem] left-[4.125rem] z-[10]">
      <img 
        src={logo} 
        alt="Boeing Logo" 
        className="w-[23.1875rem] h-auto"
      />
    </div>
  );
}; 
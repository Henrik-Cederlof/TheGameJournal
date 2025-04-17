import { useEffect, useState } from "react";
import controllerIcon from "../../assets/icons/controller.png";
import joystickIcon from "../../assets/icons/joystick.png";

const Logo = () => {
  const icons = {
    controller: controllerIcon,
    joystick: joystickIcon,
  };

  const [spinningIcon, setSpinningIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinningIcon((prev) => (prev + 1) % 4);
    }
    , 1000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 w-20">
      <img 
      src={icons.controller} 
      alt="Controller Icon" 
      className={`h-8 w-8 ${spinningIcon === 0 ? "animate-spin" : ""}`} 
      />
      <img 
      src={icons.joystick}
      alt="Joystick Icon" 
      className={`h-8 w-8 ${spinningIcon === 1 ? "animate-spin" : ""}`}
      />
      <img 
      src={icons.joystick} 
      alt="Joystick Icon" 
      className={`h-8 w-8 ${spinningIcon === 2 ? "animate-spin" : ""}`}
      />
      <img 
      src={icons.controller} 
      alt="Controller Icon" 
      className={`h-8 w-8 ${spinningIcon === 3 ? "animate-spin" : ""}`}

      />
  
    </div>
  );
}


export default Logo;
import { useEffect } from "react"
import { ToastMessageType } from "../../Types";


const ToastMessage: React.FC<ToastMessageType> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [onClose]);

  const getToastClass = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${getToastClass()}`}>
      <h2 className="font-bold">{message}</h2>
      <button onClick={onClose} className="absolute top-2 right-2 text-white">X</button>
    </div>
  );

}

export default ToastMessage;

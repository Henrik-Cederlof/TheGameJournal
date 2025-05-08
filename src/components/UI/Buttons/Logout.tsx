import { useContext } from "react";
import {OverLord} from "../../../contexts/Provider";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useContext(OverLord);
  const navigate = useNavigate();
  
  const Logout = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  return (
    <button
      onClick={Logout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}


export default LogoutButton;
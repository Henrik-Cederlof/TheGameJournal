import { useContext, useState } from "react";
import { OverLord } from "../contexts/Provider";
import { ChevronRight } from "lucide-react"; 
import { Link } from "react-router-dom";
import OwnedGames from "../components/OwnedGames";
import ActiveGames from "../components/ActiveGames";
import CompletedGames from "../components/CompletedGames";



const Profile = () => {
  const { user } = useContext(OverLord)
  const [open, setOpen] = useState(false)


  if (!user) return <div className="flex flex-col h-screen bg-gray-200 justify-center items-center">
  <h1 className="font-bold text-[2rem] text-gray-500 animate-bounce">Please Log in to see your games.</h1>
  <Link 
  to="/login" className="text-black underline text-xl mt-5">
    Click here to login
    </Link>
    </div>;

  return (
    <div className="flex flex-col w-screen h-screen items-center p-4 mt-40">

      <h1 className="text-4xl text-gray-600 font-bold mb-4 text-start">My Completionist Collection</h1>

     
    <OwnedGames/>
    <ActiveGames/>
    <CompletedGames/>

   
     
    
    </div>

    
  );
}
export default Profile;
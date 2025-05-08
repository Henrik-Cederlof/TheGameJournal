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

      <h1 className="text-4xl font-bold mb-4 text-center">My Completionist Collection</h1>

     
    <OwnedGames/>
    <ActiveGames/>
    <CompletedGames/>

    <div className="w-full mx-auto">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-gray-200 px-4 py-3 cursor-pointer rounded-t-xl"
      >
        <h2 className="font-semibold text-gray-800 text-center">Completed Games ✔</h2>
        <ChevronRight
          className={`transition-transform duration-300 ${
            open ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>
     
      <div
        className={`flex flex-row overflow-auto transition-all duration-300  px-4 hover:bg-black/20 ${
          open ? "max-h-96 py-4  border-t-0 rounded-b-xl" : "max-h-0"
        }`}
      >
     
      </div>
    </div>

    </div>
  );
}
export default Profile;
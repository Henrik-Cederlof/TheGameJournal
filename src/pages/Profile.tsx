import { useContext, useEffect, useState } from "react";
import { Game } from "../Types";
import { OverLord } from "../Provider";
import { ChevronRight } from "lucide-react"; 
import GameCard from "../components/UI/GameCard";
import { Link } from "react-router-dom";
import OwnedGames from "../components/OwnedGames";
//TODO - Add profile picture upload functionality
//TODO - Add user information display functionality


const Profile = () => {
  const { user } = useContext(OverLord)
  const [myGames, setMyGames] = useState<Game[]>([])
  const [gameCompleted, setGamesCompleted] = useState<Game[]>([])
  const [open, setOpen] = useState(false)


  const fetchGames = async () => {
    if (user) {
      try {
        const response = await fetch(`/api/userGames/${user.id}`);
        if (!response.ok) throw new Error("Fetching Game failed!? :(");
        const data = await response.json();
        setMyGames(data);
        console.log("User ID:", user?.id);
      } catch (error) {
        console.error("Error fetch usergames:", error);
      }
    }
  };
    useEffect(() => {
    fetchGames();
  }, [user]); 

  


  
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

      <div className="w-full mx-auto">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-gray-200 px-4 py-3 cursor-pointer rounded-t-xl"
      >
        <h2 className="font-semibold text-gray-800 text-center">Owned Games</h2>
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
    <OwnedGames/>
    
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
       {gameCompleted.map((game) => (
         <div key={game.id} className="flex-shrink-0 w-64 p-4 m-1">
           <GameCard game={{
                id: game.id,
                name: game.name,
                cover: game.cover,
                summary: game.summary,
                platforms: game.platforms,
                completionist: game.completionist,
                addedDate: game.addedDate,
                personalNote: game.personalNote,
                _id: game._id
              }} {...game} />
       

      </div>
       ))}
      </div>
    </div>

    </div>
  );
}
export default Profile;
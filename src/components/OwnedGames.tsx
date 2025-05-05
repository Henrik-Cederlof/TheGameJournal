import { useContext, useEffect, useState } from "react"
import { OverLord } from "../Provider"
import { Game } from "../Types"
import GameCard from "./UI/GameCard"
import { ChevronRight } from "lucide-react"
import SideScroll from "./Functions/SideScroll"
import DeleteGame from "./UI/Buttons/DeleteGame"


const OwnedGames = () => {
  const {user} = useContext(OverLord)
  const [myGames, setMyGames] = useState<Game[]>([])
  const [open, setOpen] = useState(false)
  const [gameCompleted, setGamesCompleted] = useState<Game[]>([])




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

  const toggleComplete = async (gameId: string, currentStatus: boolean) => {
    if (user) {
      try {
        await fetch(`/api/userGames/${user.id}/update/${gameId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completionist: !currentStatus,
          }),
        });
        const updatedGames  = await fetch(`/api/userGames/${user.id}`);
        if (!updatedGames.ok) throw new Error("Failed REFETCHING GAME")
          const updatedGamesData  = await updatedGames .json();

          const completed = updatedGamesData.filter((game:Game) => game.completionist);
          const inProgress = updatedGamesData.filter((game:Game) => !game.completionist);

          setGamesCompleted(completed);
          setMyGames(inProgress);
        
      } catch (error) {
        console.log("Error update completionist status for GAMES !")
      }
    }
  };

  return (
    <div className="w-full mx-auto">
    <div
      onClick={() => setOpen(!open)}
      className="flex items-center justify-between bg-gray-200 px-4 py-3 cursor-pointer rounded-t-xl"
    >
      <h2 className="font-semibold text-gray-800 text-center">Games in progress</h2>
      <ChevronRight
        className={`transition-transform duration-300 ${
          open ? "rotate-90" : "rotate-0"
        }`}
      />
    </div>

    <div className={`flex flex-row overflow-auto transition-all duration-300  px-4 hover:bg-black/20 ${
        open ? "max-h-full py-4  border-t-0 rounded-b-xl" : "max-h-0"
      }`}>
    <SideScroll >
    {myGames.map((game) => (
      <div key={game.id} 
      className="flex-shrink-0 w-64 p-4 m-1">
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
    
        <p>Completed: {game.completionist ? "✔" : "❌"}</p>
        <button
        onClick={() => toggleComplete(game._id, game.completionist)}
        className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
        >
          Completed?
        </button>
        <DeleteGame
        gameId={game._id}
        onDelete={fetchGames}/>
      </div>
      
    ))}
  </SideScroll>
  </div>
  </div>
  )

}

export default OwnedGames;
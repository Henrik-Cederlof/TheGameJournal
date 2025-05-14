import { useState } from "react"
import GameCard from "./UI/GameCard"
import { ChevronRight } from "lucide-react"
import SideScroll from "./Functions/SideScroll"
import DeleteGame from "./UI/Buttons/DeleteGame"
import ToggleComplete from "./UI/Buttons/CompleteToggle"
import { useGameContext } from "../contexts/GameContext"


const ActiveGames = () => {
  const { myActiveGames, fetchGames} = useGameContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full mx-auto mt-5">
    <div
      onClick={() => setOpen(!open)}
      className="flex items-center justify-start w-300 bg-linear-to-r from-gray-200 to-gray-300 px-4 py-3 cursor-pointer rounded-t-xl"
    >
      <h2 className="font-semibold text-gray-800 text-center">Games Active</h2>
      <ChevronRight
        className={`transition-transform duration-300 ${
          open ? "rotate-90" : "rotate-0"
        }`}
      />
    </div>

    <div className={`flex flex-row overflow-auto transition-all duration-300  px-4 mr-20 ml-20 ${
        open ? "max-h-full py-4  border-t-0 rounded-b-xl" : "max-h-0"
      }`}>
    <SideScroll >
    {myActiveGames.map((game) => (
      <div key={game.gameId} 
      className="flex-shrink-0 w-64 p-4 m-1 hover:z-10 cursor-pointer transition-transform duration-600 ease-in-out hover:scale-105">
                 <GameCard game={{
              gameId: game.gameId,
              name: game.name,
              rating: game.rating,
              cover: game.cover,
              summary: game.summary,
              platforms: game.platforms,
              isCompleted: game.isCompleted,
              IsActive: game.IsActive,
              addedDate: game.addedDate,
              personalNote: game.personalNote,
              _id: game._id,
            }} {...game} />
    
        <p>Completed: {game.isCompleted ? "✔" : "❌"}</p>
        <ToggleComplete
              id={game.gameId}
              completionist={game.isCompleted}
              
            />
        <DeleteGame
        gameId={game.gameId}
        onDelete={fetchGames}/>
      </div>
      
    ))}
  </SideScroll>
  </div>
  </div>
  )

}

export default ActiveGames;
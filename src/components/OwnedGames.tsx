import { useContext, useState } from "react"
import GameCard from "./UI/GameCard"
import { ChevronRight } from "lucide-react"
import SideScroll from "./Functions/SideScroll"
import { useGameContext } from "../contexts/GameContext"
import { Game } from "../Types"
import UserGameModal from "./UserGameModal"
import { OverLord } from "../contexts/Provider"


const OwnedGames = () => {
  const { user } = useContext(OverLord)
  const { myGames, fetchGames} = useGameContext();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [open, setOpen] = useState(false);

  const handleSaveNote = async (note: string) => {
    if (selectedGame) {
      try {
          await fetch(`/api/userGames/${user?.id}/myGames/${selectedGame.gameId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ personalNote: note }),
        });

        fetchGames();
      } catch (error) {
        console.error("Gick inte att spara P-Note i från OWNEDGAMES", error);
      }
    }
  };


  return (
    <div className="w-full mx-auto">
    <div
      onClick={() => setOpen(!open)}
      className="flex items-center justify-start w-300 bg-linear-to-r from-gray-200 to-gray-300 px-4 py-3 cursor-pointer rounded-t-xl"
    >
      <h2 className="font-semibold text-gray-800 text-center">Owned Games</h2>
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
    {myGames.map((game) => (
      <div key={game.gameId} 
      onClick={() => setSelectedGame(game)}
      className="flex-shrink-0 w-64 ml-5 mr-5 hover:z-10 cursor-pointer transition-transform duration-600 ease-in-out hover:scale-105">
                 <GameCard game={{
              gameId: game.gameId,
              name: game.name,
              cover: game.cover,
              summary: game.summary,
              platforms: game.platforms,
              isCompleted: game.isCompleted,
              IsActive: game.IsActive,
              addedDate: game.addedDate,
              personalNote: game.personalNote,
              _id: game._id,
            }} {...game} />
    
 
      </div>
      
    ))}
  </SideScroll>
  </div>
        {selectedGame && (
        <UserGameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onSave={handleSaveNote}
        />
      )}
  </div>
  )

}

export default OwnedGames;
import { Game } from "../Types";
import DeleteGame from "./UI/Buttons/DeleteGame";
import ReadOnlyRating from "./ReadOnlyRating.";

const CompletedGameModal = ({ game, onClose, onSave }: { game: Game; onClose: () => void; onSave: (note: string) => void }) => {


  function fetchGames(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
         <p className="text-end">Completed: {game.isCompleted ? "✅" : "❌"}</p>
        <DeleteGame
        gameId={game.gameId}
        onDelete={fetchGames}/>
        <h2 className="text-xl font-bold mb-4">{game.name}</h2>
        <img src={game.cover?.url?.replace("t_thumb", "t_cover_big")} alt={game.name} className="w-full rounded-md mb-4" />

        <p><strong>Note:</strong> {game.personalNote || "Ingen anteckning"}</p>

        <div className="flex items-center mb-4">
        <ReadOnlyRating rating={game.rating ?? 0} />
        </div>
        <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer hover:bg-gray-500">Close</button>

        </div>
      </div>
    </div>
  );
};

export default CompletedGameModal;
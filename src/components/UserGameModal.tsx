import { use, useContext, useState } from "react";
import { Game } from "../Types";
import Rating from "./Rating";
import ToggleComplete from "./UI/Buttons/CompleteToggle";
import DeleteGame from "./UI/Buttons/DeleteGame";
import { OverLord } from "../contexts/Provider";

const UserGameModal = ({ game, onClose, onSave }: { game: Game; onClose: () => void; onSave: (note: string) => void }) => {
  const [personalNote, setPersonalNote] = useState(game.personalNote || "");
  const { user } = useContext(OverLord);
  const handleSave = () => {
    onSave(personalNote);
    onClose(); 
  };

  const saveRatingToDatabase = async (userId: string, gameId: string, rating: number) => {
  try {
    await fetch(`/api/userGames/${userId}/myGames/${gameId}/rating`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating }),
    });
    console.log(`Betyg ${rating} sparat för spel ${gameId}`);
  } catch (error) {
    console.error('Kunde inte spara betyget:', error);
  }
};

const handleSaveRating = (gameId: string, rating: number) => {
  if (user) {
    saveRatingToDatabase(user.id, gameId, rating);
  }
};


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

        <textarea
          value={personalNote}
          onChange={(e) => setPersonalNote(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Write your personal note here..."
        />
        <div className="flex items-center mb-4">
          <label className="mr-2">Rating:</label>
          <Rating gameId={game.gameId} saveRating={handleSaveRating}/>
        </div>
        <div className="flex justify-end space-x-2">
                  
            <ToggleComplete
            id={game.gameId}
            completionist={game.isCompleted}/>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserGameModal;
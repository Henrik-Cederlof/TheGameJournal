import { useContext } from "react";
import { OverLord } from "../../../Provider";

type DeleteGameProps = {
  gameId: string;
  onDelete: () => void;
};

const DeleteGame = ({ gameId, onDelete }: DeleteGameProps) => {
  const { user } = useContext(OverLord);

  const handleDelete = async () => {
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:3001/api/userGames/${user.id}/delete/${gameId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete game");
      }

      console.log("Game deleted!");
      onDelete(); 
    } catch (error) {
      console.error("Error removing game", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition"
    >
      🗑 Delete
    </button>
  );
};

export default DeleteGame;

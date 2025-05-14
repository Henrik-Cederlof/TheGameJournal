import React from "react";
import { useGameContext } from "../../../contexts/GameContext";

interface ToggleCompleteProps {
  id: string;
  completionist: boolean;
}

const ToggleComplete: React.FC<ToggleCompleteProps> = ({ id, completionist }) => {
  const { toggleComplete } = useGameContext();

  return (
    <button
      onClick={() => toggleComplete(id)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {completionist ? "Mark as Incomplete" : "Mark as Complete"}
    </button>
  );
};

export default ToggleComplete;
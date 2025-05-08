import { Game } from "../Types";
interface P {
  game: Game;
  onClose: () => void;
}


const GameModal: React.FC<P> = ({ game, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-2 scale-200 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>
        <img src={game.cover?.url?.replace("t_thumb", "t_cover_big")} alt={game.name} className="w-full rounded-md mb-4" />
        <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
        <p className="text-gray-700">{game.summary}</p>
        <p className="text-gray-500 mt-2">Platforms: {game.platforms}</p>
      </div>
    </div>
  );
};

export default GameModal;
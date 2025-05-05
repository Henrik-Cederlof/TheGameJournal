import { Game } from "../../Types";

const GameCard = ({ game }: { game: Game }) => {
  const highResCoverUrl = game.cover?.url.replace(/t_thumb/, "t_cover_big");

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const savedGame = { game };
    e.dataTransfer.setData("application/json", JSON.stringify(savedGame));};

    return (
      <div
        draggable="true"
        onDragStart={handleDrag}
        className="relative w-[250px] h-[350px] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all"
      >
        <img
          src={highResCoverUrl}
          alt={game.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
  
        <div className="absolute bottom-0 w-full bg-black/60 text-white p-3">
          <h3 className="text-lg font-bold">{game.name}</h3>
          <p className="text-sm">Platforms: {game.platforms?.join(", ")}</p>
        </div>
      </div>
    );
  };

export default GameCard;
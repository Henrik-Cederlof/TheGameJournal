import { Game } from "../../Types";
import AddGame from "./Buttons/AddGame";

const GameCard = ({ name, cover }: Game) => {
  const highResCoverUrl = cover?.url.replace(/t_thumb/, "t_cover_big");

  return (
    <div className="relative flex flex-col items-center w-full rounded-xl transition-all duration-600 overflow-hidden max-h-[400px] hover:max-h-[1000px] max-w-sm shadow-lg bg-white p-4 m-4 hover:z-10 hover:scale-105">
      <h3 className="text-lg font-bold">{name}</h3>

      <div className="flex flex-col items-center w-full h-full mt-4">
        <img
          src={highResCoverUrl}
          alt={name}
          className="w-full h-auto object-cover rounded-xl"
        />
   

       
      </div>
    </div>
  );
};

export default GameCard;
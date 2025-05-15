import { useEffect, useState } from "react";
import { Game } from "../Types";
import GameCard from "../components/UI/GameCard";
import GameModal from "../components/GameModal";
import SearchInput from "../components/Searchbar";

const Games = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDragging, setIsDragging] = useState(false)

  const fetchRandomGames = async () => {
    const randomOffset = Math.floor(Math.random() * 1000);
      const query = `
        fields name, summary, cover.url; 
        where cover != null & summary != null; 
        sort popularity desc;
        offset ${randomOffset}; 
        limit 100;
      `;

    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setGames(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fel vid hämtning av spel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomGames();
  }, []);

  const handleSearch = async (searchResults: Game[]) => {
    setGames(searchResults);
  };
 
  return (
    <div className="flex flex-col items-center p-4 mt-40">
      <SearchInput onSearch={handleSearch} />
 
      {loading ? (
        <p>LOADING GAMES PLEASE WAIT...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-40">
          {games.map((game, gameId) => (
            <div 
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/json", JSON.stringify(game))
              setIsDragging(true)
            }}
            className="cursor-grab"
            key={game.gameId} 
            onClick={() => setSelectedGame(game)}
            
            >
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
        </div>
        
      )}

      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
};

export default Games;

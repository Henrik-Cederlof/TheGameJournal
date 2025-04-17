import { useEffect, useState } from "react";
import { Game } from "../Types"; 
import GameCard from "./UI/GameCard";



const IGDBGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);


  const randomOffset = Math.floor(Math.random() * 1000);
  const query = `
    fields name, summary, cover.url; 
    where cover != null & summary != null; 
    sort popularity desc;
    offset ${randomOffset}; 
    limit 20;
  `;


 useEffect(() => {
    const fetchIGDBData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
          }),
        });

        const data = await response.json();
        console.log(data); // Logga datan för att se vad som returneras

        // Kontrollera om datan är en array innan du sätter den i state
        setGames(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fel vid hämtning från IGDB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIGDBData();
  }, []);


  if (loading) return (
    <p>"Laddar..."</p>
  );

  return (
    <>
    {games.map((game) => (
      <GameCard key={game.id} {...game} />
    ))}
  </>

  );
};

export default IGDBGames;

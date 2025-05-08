import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "../Types";
import { OverLord } from "./Provider";


interface GameContextProps {
  myGames: Game[];
  myActiveGames: Game[];
  myCompletedGames: Game[];
  fetchGames: () => Promise<void>;
  fetchActiveGames: () => Promise<void>;
  fetchCompletedGames: () => Promise<void>;
  toggleComplete: (gameId: string) => Promise<void>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameOverlord: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(OverLord);
  const [myGames, setMyGames] = useState<Game[]>([]);
  const [myActiveGames, setMyActiveGames] = useState<Game[]>([]);
  const [myCompletedGames, setMyCompletedGames] = useState<Game[]>([]);
  

  const fetchGames = async () => {
    if (user && user.id) {  
      try {
        const response = await fetch(`/api/userGames/${user.id}`);
        if (!response.ok) throw new Error("Fetching Game failed!? :(");
        const data = await response.json();
        setMyGames(data);
        console.log("User ID:", user.id); 
      } catch (error) {
        console.error("Error fetch usergames:", error);
      }
    } 
  };
  
  const fetchActiveGames = async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`/api/userGames/${user.id}/active`);
        if (!response.ok) throw new Error("Fetching Active Games failed!? :(");
        const data = await response.json();
        setMyActiveGames(data);
      } catch (error) {
        console.error("Error fetch active games:", error);
      }
    }
  }

  const fetchCompletedGames = async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`/api/userGames/${user.id}/completed`);
        if (!response.ok) throw new Error("Fetching Completed Games failed!? :(");
        const data = await response.json();
        setMyCompletedGames(data);
      } catch (error) {
        console.error("Error fetch completed games:", error);
      }
    }
  }

const toggleComplete = async (gameId: string) => {
  if (user) {
    try {
      
      const response = await fetch(`/api/userGames/${gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }), 
      });


      if (!response.ok) {
        console.error(`Error moving game: ${response.status} ${response.statusText}`);
        return;
      }

      await fetchGames();
      await fetchActiveGames();
      await fetchCompletedGames();
    } catch (err) {
      console.error('Error moving game to completed:', err);
    }
  }
};

  useEffect(() => {
    fetchGames();
    fetchActiveGames();
    fetchCompletedGames();
  }, [user]);

  return (
    <GameContext.Provider value={{ myGames, myActiveGames, myCompletedGames, fetchGames, fetchActiveGames, fetchCompletedGames , toggleComplete }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
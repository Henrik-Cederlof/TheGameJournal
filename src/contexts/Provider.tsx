import { createContext, useEffect, useState } from "react";
import { UserContextType, UserData } from "../Types";

export const OverLord = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const pUser = JSON.parse(storedUser);
      setUser(pUser);
      setIsLoggedIn(true);
    }
  }, []);


  const login = (userData:UserData) => { 
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  const logout = () => { 
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    
  }


  return (
    <OverLord.Provider value={{ user,isLoggedIn: !!user, login, logout }}>
      {children}
    </OverLord.Provider>
  );
}

export default Provider;
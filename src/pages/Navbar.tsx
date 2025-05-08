import Logo from "../components/UI/Logo";
import Profile from "../assets/icons/profile.png";
import { OverLord } from "../contexts/Provider";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import LogoutButton from '../components/UI/Buttons/Logout';
import { useGameContext } from "../contexts/GameContext";

const Navbar = () => {

  const { user, isLoggedIn } = useContext(OverLord)
  const { myGames, myActiveGames, myCompletedGames, fetchGames } = useGameContext()

  const MenuBtns = [
    { name: "HOME", 
      path: "/" 
    },
    {
      name: "GAMES",
      path: "/games",
    },
    {
      name: "ABOUT",
      path: "/about",
    },
  ];
  if (isLoggedIn) {
    MenuBtns.push({ name: "PROFILE", path: "/profile" });
  }
 

  const gameDropdownBtns = [
    { name: "Popular Games", path: "/games/popular" },
    { name: "New Releases", path: "/games/new" },
    { name: "Top Rated", path: "/games/top-rated" },
  ];


  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, userId: string) => {
   
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const game = JSON.parse(data);
  
  
  
    try {
      const res = await fetch(`http://localhost:3001/api/userGames/${user?.id}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
      console.log(game)
  
      if (!res.ok) throw new Error("Failed to add game");
      console.log("Game added to profile!");
    } catch (err) {
      console.error(err);
    }
    fetchGames()
  };
  


  return (
    <nav className="fixed flex items-center p-2 top-0 w-full z-40 bg-[rgba(39, 97, 185, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div>
        <Logo />
        <LogoutButton/>
      </div>

      <div className="flex-grow flex justify-center items-center">
        {MenuBtns.map((btn, index) => (
          <div 
          key={index} 
          className="relative group drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
            {btn.name === "GAMES" ? (
              <div>
                <Link to={btn.path}>
                  <button className="text-gray-600 text-[1.2rem] hover:cursor-pointer hover:underline font-bold py-2 px-4 rounded mx-2">
                    {btn.name}
                  </button>
                </Link>

                
                <div className="absolute hidden group-hover:block bg-gray-200 min-w-[160px] shadow-lg rounded z-10">
                  {gameDropdownBtns.map((dropdownBtn, idx) => (
                    <Link
                      to={dropdownBtn.path}
                      key={idx}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {dropdownBtn.name}
                    </Link>
                  ))}
                </div>
              </div>

            ) : (
              <Link to={btn.path}>
                <button className="text-gray-600 text-[1.2rem]  hover:cursor-pointer hover:underline font-bold py-2 px-4 rounded mx-2">
                  {btn.name}
                </button>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div
  className="flex items-center justify-end hover:scale-105 transition-transform duration-300"
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    if(user?.id) handleDrop(e, user.id)
  }}
>
  <div className="flex flex-col p-5">
  <p >{(user?.firstname ?? "Not Signed in") + " " + (user?.lastname ?? "")}</p>
  <p>Owned:{myGames.length + myCompletedGames.length}</p>
  <p>Active:{myActiveGames.length}</p>
  <p>Completed:{myCompletedGames.length}</p>
  </div>
  <Link to="/profile">
    <img src={Profile} alt="profile" />
  </Link>
</div>

    </nav>
  );
};

export default Navbar;
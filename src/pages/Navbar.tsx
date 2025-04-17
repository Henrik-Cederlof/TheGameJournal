import Logo from "../components/UI/Logo";
import Profile from "../assets/icons/profile.png";

import { Link } from "react-router-dom";

const Navbar = () => {
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
    {
      name: "PROFILE",
      path: "/profile",
    }
  ]

  const gameDropdownBtns = [
    { name: "Popular Games", path: "/games/popular" },
    { name: "New Releases", path: "/games/new" },
    { name: "Top Rated", path: "/games/top-rated" },
  ];




  return (
    <nav className="fixed flex items-center p-2 top-0 w-full z-40 bg-[rgba(39, 97, 185, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div>
        <Logo />
      </div>

      <div className="flex-grow flex justify-center items-center">
        {MenuBtns.map((btn, index) => (
          <div 
          key={index} 
          className="relative group">
            {btn.name === "GAMES" ? (
              <div>
                <Link to={btn.path}>
                  <button className="text-gray-600 text-[1.2rem] hover:cursor-pointer hover:underline font-bold py-2 px-4 rounded mx-2">
                    {btn.name}
                  </button>
                </Link>

                {/* Dropdown här */}
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
                <button className="text-gray-600 text-[1.2rem] hover:cursor-pointer hover:underline font-bold py-2 px-4 rounded mx-2">
                  {btn.name}
                </button>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end hover:scale-105 transition-transform duration-300">
        <Link to="/profile">
          <img src={Profile} alt="" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
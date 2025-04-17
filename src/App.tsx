import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

//Pages
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Games from "./pages/Games";

import IGDBGames from "./components/IGDBGames";

function App() {
  return <Router>
    <div className="bg-gray-300 h-full flex flex-col">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </main>
    </div>
  </Router>;
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Provider from "./Provider";
//Pages
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return <Router>
    <Provider>
    <div className="bg-gray-300 h-full flex flex-col">
      <header className="mb-40">
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


        </Routes>
      </main>
    </div>
    </Provider>
  </Router>;
}

export default App;

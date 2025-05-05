import { useContext, useState } from "react";
import { OverLord } from "../Provider";
import ToastMessage from "../components/UI/ToastMessage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(OverLord);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{title: string, message: string, type: "success" | "error" | "info"} | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }); 

    const data = await response.json();
    console.log("Login response:", data);
    
    if (response.ok) {
      login(data.user); // Om login lyckas, spara användardata i context
      navigate("/profile");
      
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login
        <span className="text-gray-600"> to your Gaming Journal</span>
      </h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border rounded w-full py-2 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border rounded w-full py-2 px-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
   
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded">Login
        </button>
      </form>
      <p className="mt-4">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
    </div>
  );
};


export default Login;
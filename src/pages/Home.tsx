import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { OverLord } from  "../contexts/Provider";

const Home = () => {

  const { isLoggedIn, user } = useContext(OverLord);

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {isLoggedIn ? (
        // Visa detta om användaren är inloggad
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome back, {user?.firstname}!</h1>
          <p className="text-lg">Here is your personalized gaming journal.</p>
        </div>
      ) : (
        // Visa detta om användaren inte är inloggad
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to your Gaming Journal</h1>
          <p className="text-lg">We aim to bring you a platform where you can store all your games in one place.
          <br/>
         Currently, we are working on a feature that allows you to add games to your journal.
          <br />We are currently working on this feature, so please be patient with us.
          <br />In the meantime, feel free to explore our other features.
          </p>
          <br />
          <h6 className="text-lg">Please <Link to="/login" className="text-blue-500 underline hover:text-blue-700">LOGIN</Link> to access your journal.</h6>
          <h6 className="text-lg">Don't have an account? <Link to="/register" className="text-blue-500 underline hover:text-blue-700">REGISTER</Link> now!</h6>
        </div>
      )}
    </div>
  );
};

export default Home;
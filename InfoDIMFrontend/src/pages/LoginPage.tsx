import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../store/authSlice";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tableau-de-bord");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginRequest({ username, password }));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
          Connectez-vous à votre compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Matricule
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Matricule"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-black sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mot de passe
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-black sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="group relative flex-1 justify-center py-2 px-4 mr-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Se connecter
            </button>
            <button
              className="group relative flex-1 justify-center py-2 px-4 ml-2 text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-nonedark:bg-gray-700 dark:hover:bg-gray-800"
              onClick={() => navigate("/")}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

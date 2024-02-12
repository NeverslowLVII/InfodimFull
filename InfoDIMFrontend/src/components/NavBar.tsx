import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { logout } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import InfoDimLogo from './InfoDimLogo';
import { toggleDarkMode } from '../store/darkModeSlice';

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Tableau de bord", href: "/tableau-de-bord" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact"}
];

export function NavBar() {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const isDarkMode = useSelector((state) => state.darkMode.isEnabled);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Set isActive to true to start the animation when the component mounts
    setIsActive(true);
  }, []);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    
    <header className={`sticky top-0 bg-white/75 dark:bg-gray-800/75 inset-x-0 z-50 backdrop-blur-lg`}>
      {/* Barre de navigation */}
      <nav
        className={`transition ease-in-out flex items-center justify-between px-6 md:px-8 shadow-lg h-[12vh] dark:text-white`}
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          {/* Lien du logo */}
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">InfoDIM</span>
            <InfoDimLogo isActive={isActive} /> {/* Changed this line to use the SVG as a React component */}
          </a>
        </div>
        {/* Bouton du menu mobile */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* Liens de navigation pour le bureau */}
        <div className="hidden md:flex md:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
  "text-sm font-medium leading-6 transition duration-300 ease-in-out" + (isActive ? " text-blue-600 dark:text-blue-400" : " text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400")
}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        {/* Lien de connexion/déconnexion */}
        <div className="hidden md:flex md:flex-1 md:justify-end">
        <button onClick={handleToggleDarkMode} className="px-4 rounded-full text-gray-700 dark:text-gray-200">
          {isDarkMode ? (
            <SunIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <MoonIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
          <a
            href={isAuthenticated ? "#" : "/connexion"}
            onClick={
              isAuthenticated ? (event) => handleLogout(event) : undefined
            }
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
          >
            {isAuthenticated ? "Se déconnecter" : "Se connecter"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      {/* Dialogue du menu mobile */}
      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 pt-16 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">InfoDIM</span>
              <InfoDimLogo isActive={isActive} /> 
            </a>
            <button onClick={handleToggleDarkMode} className="px-2 rounded-full text-gray-700 dark:text-gray-200">
          {isDarkMode ? (
            <SunIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <MoonIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => 
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" + (isActive ? " bg-gray-200 dark:bg-gray-600" : "")
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={isAuthenticated ? "#" : "/connexion"}
                  onClick={
                    isAuthenticated ? (event) => handleLogout(event) : undefined
                  }
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                  {isAuthenticated ? "Se déconnecter" : "Se connecter"}
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
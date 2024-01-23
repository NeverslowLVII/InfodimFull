// NavBar.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import logoSvg from '../../public/images/infodim.svg';

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
  const navigate = useNavigate();

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    // Header component with sticky positioning
    <header className={`sticky top-0 bg-white inset-x-0 z-50`}>
      {/* Navigation bar */}
      <nav
        className={`transition ease-in-out flex items-center justify-between px-6 md:px-8 shadow-lg h-[12vh]`}
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          {/* Logo link */}
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">InfoDIM</span>
            <img
              className="h-8 w-auto"
              src={logoSvg}
              alt="Logo de InfoDIM"
            />
          </a>
        </div>
        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* Desktop navigation links */}
        <div className="hidden md:flex md:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
                "text-sm font-semibold leading-6 text-gray-900" + (isActive ? " text-blue-600" : "")
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        {/* Login/Logout link */}
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <a
            href={isAuthenticated ? "#" : "/connexion"}
            onClick={
              isAuthenticated ? (event) => handleLogout(event) : undefined
            }
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {isAuthenticated ? "Se déconnecter" : "Se connecter"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      {/* Mobile menu dialog */}
      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 pt-16 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">InfoDIM</span>
              <img
                className="h-8 w-auto"
                src={logoSvg}
                alt="Logo de InfoDIM"
                style={{ color: 'theme(colors.blue.600)' }} // Use Tailwind's theme function to apply the color
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => 
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" + (isActive ? " bg-gray-200" : "")
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
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
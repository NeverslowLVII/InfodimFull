import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import UnitesDeSoins from "./pages/dashboard/UnitesDeSoins";
import PrivateRoute from "./components/PrivateRoute";
import Myosotis from "./pages/dashboard/Myosotis";
import SCS from "./pages/dashboard/SCS";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./index.css";
import "./darkmode.css"

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNavBar = location.pathname !== "/connexion";

  return (
    <>
      {showNavBar && <NavBar />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/tableau-de-bord" element={<Dashboard />} />
            <Route
              path="/tableau-de-bord/unites-de-soins"
              element={<UnitesDeSoins />}
            />
            <Route path="/tableau-de-bord/myosotis" element={<Myosotis />} />
            <Route path="/tableau-de-bord/scs" element={<SCS />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
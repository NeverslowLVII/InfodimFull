import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import "./assets/main.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div className="pt-28">
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route
          path="/tableau-de-bord"
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;

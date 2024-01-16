<<<<<<< Updated upstream
import React from "react";

import AllRoutes from "./routes/Routes";

import { configureFakeBackend } from "./helpers";

// For Default import Default.scss
//import './assets/scss/Default.scss';

// For Saas import Saas.scss
// import './assets/scss/Saas.scss';

// For Modern demo import Modern.scss
import './assets/scss/Modern.scss';

// For Creative demo import Creative.scss
// import "./assets/scss/Creative.scss";

// For Purple demo import Purple.scss
// import './assets/scss/Purple.scss';

// For Material demo import Material.scss
// import './assets/scss/Material.scss';

// Other
import './assets/scss/Landing.scss';
import "./assets/scss/Icons.scss";

// Import react-toastify CSS
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// configure fake backend
configureFakeBackend();

const App = () => {
  return (
    <>
      <React.Fragment>
        <ToastContainer />
          <AllRoutes />
      </React.Fragment>
    </>
  );
};

export default App;
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <HeroSection />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
      </Routes>
    </Router>
  );
};

export default App;
>>>>>>> Stashed changes


import React from 'react';
import HorizontalNavbar from '../components/HorizontalNavbar';

const HorizontalLayout: React.FC = () => {
  return (
    <div>
      <HorizontalNavbar />
      <div className="container-fluid">
        <header className="mb-3">Top Bar</header>
        <main>Main Content</main>
      </div>
    </div>
  );
};

export default HorizontalLayout;

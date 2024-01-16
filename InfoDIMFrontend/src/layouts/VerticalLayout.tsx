
import React from 'react';
import VerticalNavbar from '../components/VerticalNavbar';

const VerticalLayout: React.FC = () => {
  return (
    <div>
      <VerticalNavbar />
      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-3">Sidebar</aside>
          <main className="col-md-9">Main Content</main>
        </div>
      </div>
    </div>
  );
};

export default VerticalLayout;

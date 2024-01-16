
import React from 'react';

const DetachedLayout: React.FC = () => {
  return (
    <div className="container-fluid">
      <aside className="position-fixed">Floating Sidebar</aside>
      <main className="ms-5">Main Content</main>
    </div>
  );
};

export default DetachedLayout;

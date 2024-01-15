import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;


import React, { createContext, useContext, useState, ReactNode } from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
// Import other navbar components as needed

// Define the type for the layout context state
type LayoutContextType = {
  layout: string;
  setLayout: (layout: string) => void;
};

// Create the context with a default value
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Create a provider component for the LayoutContext
export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [layout, setLayout] = useState('vertical'); // Default layout

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Create a hook to use the layout context
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

// Create the LayoutWrapper component that wraps children with the selected navbar
export const LayoutWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { layout } = useLayout();

  const getNavbar = () => {
    switch (layout) {
      case 'vertical':
        return <VerticalNavbar />;
      default:
        return <HorizontalNavbar />;
    }
  };

  return (
    <>
      {getNavbar()}
      {children}
    </>
  );
};

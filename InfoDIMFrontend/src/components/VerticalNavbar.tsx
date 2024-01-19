import React from 'react';
import { Navbar, Dropdown } from 'flowbite-react';

const VerticalNavbar: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Brand href="#">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          InfoDIM
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link
          href="/tableau-de-bord"
          active={true}
        >
          Tableau de bord
        </Navbar.Link>
        <Navbar.Link href="/settings">
          Settings
        </Navbar.Link>
        <Navbar.Link href="/profile">
          Profile
        </Navbar.Link>
        <Navbar.Link href="/contact">
          Contact
        </Navbar.Link>
        {/* Add more Navbar.Link components for additional menu items */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default VerticalNavbar;

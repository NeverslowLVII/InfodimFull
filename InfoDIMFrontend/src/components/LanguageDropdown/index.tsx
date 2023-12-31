import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";

import enFlag from "./flags/us.jpg";
import frFlag from "./flags/french.jpg";

// get the languages
const Languages = [
  {
    name: "English",
    flag: enFlag,
  },
  {
    name: "French",
    flag: frFlag,
  }
];

const LanguageDropdown = () => {
  const defaultLang = Languages[1] || {};
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  /*
   * toggle language-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-languages"
        as="a"
        onClick={toggleDropdown}
        className={classNames("nav-link waves-effect waves-light", {
          show: dropdownOpen,
        })}
      >
        <img src={defaultLang.flag} alt={defaultLang.name} height="16" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
        <div onClick={toggleDropdown}>
          {(Languages || []).map((lang, i) => {
            return (
              <Link
                to="#"
                className="dropdown-item notify-item"
                key={i + "-lang"}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="me-1"
                  height="12"
                />{" "}
                <span className="align-middle">{lang.name}</span>
              </Link>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;

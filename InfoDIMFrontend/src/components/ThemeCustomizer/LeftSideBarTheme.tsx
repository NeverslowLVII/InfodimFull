import { Form } from "react-bootstrap";
import * as layoutConstants from "../../constants/layout";
import React from 'react';

interface LeftSideBarThemeProps {
  changeLeftSidebarTheme: (value: any) => void;
  leftSideBarTheme: string;
  layoutConstants: typeof layoutConstants.SideBarTheme;
}

const LeftSideBarTheme = ({
  changeLeftSidebarTheme,
  leftSideBarTheme,
  layoutConstants,
}: LeftSideBarThemeProps) => {
  return (
    <>
      <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Couleur de la barre latérale gauche</h6>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="theme"
          id="light-check"
          value={layoutConstants.LEFT_SIDEBAR_THEME_LIGHT}
          onChange={(e) => changeLeftSidebarTheme(e.target.value)}
          checked={
            leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_LIGHT
          }
        />
        <Form.Check.Label htmlFor="light-check">Clair</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="theme"
          id="dark-check"
          value={layoutConstants.LEFT_SIDEBAR_THEME_DARK}
          onChange={(e) => changeLeftSidebarTheme(e.target.value)}
          checked={leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_DARK}
        />
        <Form.Check.Label htmlFor="dark-check">Sombre</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="theme"
          id="brand-check"
          value={layoutConstants.LEFT_SIDEBAR_THEME_BRAND}
          onChange={(e) => changeLeftSidebarTheme(e.target.value)}
          checked={
            leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_BRAND
          }
        />
        <Form.Check.Label htmlFor="brand-check">Thème</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="theme"
          id="gradient-check"
          value={layoutConstants.LEFT_SIDEBAR_THEME_GRADIENT}
          onChange={(e) => changeLeftSidebarTheme(e.target.value)}
          checked={
            leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_GRADIENT
          }
        />
        <Form.Check.Label htmlFor="gradient-check">Dégradé</Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default LeftSideBarTheme;

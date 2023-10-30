import React from "react";
import T from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { THEMES } from "../constants";

const ThemeSelect = ({ changeTheme, theme }) => (
  <div className="theme-select">
    <span>Theme:</span>
    <Select onChange={changeTheme} value={theme} className="select">
      <MenuItem value={THEMES.DEFAULT}>Default</MenuItem>
      <MenuItem value={THEMES.CHRISTMAS}>Christmas</MenuItem>
      <MenuItem value={THEMES.NEON}>Neon</MenuItem>
    </Select>
  </div>
);

ThemeSelect.propTypes = {
  theme: T.string,
  changeTheme: T.func,
};

export default ThemeSelect;

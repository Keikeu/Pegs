import React from "react";
import T from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { THEMES } from "../constants";

const ThemeSelect = ({ changeTheme, theme }) => (
  <div className="theme-select">
    <span>Theme:</span>
    <Select
      onChange={(e) => changeTheme(e.target.value)}
      value={theme}
      className="select"
      size="small"
      variant="outlined"
    >
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

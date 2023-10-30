import React from "react";
import T from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const ThemeSelect = ({ changeTheme, theme }) => (
  <div className="theme-select">
    <span>Theme:</span>
    <Select onChange={changeTheme} value={theme} className="select">
      <MenuItem value="default">Default</MenuItem>
      <MenuItem value="christmas">Christmas</MenuItem>
      <MenuItem value="neon">Neon</MenuItem>
    </Select>
  </div>
);

ThemeSelect.propTypes = {
  theme: T.string,
  changeTheme: T.func,
};

export default ThemeSelect;

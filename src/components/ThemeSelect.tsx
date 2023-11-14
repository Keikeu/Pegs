import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled as styledMUI } from "@mui/system";

import { THEMES } from "../constants";
import styled from "styled-components";

const ThemeSelectBox = styled.div`
  position: absolute;
  bottom: 32px;
  right: 40px;

  & > span {
    margin-right: 16px;
  }

  @media (max-width: 768px) {
    bottom: 24px;
    left: 32px;
    right: auto;
  }
  @media (max-width: 480px) {
    bottom: 12px;
    left: 16px;
    font-size: 14px;
  }
`;

const CustomSelect = styledMUI(Select)`
	color: var(--text);

	fieldset,
	svg {
		color: var(--text-opacity);
		border-color: var(--text-opacity) !important;
	}	

	@media (max-width: 768px) {
		& > div {
			padding: 4px 8px;
		}
	}
	@media (max-width: 480px) {
		font-size: 14px;
	}
`;

interface Props {
  theme: string;
  changeTheme: (theme: string) => void;
}

const ThemeSelect = ({ changeTheme, theme }: Props) => (
  <ThemeSelectBox>
    <span>Theme:</span>
    <CustomSelect
      onChange={(e: SelectChangeEvent<unknown>) => changeTheme(e.target.value as string)}
      value={theme}
      size="small"
      variant="outlined"
    >
      <MenuItem value={THEMES.DEFAULT}>Default</MenuItem>
      <MenuItem value={THEMES.CHRISTMAS}>Christmas</MenuItem>
      <MenuItem value={THEMES.NEON}>Neon</MenuItem>
    </CustomSelect>
  </ThemeSelectBox>
);

export default ThemeSelect;

import React from "react";
import christmas from "../media/audio/christmas.mp3";
import neon from "../media/audio/neon.mp3";
import Button from "@mui/material/Button";
import { THEMES } from "../constants";
import Icon from "./Icon";
import { styled } from "@mui/system";

const themeSongs = {
  [THEMES.CHRISTMAS]: christmas,
  [THEMES.NEON]: neon,
};

const AudioButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 4px;
  color: var(--text);
`;

interface Props {
  theme: string;
  isAudioOn: boolean;
  toggleAudio: () => void;
}

const Music = ({ theme, isAudioOn, toggleAudio }: Props) => (
  <div>
    {[THEMES.CHRISTMAS, THEMES.NEON].includes(theme) && (
      <>
        {isAudioOn ? (
          <>
            <audio autoPlay loop src={themeSongs[theme]} />
            <AudioButton onClick={toggleAudio}>
              <Icon name="volume_up" />
            </AudioButton>
          </>
        ) : (
          <AudioButton onClick={toggleAudio}>
            <Icon name="volume_off" />
          </AudioButton>
        )}
      </>
    )}
  </div>
);

export default Music;

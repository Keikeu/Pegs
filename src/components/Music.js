import React from "react";
import T from "prop-types";
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
  top: 0;
  right: 0;
  margin: 10px;
  color: var(--text);
`;

const Music = ({ theme, isAudioOn, toggleAudio }) => (
  <div>
    {[THEMES.CHRISTMAS, THEMES.NEON].includes(theme) && (
      <>
        {isAudioOn ? (
          <>
            <audio autoPlay loop src={themeSongs[theme]} type="audio/mpeg" />
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

Music.propTypes = {
  theme: T.string,
  isAudioOn: T.bool,
  toggleAudio: T.func,
};

export default Music;

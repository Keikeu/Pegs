import React from "react";
import T from "prop-types";
import christmas from "../media/audio/christmas.mp3";
import neon from "../media/audio/neon.mp3";
import Button from "@mui/material/Button";
import { THEMES } from "../constants";
import Icon from "./Icon";

const themeSongs = {
  [THEMES.CHRISTMAS]: christmas,
  [THEMES.NEON]: neon,
};

const Music = ({ theme, isAudioOn, toggleAudio }) => (
  <div>
    {[THEMES.CHRISTMAS, THEMES.NEON].includes(theme) && (
      <>
        {isAudioOn ? (
          <>
            <audio autoPlay loop src={themeSongs[theme]} type="audio/mpeg" />
            <Button className="audio-btn" onClick={toggleAudio}>
              <Icon name="volume_up" />
            </Button>
          </>
        ) : (
          <Button className="audio-btn" onClick={toggleAudio}>
            <Icon name="volume_off" />
          </Button>
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

import React from 'react';
import christmas from '../media/christmas.mp3';
import vaporwave from '../media/vaporwave.mp3';
import Button from '@material-ui/core/Button';
import Snow from '../snow-animation.js';

const Theme = ({ theme, audio, toggleAudio }) => (
  <div>
    {theme === "christmas" && (
      <div>
        {audio && (
          <>
            <audio autoPlay loop src={christmas} type="audio/mpeg"/>
            <Button className="audio-btn" onClick={() => toggleAudio()}>
              <i className="material-icons">volume_up</i>
            </Button>
          </>
        )}
        {!audio && (
          <Button className="audio-btn" onClick={() => toggleAudio()}>
            <i className="material-icons">volume_off</i>
          </Button>
        )}
        <Snow></Snow>
        <svg className="ground" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#8fa5b3" />
          </linearGradient>
        </defs>
          <path d="M -40 100 Q 10 -70 60 100 " fill="url(#gradient)"/>
          <path d="M 15 100 Q 80 -100 120 100 " fill="url(#gradient)"/>
        </svg>
      </div>
    )}
    {theme === "vaporwave" && (
      <div>
      {audio && (
        <>
          <audio autoPlay loop src={vaporwave} type="audio/mpeg" />
          <Button className="audio-btn" onClick={() => toggleAudio()}>
            <i className="material-icons">volume_up</i>
          </Button>
        </>
      )}
      {!audio && (
        <Button className="audio-btn" onClick={() => toggleAudio()}>
          <i className="material-icons">volume_off</i>
        </Button>
      )}
      </div>
      )
    }
  </div>
);

export default Theme;

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AliceCarousel from "react-alice-carousel";
import tutorial from "../media/tutorial.png";
import asymmetrical from "../media/asymmetrical.png";
import diamond from "../media/diamond.png";
import german from "../media/german.png";
import english from "../media/english.png";
import square from "../media/square.png";

const items = [tutorial, english, german, asymmetrical, square, diamond];
const itemsNames = ["Tutorial", "English", "German", "Asymmetrical", "Square", "Diamond"];

const BoardsModal = ({ initialIndex, onClose, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

  const onSlideChanged = (e) => setCurrentIndex(e.item);

  const slideNext = () => setCurrentIndex((index) => index + 1);
  const slidePrev = () => setCurrentIndex((index) => index - 1);

  function renderGallery() {
    return (
      <AliceCarousel
        fadeOutAnimation={true}
        dotsDisabled={true}
        buttonsDisabled={true}
        slideToIndex={currentIndex}
        startIndex={currentIndex}
        onSlideChanged={onSlideChanged}
      >
        {items.map((item, i) => (
          <div key={itemsNames[i]}>
            <h3>{itemsNames[i]}</h3>
            <img className="board-img" src={item} alt={itemsNames[i]} />
          </div>
        ))}
      </AliceCarousel>
    );
  }

  return (
    <div>
      <div className="dialog-container" onClick={onClose}></div>
      <div className="dialog">
        <h2>Play on a different board</h2>
        <Button className="close-btn" onClick={onClose}>
          <i className="material-icons">close</i>
        </Button>
        <Button className="carousel-btn" onClick={() => slidePrev()}>
          <i className="material-icons">chevron_left</i>
        </Button>
        <Button className="carousel-btn" onClick={() => slideNext()}>
          <i className="material-icons">chevron_right</i>
        </Button>
        {renderGallery()}
        <Button className="play-btn" variant="contained" onClick={() => onClick(currentIndex)}>
          Play
        </Button>
      </div>
    </div>
  );
};

export default BoardsModal;

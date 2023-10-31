import React from "react";
import T from "prop-types";
import Button from "@material-ui/core/Button";
import tutorial from "../media/tutorial.png";
import asymmetrical from "../media/asymmetrical.png";
import diamond from "../media/diamond.png";
import german from "../media/german.png";
import english from "../media/english.png";
import square from "../media/square.png";
import Icon from "./Icon";

const boardImages = [tutorial, english, german, asymmetrical, square, diamond];
const boardNames = ["Tutorial", "English", "German", "Asymmetrical", "Square", "Diamond"];

const BoardsModal = ({ initialIndex, onClose, onClick }) => {
  return (
    <div>
      <div className="dialog-container" onClick={onClose}></div>
      <div className="dialog">
        <h2>Play on a different board</h2>
        <Button className="close-btn" onClick={onClose}>
          <Icon name="close" />
        </Button>
        <div className="board-gallery">
          {boardImages.map((item, i) => (
            <div
              key={boardNames[i]}
              className={`gallery-item${initialIndex === i ? " gallery-item--current" : ""}`}
              onClick={() => onClick(i)}
            >
              <h3>{boardNames[i]}</h3>
              <img className="board-img" src={item} alt={boardNames[i]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BoardsModal.propTypes = {
  initialIndex: T.number,
  onClose: T.func,
  onClick: T.func,
};

export default BoardsModal;

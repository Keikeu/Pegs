import React from "react";
import tutorial from "../media/images/tutorial.png";
import asymmetrical from "../media/images/asymmetrical.png";
import diamond from "../media/images/diamond.png";
import german from "../media/images/german.png";
import english from "../media/images/english.png";
import square from "../media/images/square.png";
import Modal from "./Modal";
import styled, { css } from "styled-components";

const boardImages = [tutorial, english, german, asymmetrical, square, diamond];
const boardNames = ["Tutorial", "English", "German", "Asymmetrical", "Square", "Diamond"];

const BoardGallery = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  min-height: 640px;
  overflow-y: auto;

  @media (max-width: 768px) {
    min-height: 0;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const GalleryItem = styled.div<{ $isCurrent: boolean }>`
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-190);
  }

  ${({ $isCurrent }) =>
    $isCurrent &&
    css`
      background-color: var(--neutral-190);
      border: 1px solid var(--neutral-180);
    `}
`;

const BoardImage = styled.img`
  width: 160px;
  height: auto;
  margin: auto;
`;

interface Props {
  initialIndex: number;
  closeModal: () => void;
  changeBoard: (index: number) => void;
}

const BoardsModal = ({ initialIndex, closeModal, changeBoard }: Props) => {
  return (
    <Modal closeModal={closeModal}>
      <h2>Play on a different board</h2>
      <BoardGallery>
        {boardImages.map((image, i) => (
          <GalleryItem key={boardNames[i]} $isCurrent={initialIndex === i} onClick={() => changeBoard(i)}>
            <h3>{boardNames[i]}</h3>
            <BoardImage src={image} alt={boardNames[i]} />
          </GalleryItem>
        ))}
      </BoardGallery>
    </Modal>
  );
};

export default BoardsModal;

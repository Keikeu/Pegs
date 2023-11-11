import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import Icon from "./Icon";
import styled, { css } from "styled-components";
import { styled as styledMUI } from "@mui/system";

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: var(--backdrop);
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 80%;
  max-height: 95%;
  overflow-y: auto;
  background-color: var(--neutral-200);
  padding: 30px 40px 40px;
  text-align: center;
  border-radius: 16px;
  color: var(--neutral-100);
  z-index: var(--z-index-above);

  p {
    margin: 10px 0;
    line-height: 1.4em;
  }

  p:last-of-type {
    margin-top: 24px;
    margin-bottom: 32px;
  }

  ${({ variant }) => {
    if (variant === "win") {
      return css`
        & > i {
          font-size: 48px;
        }
        & > h2 {
          margin-top: -10px;
          margin-bottom: 25px;
        }
        & > i,
        & > h2 {
          color: var(--success-100);
        }
      `;
    } else if (variant === "defeat") {
      return css`
        & > i {
          font-size: 48px;
        }
        & > h2 {
          margin-top: -10px;
          margin-bottom: 25px;
        }
        & > i,
        & > h2 {
          color: var(--defeat-100);
        }
      `;
    }
  }}

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding-left: 16px;
    padding-right: 16px;

    h2 {
      font-size: 18px;
    }

    h3 {
      font-size: 16px;
    }
  }
`;

const CloseButton = styledMUI(Button)`
  position: absolute;
  top: 10px;
  right: 5px;
  color: var(--neutral-100);
  font-size: 24px;
  cursor: pointer;
`;

const Modal = ({ closeModal, variant, children }) => (
  <>
    <ModalBackground onClick={closeModal} />
    <ModalBox variant={variant}>
      <CloseButton onClick={closeModal}>
        <Icon name="close" />
      </CloseButton>
      {children}
    </ModalBox>
  </>
);

Modal.propTypes = {
  closeModal: T.func,
  variant: T.string,
  children: T.node,
};

export default Modal;

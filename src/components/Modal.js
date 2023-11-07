import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import Icon from "./Icon";

const Modal = ({ closeModal, className, children }) => (
  <>
    <div className="dialog-container" onClick={closeModal}></div>
    <div className={`dialog ${className || ""}`}>
      <Button className="close-btn" onClick={closeModal}>
        <Icon name="close" />
      </Button>
      {children}
    </div>
  </>
);

Modal.propTypes = {
  className: T.string,
  closeModal: T.func,
  children: T.node,
};

export default Modal;

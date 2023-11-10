import React from "react";
import T from "prop-types";

const Icon = ({ name }) => {
  // size
  return <i className="material-icons">{name}</i>;
};

Icon.propTypes = {
  name: T.string,
};

export default Icon;

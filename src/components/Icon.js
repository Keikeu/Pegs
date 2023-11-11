import React from "react";
import T from "prop-types";
import styled from "styled-components";

const I = styled.i`
  font-size: ${({ size }) => size}px;
`;

const Icon = ({ name, size = 24 }) => {
  return (
    <I className="material-icons" size={size}>
      {name}
    </I>
  );
};

Icon.propTypes = {
  name: T.string,
  size: T.number,
};

export default Icon;

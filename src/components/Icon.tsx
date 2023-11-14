import React from "react";
import styled from "styled-components";

const I = styled.i<{ size: number }>`
  font-size: ${({ size }) => size}px;
`;

interface Props {
  name: string;
  size?: number;
}

const Icon = ({ name, size = 24 }: Props) => {
  return (
    <I className="material-icons" size={size}>
      {name}
    </I>
  );
};

export default Icon;

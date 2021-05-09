import React from 'react';
import { StyledLeftTile, StyledRightTile, StyledTile, TileContainer } from './Tile.styles';
import { navigate } from 'gatsby';

export interface OuterProps {
  left: React.ReactElement;
  right?: React.ReactElement;
  link?: string;
}

export const Tile: React.FC<OuterProps> = ({ left, right, link }) => {
  const onClick =
    link !== undefined
      ? async () => {
          if (link !== undefined) await navigate(link);
        }
      : undefined;

  if (right === undefined) {
    return <StyledTile onClick={onClick}>{left}</StyledTile>;
  }
  return (
    <TileContainer>
      <StyledLeftTile onClick={onClick}>{left}</StyledLeftTile>
      <StyledRightTile onClick={onClick}>{right}</StyledRightTile>
    </TileContainer>
  );
};

import React from 'react';
import { StyledTile } from './Tile.styles';
import { navigate } from 'gatsby';

export interface OuterProps {
  link?: string;
}

export const Tile: React.FC<OuterProps> = ({ link, children }) => {
  const onClick =
    link !== undefined
      ? async () => {
          if (link !== undefined) await navigate(link);
        }
      : undefined;

  return <StyledTile onClick={onClick}>{children}</StyledTile>;
};

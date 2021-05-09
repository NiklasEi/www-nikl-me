import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colorUsage } from '../../theme';

const baseStyle = css`
  border: 3px solid ${colorUsage.tileBorder};
  border-radius: 25px;
  height: 50px;
`;

export const StyledTile = styled.button`
  ${baseStyle}
`;

export const StyledLeftTile = styled.button`
  ${baseStyle}
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export const StyledRightTile = styled.button`
  ${baseStyle}
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const TileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

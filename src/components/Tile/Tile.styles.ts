import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colorUsage } from '../../theme';

const baseStyle = css`
  border: 3px solid ${colorUsage.tileBorder};
  border-radius: 25px;
  height: 30px;
`;

export const StyledTile = styled.button`
  ${baseStyle}
  :hover {
    border: 3px solid ${colorUsage.hoverTileBorder};
    cursor: pointer;
  }
`;

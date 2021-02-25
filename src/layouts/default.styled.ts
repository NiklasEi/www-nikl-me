import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const StyledDefaultLayout = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const globalStyles = css`
  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }
`;

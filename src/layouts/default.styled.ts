import styled from '@emotion/styled';
import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const StyledDefaultLayout = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const globalStyles = css`
  ${emotionReset}

  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }
`;

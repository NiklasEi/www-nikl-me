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

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const CenteredTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

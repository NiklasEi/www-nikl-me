import styled from '@emotion/styled';
import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

export const StyledDefaultLayout = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const globalStyles = css`
  ${emotionNormalize}

  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }

  .line-numbers-rows {
    padding: 1em 0;
    padding-left: 5px;
  }

  a {
    text-decoration: none;
  }

  p {
    line-height: 1.5;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin: 15px auto;
  max-width: 95%;

  @media (min-width: 840px) {
    max-width: 800px;
  }
`;

export const CenteredTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const CenteredSubTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
`;

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { colors, layout } from '../theme';

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

  .copy-code-button-container {
    top: 50px;
    right: 8px;
    margin-top: -50px;
  }

  .gatsby-code-button-buffer {
    display: none;
  }

  .copy-code-icon {
    fill: ${colors.white};
  }

  h1 {
    display: block;
    font-size: 2em;
    font-weight: bold;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
  }

  h2 {
    display: block;
    font-size: 1.5em;
    font-weight: bold;
    margin-block-start: 0.99em;
    margin-block-end: 0.83em;
  }

  h3 {
    display: block;
    font-size: 1.17em;
    font-weight: bold;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }

  h4 {
    display: block;
    font-size: 1em;
    font-weight: bold;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
  }

  blockquote {
    display: block;
    background: #fff;
    padding: 15px 20px 15px 45px;
    margin: 0 0 20px;
    position: relative;

    /*Font*/
    font-family: Georgia, serif;
    font-size: 16px;
    line-height: 1.2;
    color: #666;
    text-align: justify;

    /*Borders - (Optional)*/
    border-left: 15px solid #494642;
    border-right: 2px solid #494642;

    /*Box Shadow - (Optional)*/
    -moz-box-shadow: 2px 2px 15px #ccc;
    -webkit-box-shadow: 2px 2px 15px #ccc;
    box-shadow: 2px 2px 15px #ccc;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin: 15px auto;
  max-width: 95%;

  @media (min-width: ${layout.switch_to_max_width_at}px) {
    max-width: ${layout.max_width}px;
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

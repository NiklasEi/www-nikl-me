import styled from '@emotion/styled';
import { layout } from '../../theme';

export const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

export const ProjectBody = styled.div`
  width: 100%;
  max-width: ${layout.max_width}px;
  padding-top: 10px;
  padding-bottom: 20px;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;

    &:not(:first-child) {
      margin-top: 5rem;
    }
  }
  h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 1rem;

    &:not(:first-child) {
      margin-top: 3rem;
    }
  }
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;

    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
`;

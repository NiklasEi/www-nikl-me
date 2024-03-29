import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
`;

export const ProjectContainer = styled.div`
  position: relative;
  text-align: left;
  margin: 0 auto;
  width: 100%;

  /* 2*width*(1/0.95) (container has max width 95%) */
  @media (min-width: 842px) {
    width: 400px;
    margin: 0 0;
  }
`;

export const ContainerLink = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  :hover {
    cursor: pointer;
  }
`;

export const ProjectTitle = styled.h1`
  white-space: pre-line;
  word-break: break-word;
  margin: 0 0 4px;
`;

import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;

export const ProjectContainer = styled.div`
  position: relative;
`;

export const ContainerLink = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  z-index: 1;
`;

export const ProjectHeader = styled.div`
  display: flex;
  position: static;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

import styled from '@emotion/styled';
import { colors } from '../../theme';

export const ProjectLink = styled.a`
  z-index: 10;
  color: ${colors.background};
  margin: 0 5px;

  &:hover {
    color: ${colors.secondary};
  }
`;

export const ProjectLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

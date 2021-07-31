import styled from '@emotion/styled';
import { colors } from '../../theme';

export const ProjectLink = styled.a`
  z-index: 10;
  color: ${colors.background};
  margin: 0 5px;
  
  svg {
    &:hover {
      color: ${colors.secondary};
    }
    max-height: 22px;
    max-width: 22px;
  }
`;

export const ProjectLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

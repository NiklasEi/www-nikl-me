import styled from '@emotion/styled';
import { colors } from '../../theme';

export const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 10px 0;
  background-color: ${colors.background};
  color: ${colors.secondary};
`;

export const ContactLink = styled.a`
  color: ${colors.secondary};
  margin: 0 5px;
`;

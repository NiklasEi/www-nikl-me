import styled from '@emotion/styled';
import { colors } from '../../theme';

export const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background-color: ${colors.background};
  color: ${colors.secondary};
`;

export const Copyright = styled.small`
  font-size: 0.6rem;
  padding-top: 10px;
`;

export const ContactLink = styled.a`
  color: ${colors.secondary};
  margin: 0 5px;

  &:hover {
    color: ${colors.white};
  }
`;

import styled from '@emotion/styled';
import { colors } from '../../theme';

export const StyledFooter = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  background-color: ${colors.background};
  color: ${colors.secondary};
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;

  @media (min-width: 840px) {
    flex-direction: row;
  }
`;

export const Contacts = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const Copyright = styled.small`
  flex: 1;
  display: flex;
  justify-content: flex-end;
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

export const RssLink = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;

  & > a {
    color: ${colors.secondary};
    margin: 5px 0;

    &:hover {
      color: ${colors.white};
    }
  }
`;

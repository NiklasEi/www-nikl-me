import styled from '@emotion/styled';
import { colors } from '../../theme';
import { Link } from 'gatsby';

export const StyledNavBar = styled.div`
  background-color: ${colors.background};
  color: ${colors.secondary};
`;

export const StyledInnerNavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0;
`;

export const NavBarLink = styled(Link)`
  color: ${colors.secondary};
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  margin: 10px;
  padding: 5px;

  &:hover {
    color: ${colors.white};
  }
  
  & > svg {
    margin-right: 5px;
  }
`;

export const LinkRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NavBarContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 95%;

  @media (min-width: 840px) {
    max-width: 800px;
  }
`;

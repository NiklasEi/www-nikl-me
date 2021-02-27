import styled from '@emotion/styled';
import { colors } from '../../theme';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledNavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0;
  background-color: ${colors.background};
  color: ${colors.secondary};
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
`;

export const NavBarFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

export const LinkRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

import React from 'react';
import { NavBarFontAwesomeIcon, LinkRow, NavBarLink, StyledNavBar, StyledInnerNavBar, NavBarContainer } from './NavBar.styles';
import { faBookOpen, faFolderOpen, faHome } from '@fortawesome/free-solid-svg-icons';

const NavBar: React.FC = () => {
  return (
    <StyledNavBar>
      <NavBarContainer>
        <StyledInnerNavBar>
          <NavBarLink to="/">
            <NavBarFontAwesomeIcon icon={faHome} />
            Nikl.me
          </NavBarLink>
          <LinkRow>
            <NavBarLink to="/blog">
              <NavBarFontAwesomeIcon icon={faBookOpen} />
              Blog
            </NavBarLink>
            <NavBarLink to="/projects">
              <NavBarFontAwesomeIcon icon={faFolderOpen} />
              Projects
            </NavBarLink>
          </LinkRow>
        </StyledInnerNavBar>
      </NavBarContainer>
    </StyledNavBar>
  );
};

export default NavBar;

import React from 'react';
import { NavBarFontAwesomeIcon, LinkRow, NavBarLink, StyledNavBar } from './NavBar.styles';
import { faBookOpen, faFolderOpen, faGlobe, faHome } from '@fortawesome/free-solid-svg-icons';

const NavBar: React.FC = () => {
  return (
    <StyledNavBar>
      <NavBarLink to="/">
        <NavBarFontAwesomeIcon icon={faHome} />
        Nikl.me
      </NavBarLink>
      <LinkRow>
        <NavBarLink to="/blog">
          <NavBarFontAwesomeIcon icon={faBookOpen} />
          Blog
        </NavBarLink>
        <NavBarLink to="/travelling">
          <NavBarFontAwesomeIcon icon={faGlobe} />
          Travelling
        </NavBarLink>
        <NavBarLink to="/projects">
          <NavBarFontAwesomeIcon icon={faFolderOpen} />
          Projects
        </NavBarLink>
      </LinkRow>
    </StyledNavBar>
  );
};

export default NavBar;

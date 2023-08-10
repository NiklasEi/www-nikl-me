import React from 'react';
import { LinkRow, NavBarLink, StyledNavBar, StyledInnerNavBar, NavBarContainer } from './NavBar.styles';
import { FaBookOpen, FaFolderOpen, FaHome } from 'react-icons/fa';

const NavBar: React.FC = () => {
  return (
    <StyledNavBar>
      <NavBarContainer>
        <StyledInnerNavBar>
          <NavBarLink to="/">
            <FaHome />
            Nikl.me
          </NavBarLink>
          <LinkRow>
            <NavBarLink to="/blog">
              <FaBookOpen />
              Blog
            </NavBarLink>
            <NavBarLink to="/projects">
              <FaFolderOpen />
              Projects
            </NavBarLink>
          </LinkRow>
        </StyledInnerNavBar>
      </NavBarContainer>
    </StyledNavBar>
  );
};

export default NavBar;

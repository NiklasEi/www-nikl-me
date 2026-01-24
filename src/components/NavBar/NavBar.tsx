import React from 'react';
import { LinkRow, NavBarLink, StyledNavBar, StyledInnerNavBar, NavBarContainer } from './NavBar.styles';
import { FaBookOpen, FaFolderOpen, FaHouse } from 'react-icons/fa6';

const NavBar: React.FC = () => {
  return (
    <StyledNavBar>
      <NavBarContainer>
        <StyledInnerNavBar>
          <NavBarLink to="/">
            <FaHouse />
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

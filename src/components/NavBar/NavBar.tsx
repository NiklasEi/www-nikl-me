import React from 'react';
import { NavBarFontAwesomeIcon, LinkRow, NavBarLink, StyledNavBar, StyledInnerNavBar } from './NavBar.styles';
import { faBookOpen, faFolderOpen, faHome } from '@fortawesome/free-solid-svg-icons';
import { ContentContainer } from '../../layouts/default.styled';

const NavBar: React.FC = () => {
  return (
    <StyledNavBar>
      <ContentContainer>
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
      </ContentContainer>
    </StyledNavBar>
  );
};

export default NavBar;

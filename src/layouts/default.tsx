import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Global } from '@emotion/react';
import { globalStyles, StyledDefaultLayout } from './default.styled';

const DefaultLayout: React.FC = (props) => {
  return (
    <StyledDefaultLayout>
      <Global styles={globalStyles} />
      <NavBar />
      <>{props.children}</>
      <Footer />
    </StyledDefaultLayout>
  );
};

export default DefaultLayout;

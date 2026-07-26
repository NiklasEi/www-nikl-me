import React, { PropsWithChildren } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { Global } from '@emotion/react';
import { globalStyles, StyledDefaultLayout } from './default.styled';

const withDefaultLayout = <P extends PropsWithChildren<object>>(Component: React.FC<P>): React.FC<P> => {
  return (props: P) => {
    return (
      <StyledDefaultLayout>
        <Global styles={globalStyles} />
        <NavBar />
        <Component {...props} />
        <Footer />
      </StyledDefaultLayout>
    );
  };
};

export default withDefaultLayout;

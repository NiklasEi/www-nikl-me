import React from 'react';
import withDefaultLayout from '../layouts/default';
import PageNotFoundComponent from '../components/PageNotFound/PageNotFound';

const PageNotFound: React.FC = () => {
  return <PageNotFoundComponent />;
};

export default withDefaultLayout(PageNotFound);

import React from 'react';
import withDefaultLayout from '../layouts/default';
import PageNotFoundComponent from '../components/PageNotFound/PageNotFound';
import { Seo } from '../components/Seo/Seo';

const PageNotFound: React.FC = () => {
  return <PageNotFoundComponent />;
};

export default withDefaultLayout(PageNotFound);

export const Head: React.FC = () => <Seo />;

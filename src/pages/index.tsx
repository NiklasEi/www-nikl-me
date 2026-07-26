import * as React from 'react';
import LandingPage from '../components/LandingPage/LandingPage';
import { Seo } from '../components/Seo/Seo';

const IndexPage: React.FC = () => {
  return <LandingPage />;
};

export default IndexPage;

export const Head: React.FC = () => <Seo />;

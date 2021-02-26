import * as React from 'react';
import withDefaultLayout from '../layouts/default';

const IndexPage: React.FC = () => {
  return (
    <div>
      <p>Hi there</p>
    </div>
  );
};

export default withDefaultLayout(IndexPage);

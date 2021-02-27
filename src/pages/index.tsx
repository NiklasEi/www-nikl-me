import * as React from 'react';
import withDefaultLayout from '../layouts/default';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const IndexPage: React.FC = () => {
  return (
    <div>
      <p>Hi there</p>
      <FontAwesomeIcon icon={faCoffee} size="1x" />
    </div>
  );
};

export default withDefaultLayout(IndexPage);

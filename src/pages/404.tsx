import React from 'react';
import withDefaultLayout from '../layouts/default';
import styled from '@emotion/styled';

const PageNotFound: React.FC = () => {
  return (
    <StyledPageNotFound>
      <h1>404</h1>
      <StyledPageNotFoundImg src="/assets/images/ruffyAvatar.jpg" alt="The future pirate king" />

      <p>I cannot find the page you are looking for...</p>
      <p>But you found the future pirate king! Congrats ;)</p>
    </StyledPageNotFound>
  );
};

export default withDefaultLayout(PageNotFound);

const StyledPageNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPageNotFoundImg = styled.img`
  max-width: 300px;
`;

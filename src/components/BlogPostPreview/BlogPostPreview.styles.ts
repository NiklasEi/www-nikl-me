import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const PostContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 20px 0;
  text-align: left;
  margin: 0 auto;
`;

export const ContainerLink = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  :hover {
    cursor: pointer;
  }
`;

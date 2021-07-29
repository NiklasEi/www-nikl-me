import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;

export const PostContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 20px 0;
  text-align: left;
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

export const PostHeader = styled.div`
  display: flex;
  position: static;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`;

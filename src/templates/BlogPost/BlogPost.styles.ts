import styled from '@emotion/styled';
import { layout } from '../../theme';

export const StyledBlogPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const BlogPostTitle = styled.h1`
  max-width: ${layout.max_width}px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

export const BlogBody = styled.div`
  width: 100%;
  max-width: ${layout.max_width}px;
  padding-bottom: 20px;

  p,
  hr {
    margin: 0;
    margin-bottom: 2rem;
  }
`;

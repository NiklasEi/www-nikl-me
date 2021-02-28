import styled from '@emotion/styled';

export const StyledBlogPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

export const BlogPostTitle = styled.h1`
  text-align: center;
`;

export const BlogBody = styled.div`
  max-width: 800px;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;

    &:not(:first-child) {
      margin-top: 5rem;
    }
  }
`;

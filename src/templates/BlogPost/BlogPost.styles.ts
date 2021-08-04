import styled from '@emotion/styled';

export const StyledBlogPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const BlogPostTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const BlogBody = styled.div`
  max-width: 800px;
  padding-bottom: 20px;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;

    &:not(:first-child) {
      margin-top: 5rem;
    }
  }
  h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-top: 3rem;
  }
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
    margin-top: 1rem;
  }
  p {
    margin: 0;
    margin-bottom: 2rem;
  }
`;

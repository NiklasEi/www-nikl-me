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
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

export const BlogBody = styled.div`
  width: 100%;
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
    margin-bottom: 1.5rem;
    margin-top: 4rem;
  }
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
    margin-top: 1rem;
  }
  p,
  hr {
    margin: 0;
    margin-bottom: 2rem;
  }
`;

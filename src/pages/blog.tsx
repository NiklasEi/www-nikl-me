import { graphql } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../layouts/default';
import { BlogPostList } from '../components/BlogPostList/BlogPostList';
import { BlogListData } from '../modules/blog';
import { CenteredTitle, ContentContainer } from '../layouts/default.styled';

interface BlogProps {
  data: BlogListData;
}

const BlogPage: React.FC<PropsWithChildren<BlogProps>> = ({ data }) => {
  return (
    <ContentContainer>
      <CenteredTitle>Nikl's blog</CenteredTitle>
      <BlogPostList posts={data.allMarkdownRemark.edges.map(({ node }) => node)} />
    </ContentContainer>
  );
};

export default withDefaultLayout(BlogPage);

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { group: { eq: "blog" } }, frontmatter: { hide: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

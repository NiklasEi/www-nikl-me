import { graphql } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../layouts/default';
import { BlogPostList } from '../components/BlogPostList/BlogPostList';

interface BlogProps {
  data: BlogListData;
}

const BlogPage: React.FC<PropsWithChildren<BlogProps>> = ({ data }) => {
  return <BlogPostList posts={data.allMarkdownRemark.edges.map(({ node }) => node)} />;
};

export default withDefaultLayout(BlogPage);

interface BlogListData {
  allMarkdownRemark: {
    totalCount: number;
    edges: {
      node: BlogPostData;
    }[];
  };
}

export interface BlogPostData {
  id: string;
  frontmatter: {
    title: string;
    date: string;
  };
  fields: {
    slug: string;
  };
  excerpt: string;
}

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

import React, { PropsWithChildren } from 'react';
import { graphql } from 'gatsby';
import withDefaultLayout from '../../layouts/default';
import { BlogBody, BlogPostTitle, StyledBlogPost } from './BlogPost.styles';

interface BlogEntryProps {
  data: BlogEntryData;
}

const BlogPost: React.FC<PropsWithChildren<BlogEntryProps>> = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <StyledBlogPost>
      <BlogPostTitle>{post.frontmatter.title}</BlogPostTitle>
      <BlogBody dangerouslySetInnerHTML={{ __html: post.html }} />
    </StyledBlogPost>
  );
};

export default withDefaultLayout(BlogPost);

interface BlogEntryData {
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
    };
  };
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

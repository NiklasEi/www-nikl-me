import React, { PropsWithChildren } from 'react';
import { graphql } from 'gatsby';
import withDefaultLayout from '../../layouts/default';
import { BlogBody, BlogPostTitle, StyledBlogPost } from './BlogPost.styles';
import Helmet from 'react-helmet';

interface BlogEntryProps {
  data: BlogEntryData;
}

const BlogPost: React.FC<PropsWithChildren<BlogEntryProps>> = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <>
      <Helmet
        title={post.frontmatter.title}
        meta={[
          { name: 'description', content: post.frontmatter.summary },
          { name: 'keywords', content: post.frontmatter.tags.join(', ') }
        ]}
      />
      <StyledBlogPost>
        <BlogPostTitle>{post.frontmatter.title}</BlogPostTitle>
        <BlogBody dangerouslySetInnerHTML={{ __html: post.html }} />
      </StyledBlogPost>
    </>
  );
};

export default withDefaultLayout(BlogPost);

interface BlogEntryData {
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
      summary: string;
      tags: string[];
    };
  };
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        summary
        tags
      }
    }
  }
`;

import React, { PropsWithChildren } from 'react';
import { graphql, HeadProps } from 'gatsby';
import withDefaultLayout from '../../layouts/default';
import { BlogBody, BlogDate, BlogPostTitle, StyledBlogPost } from './BlogPost.styles';
import { Seo } from '../../components/Seo/Seo';

interface BlogEntryProps {
  data: BlogEntryData;
}

const BlogPost: React.FC<PropsWithChildren<BlogEntryProps>> = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <StyledBlogPost>
      <BlogPostTitle>{post.frontmatter.title}</BlogPostTitle>
      <BlogDate>{post.frontmatter.date}</BlogDate>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: the HTML is generated at build time from own markdown */}
      <BlogBody dangerouslySetInnerHTML={{ __html: post.html }} />
    </StyledBlogPost>
  );
};

export default withDefaultLayout(BlogPost);

export const Head: React.FC<HeadProps<BlogEntryData>> = ({ data }) => {
  const post = data.markdownRemark;

  return <Seo title={post.frontmatter.title} description={post.frontmatter.summary} tags={post.frontmatter.tags} fediverseCreator />;
};

interface BlogEntryData {
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
      summary: string;
      date: string;
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
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`;

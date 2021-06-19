import React from 'react';
import withDefaultLayout from '../../layouts/default';
import { StyledLandingPage } from './LandingPage.styles';
import { graphql, StaticQuery } from 'gatsby';
import { BlogListData } from '../../modules/blog';
import { BlogPostPreview } from '../BlogPostPreview/BlogPostPreview';
import { ContentContainer } from '../../layouts/default.styled';

const LandingPage: React.FC = () => {
  return (
    <StaticQuery
      query={graphql`
        query LandingPageQuery {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fields: { group: { eq: "blog" } }, frontmatter: { hide: { ne: true } } }
            limit: 1
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
      `}
      render={(data: BlogListData) => (
        <ContentContainer>
          <StyledLandingPage>
            <span>This page is currently being rewritten. I am changing the static site generator from Jekyll to Gatsby.</span>
            <br />
            <br />

            <span>Latest post:</span>
            <BlogPostPreview {...data.allMarkdownRemark.edges.map(({ node }) => node)[0]} />
          </StyledLandingPage>
        </ContentContainer>
      )}
    />
  );
};

export default withDefaultLayout(LandingPage);

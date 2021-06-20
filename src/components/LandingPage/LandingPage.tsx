import React from 'react';
import withDefaultLayout from '../../layouts/default';
import { LandingPageTitle, StyledLandingPage } from './LandingPage.styles';
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
            <LandingPageTitle>Hi, I'm Niklas</LandingPageTitle>
            <p>And this is my spot on the internet</p>
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

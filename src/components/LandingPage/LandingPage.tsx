import React from 'react';
import { LandingPageTitle, StyledLandingPage } from './LandingPage.styles';
import { graphql, Link, StaticQuery } from 'gatsby';
import { BlogPostData } from '../../modules/blog';
import { BlogPostPreview } from '../BlogPostPreview/BlogPostPreview';
import { CenteredSubTitle, ContentContainer } from '../../layouts/default.styled';
import { ProjectData } from '../../pages/projects';
import withDefaultLayout from '../../layouts/default';
import { ProjectList } from '../ProjectList/ProjectList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const LandingPage: React.FC = () => {
  return (
    <StaticQuery
      query={graphql`
        query LandingPageQuery {
          allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { hide: { ne: true } } }) {
            totalCount
            edges {
              node {
                id
                frontmatter {
                  title
                  date(formatString: "DD MMMM, YYYY")
                  github
                  apple
                  spigot
                  android
                  privacy
                  rubygem
                  itch
                  crate
                  tags
                  cover
                }
                fields {
                  slug
                  group
                }
                excerpt
              }
            }
          }
        }
      `}
      render={(data: Content) => {
        const latestBlog: BlogPostData = data.allMarkdownRemark.edges.map(({ node }) => node).filter(isBlogPostData)[0];
        const latestProjects: ProjectData[] = data.allMarkdownRemark.edges
          .map(({ node }) => node)
          .filter(isProjectData)
          .slice(0, 2);
        return (
          <ContentContainer>
            <StyledLandingPage>
              <LandingPageTitle>Hi, I'm Niklas</LandingPageTitle>
              <p>And this is my spot on the internet</p>
              <CenteredSubTitle>Latest projects:</CenteredSubTitle>
              <ProjectList projects={latestProjects} />
              <Link to={'/projects'}>
                See all projects <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <CenteredSubTitle>Latest post:</CenteredSubTitle>
              <BlogPostPreview {...latestBlog} />
              <Link to={'/blog'}>
                See all posts <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </StyledLandingPage>
          </ContentContainer>
        );
      }}
    />
  );
};

export default withDefaultLayout(LandingPage);

interface Content {
  allMarkdownRemark: {
    totalCount: number;
    edges: {
      node: ContentNode;
    }[];
  };
}

function isBlogPostData(content: ContentNode): content is BlogPostData & { fields: { group: string } } {
  return content.fields.group === 'blog';
}

function isProjectData(content: ContentNode): content is ProjectData & { fields: { group: string } } {
  return content.fields.group === 'projects';
}

type ContentNode = { fields: { group: string } } & (BlogPostData | ProjectData);

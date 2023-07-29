import React from 'react';
import { LandingPageTitle, StyledLandingPage } from './LandingPage.styles';
import { graphql, Link, StaticQuery } from 'gatsby';
import { BlogPostData } from '../../modules/blog';
import { CenteredSubTitle, ContentContainer } from '../../layouts/default.styled';
import { ProjectData } from '../../pages/projects';
import withDefaultLayout from '../../layouts/default';
import { ProjectList } from '../ProjectList/ProjectList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BlogPostList } from '../BlogPostList/BlogPostList';

const LandingPage: React.FC = () => {
  return (
    <StaticQuery
      query={graphql`
        query LandingPageQuery {
          allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { hide: { ne: true } } }) {
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
        const latestBlogs: BlogPostData[] = data.allMarkdownRemark.edges
          .map(({ node }) => node)
          .filter(isBlogPostData)
          .slice(0, 3);
        const latestProjects: ProjectData[] = data.allMarkdownRemark.edges
          .map(({ node }) => node)
          .filter(isProjectData)
          .slice(0, 2);
        return (
          <ContentContainer>
            <StyledLandingPage>
              <LandingPageTitle>Hi, I'm Niklas</LandingPageTitle>
              <p>
                This page contains a few of my <Link to={'/projects'}>projects</Link>. Nowadays, many of them are using the{' '}
                <a href={'https://www.rust-lang.org/'} target="_blank">
                  Rust programming language
                </a>{' '}
                and mostly concern the{' '}
                <a href={'https://bevyengine.org'} target="_blank">
                  game engine Bevy
                </a>
                .
              </p>
              <p>
                Sometimes I feel like writing a <Link to={'/blog'}>blog</Link> post about something...
              </p>
              <CenteredSubTitle>Latest projects:</CenteredSubTitle>
              <ProjectList projects={latestProjects} />
              <Link to={'/projects'}>
                See all projects <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <CenteredSubTitle>Latest posts:</CenteredSubTitle>
              <BlogPostList posts={latestBlogs} />
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

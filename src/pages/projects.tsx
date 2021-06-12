import { graphql } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../layouts/default';
import { ProjectList } from '../components/ProjectList/ProjectList';
import { ProjectLinksData } from '../components/ProjectLinks/ProjectLinks';

interface ProjectsProps {
  data: ProjectList;
}

const Projects: React.FC<PropsWithChildren<ProjectsProps>> = ({ data }) => {
  return <ProjectList posts={data.allMarkdownRemark.edges.map(({ node }) => node)} />;
};

export default withDefaultLayout(Projects);

interface ProjectList {
  allMarkdownRemark: {
    totalCount: number;
    edges: {
      node: ProjectData;
    }[];
  };
}

export interface ProjectData {
  id: string;
  frontmatter: {
    title: string;
    tags: string[];
    imageUrl?: string;
  } & ProjectLinksData;
  fields: {
    slug: string;
  };
  excerpt: string;
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { group: { eq: "projects" } }, frontmatter: { hide: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            tags
            github
            apple
            android
            privacy
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

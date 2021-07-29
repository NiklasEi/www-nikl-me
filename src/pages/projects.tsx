import { graphql } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../layouts/default';
import { ProjectList } from '../components/ProjectList/ProjectList';
import { ProjectLinksData } from '../components/ProjectLinks/ProjectLinks';
import { ContentContainer } from '../layouts/default.styled';
import { groupTags } from '../utilities/tags';
import { GroupedTags } from '../components/GroupedTags/GroupedTags';

interface ProjectsProps {
  data: ProjectListData;
}

const Projects: React.FC<PropsWithChildren<ProjectsProps>> = ({ data }) => {
  const projectData = data.allMarkdownRemark.edges.map(({ node }) => node);
  const groupedTags = groupTags(
    projectData.map((post) => ({
      ...post.frontmatter
    }))
  );
  projectData.sort((a, b) => a.frontmatter.update < b.frontmatter.update ? 1 : -1);
  return (
    <ContentContainer>
      <h1>Nikl's projects</h1>
      <GroupedTags groupedTags={groupedTags} />
      <ProjectList projects={projectData} />
    </ContentContainer>
  );
};

export default withDefaultLayout(Projects);

interface ProjectListData {
  allMarkdownRemark: {
    totalCount: number;
    edges: {
      node: ProjectData;
    }[];
  };
}

export interface ProjectData {
  id: string;
  frontmatter: ProjectFrontmatter;
  fields: {
    slug: string;
  };
  excerpt: string;
}

export type ProjectFrontmatter = ProjectFrontmatterData & ProjectLinksData;

interface ProjectFrontmatterData {
  title: string;
  update: string;
  tags: string[];
  cover: string | null;
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
            update
            cover
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

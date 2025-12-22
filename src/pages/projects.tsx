import { graphql } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../layouts/default';
import { ProjectList } from '../components/ProjectList/ProjectList';
import { ProjectLinksData } from '../components/ProjectLinks/ProjectLinks';
import { CenteredTitle, ContentContainer } from '../layouts/default.styled';
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

  return (
    <ContentContainer>
      <CenteredTitle>Nikl's projects</CenteredTitle>
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
  tags: string[];
  cover: string | null;
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { group: { eq: "projects" } }, frontmatter: { hidden: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            website
            date
            github
            apple
            spigot
            android
            privacy
            rubygem
            itch
            crate
            title
            tags
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

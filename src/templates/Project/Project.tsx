import React, { PropsWithChildren } from 'react';
import { graphql } from 'gatsby';
import withDefaultLayout from '../../layouts/default';
import { ProjectBody, ProjectTitle, StyledProject } from './Project.styles';

interface ProjectProps {
  data: ProjectData;
}

const Project: React.FC<PropsWithChildren<ProjectProps>> = ({ data }) => {
  const project = data.markdownRemark;
  return (
    <StyledProject>
      <ProjectTitle>{project.frontmatter.title}</ProjectTitle>
      <ProjectBody dangerouslySetInnerHTML={{ __html: project.html }} />
    </StyledProject>
  );
};

export default withDefaultLayout(Project);

interface ProjectData {
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

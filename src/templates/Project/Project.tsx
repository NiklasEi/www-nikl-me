import React, { PropsWithChildren } from 'react';
import { graphql } from 'gatsby';
import withDefaultLayout from '../../layouts/default';
import { ProjectBody, StyledProject } from './Project.styles';
import { ProjectLinks } from '../../components/ProjectLinks/ProjectLinks';
import { ProjectFrontmatter } from '../../pages/projects';
import { CenteredTitle } from '../../layouts/default.styled';
import Helmet from 'react-helmet';

interface ProjectProps {
  data: ProjectData;
}

const Project: React.FC<PropsWithChildren<ProjectProps>> = ({ data }) => {
  const project = data.markdownRemark;
  return (
    <>
      <Helmet
        title={project.frontmatter.title}
        meta={[
          { name: 'description', content: project.excerpt },
          { name: 'keywords', content: (project.frontmatter.tags ?? []).concat(['nikl', 'nikl.me']).join(', ') },
          { name: 'fediverse:creator', content: '@nikl_me@mastodon.online' }
        ]}
      />
      <StyledProject>
        <CenteredTitle>{project.frontmatter.title}</CenteredTitle>
        <ProjectLinks links={project.frontmatter} projectTitle={project.frontmatter.title} />
        <ProjectBody dangerouslySetInnerHTML={{ __html: project.html }} />
      </StyledProject>
    </>
  );
};

export default withDefaultLayout(Project);

interface ProjectData {
  markdownRemark: {
    html: string;
    frontmatter: ProjectFrontmatter;
    excerpt: string;
  };
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
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
      excerpt
    }
  }
`;

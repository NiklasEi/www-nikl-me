import React, { PropsWithChildren } from 'react';
import { graphql, HeadProps } from 'gatsby';
import withDefaultLayout from '../../layouts/default';
import { ProjectBody, StyledProject } from './Project.styles';
import { ProjectLinks } from '../../components/ProjectLinks/ProjectLinks';
import { ProjectFrontmatter } from '../../pages/projects';
import { CenteredTitle } from '../../layouts/default.styled';
import { Seo } from '../../components/Seo/Seo';

interface ProjectProps {
  data: ProjectData;
}

const Project: React.FC<PropsWithChildren<ProjectProps>> = ({ data }) => {
  const project = data.markdownRemark;
  return (
    <StyledProject>
      <CenteredTitle>{project.frontmatter.title}</CenteredTitle>
      <ProjectLinks links={project.frontmatter} projectTitle={project.frontmatter.title} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: the HTML is generated at build time from own markdown */}
      <ProjectBody dangerouslySetInnerHTML={{ __html: project.html }} />
    </StyledProject>
  );
};

export default withDefaultLayout(Project);

export const Head: React.FC<HeadProps<ProjectData>> = ({ data }) => {
  const project = data.markdownRemark;

  return <Seo title={project.frontmatter.title} description={project.excerpt} tags={project.frontmatter.tags ?? []} fediverseCreator />;
};

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
      excerpt
    }
  }
`;

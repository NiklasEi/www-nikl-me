import React from 'react';
import { ProjectData } from '../../pages/projects';
import { ContainerLink, ProjectContainer, ProjectHeader, StyledProject } from './ProjectPreview.styles';
import { ProjectLinks } from '../ProjectLinks/ProjectLinks';
import { StaticImage } from 'gatsby-plugin-image';

export const ProjectPreview: React.FC<ProjectData> = (project) => {
  return (
    <ProjectContainer>
      <ContainerLink to={project.fields.slug} />
      <StyledProject>
        {project.frontmatter.cover !== null ? (
          <StaticImage src="../../../static/projects/nikls-puzzles/icon.png" alt={'Nikls Puzzles logo'} />
        ) : undefined}
        <ProjectHeader>
          <h1>{project.frontmatter.title}</h1>
          <ProjectLinks links={project.frontmatter} projectTitle={project.frontmatter.title} />
        </ProjectHeader>
        <p>{project.excerpt}</p>
      </StyledProject>
    </ProjectContainer>
  );
};

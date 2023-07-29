import React from 'react';
import { ProjectData } from '../../pages/projects';
import { ContainerLink, ProjectContainer, ProjectTitle, StyledProject } from './ProjectPreview.styles';
import { ProjectLinks } from '../ProjectLinks/ProjectLinks';

export const ProjectPreview: React.FC<ProjectData> = (project) => {
  return (
    <ProjectContainer>
      <ContainerLink to={project.fields.slug} />
      <StyledProject>
        <ProjectTitle>{project.frontmatter.title}</ProjectTitle>
        <ProjectLinks links={project.frontmatter} projectTitle={project.frontmatter.title} />
        <p>{project.excerpt}</p>
      </StyledProject>
    </ProjectContainer>
  );
};

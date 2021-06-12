import React from 'react';
import { ProjectData } from '../../pages/projects';
import { ContainerLink, ProjectContainer, ProjectHeader, StyledProject } from './ProjectPreview.styles';
import { ProjectLinks } from '../ProjectLinks/ProjectLinks';

export const ProjectPreview: React.FC<ProjectData> = (project) => {
  return (
    <ProjectContainer>
      <ContainerLink to={project.fields.slug} />
      <StyledProject>
        <ProjectHeader>
          <h2>{project.frontmatter.title}</h2>
          <ProjectLinks links={project.frontmatter} projectTitle={project.frontmatter.title} />
        </ProjectHeader>
        <p>{project.excerpt}</p>
      </StyledProject>
    </ProjectContainer>
  );
};

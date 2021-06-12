import React from 'react';
import { Link } from 'gatsby';
import { ProjectData } from '../../pages/projects';
import { ProjectHeader, StyledProject } from './ProjectPreview.styles';
import { ProjectLinks } from '../ProjectLinks/ProjectLinks';

export const ProjectPreview: React.FC<ProjectData> = (project) => {
  return (
    <StyledProject>
      <Link to={project.fields.slug}>
        <ProjectHeader>
          <h2>{project.frontmatter.title}</h2>
          <ProjectLinks links={project.frontmatter} projectTitle={project.frontmatter.title} />
        </ProjectHeader>
        <p>{project.excerpt}</p>
      </Link>
    </StyledProject>
  );
};

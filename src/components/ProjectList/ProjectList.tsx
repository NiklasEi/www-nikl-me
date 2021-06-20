import React from 'react';
import { ProjectData } from '../../pages/projects';
import { ProjectPreview } from '../ProjectPreview/ProjectPreview';
import { StyledProjectPreviewList } from './ProjectList.styles';

interface ProjectListProps {
  projects: ProjectData[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div>
      <StyledProjectPreviewList>
        {projects.map((post) => (
          <ProjectPreview key={post.id} {...post} />
        ))}
      </StyledProjectPreviewList>
    </div>
  );
};

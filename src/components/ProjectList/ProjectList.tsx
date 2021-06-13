import React from 'react';
import { ProjectData } from '../../pages/projects';
import { groupTags } from '../../utilities/tags';
import { GroupedTags } from '../GroupedTags/GroupedTags';
import { ProjectPreview } from '../ProjectPreview/ProjectPreview';

interface ProjectListProps {
  projects: ProjectData[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const groupedTags = groupTags(
    projects.map((post) => ({
      ...post.frontmatter
    }))
  );
  return (
    <div>
      <h1>Nikl's projects</h1>
      <GroupedTags groupedTags={groupedTags} />
      {projects.map((post) => (
        <ProjectPreview key={post.id} {...post} />
      ))}
    </div>
  );
};

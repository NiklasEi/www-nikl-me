import React from 'react';
import { Link } from 'gatsby';
import { ProjectData } from '../../pages/projects';

export const Project: React.FC<ProjectData> = (project) => {
  return (
    <div>
      <Link to={project.fields.slug}>
        <h3>
          {project.frontmatter.title} <span>— {project.frontmatter.date}</span>
        </h3>
        <p>{project.excerpt}</p>
      </Link>
    </div>
  );
};

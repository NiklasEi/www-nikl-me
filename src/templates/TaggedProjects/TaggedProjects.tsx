import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../../layouts/default';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { ProjectData } from '../../pages/projects';
import { PageContext } from 'gatsby/internal';

interface TaggedProjectsProps {
  projects: ProjectData[];
  tag: string;
}

const TaggedProjects: React.FC<PropsWithChildren<PageContext>> = ({ pageContext }: { pageContext: TaggedProjectsProps }) => {
  console.dir(pageContext);
  return (
    <>
      <span>{`Tag: ${pageContext.tag}`}</span>
      <ProjectList projects={pageContext.projects} />
    </>
  );
};

export default withDefaultLayout(TaggedProjects);

import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../../layouts/default';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { ProjectData } from '../../pages/projects';
import { PageContext } from 'gatsby/internal';
import { ContentContainer } from '../../layouts/default.styled';
import { TaggedHeader } from './TaggedProjects.styles';

interface TaggedProjectsProps {
  projects: ProjectData[];
  tag: string;
}

const TaggedProjects: React.FC<PropsWithChildren<PageContext>> = ({ pageContext }: { pageContext: TaggedProjectsProps }) => {
  console.dir(pageContext);
  return (
    <ContentContainer>
      <TaggedHeader>{`Projects tagged '${pageContext.tag}'`}</TaggedHeader>
      <ProjectList projects={pageContext.projects} />
    </ContentContainer>
  );
};

export default withDefaultLayout(TaggedProjects);

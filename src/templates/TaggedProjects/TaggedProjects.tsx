import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../../layouts/default';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { ProjectData } from '../../pages/projects';
import { PageContext } from 'gatsby/internal';
import { CenteredTitle, ContentContainer } from '../../layouts/default.styled';

interface TaggedProjectsProps {
  projects: ProjectData[];
  tag: string;
}

const TaggedProjects: React.FC<PropsWithChildren<PageContext>> = ({ pageContext }: { pageContext: TaggedProjectsProps }) => {
  return (
    <ContentContainer>
      <CenteredTitle>{`Projects tagged '${pageContext.tag}'`}</CenteredTitle>
      <ProjectList projects={pageContext.projects} />
    </ContentContainer>
  );
};

export default withDefaultLayout(TaggedProjects);

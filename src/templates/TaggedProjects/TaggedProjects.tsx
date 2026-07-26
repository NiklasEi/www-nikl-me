import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../../layouts/default';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { ProjectData } from '../../pages/projects';
import { CenteredTitle, ContentContainer } from '../../layouts/default.styled';
import { Seo } from '../../components/Seo/Seo';

interface TaggedProjectsProps {
  projects: ProjectData[];
  tag: string;
}

interface TaggedProjectsPageProps extends PropsWithChildren {
  pageContext: TaggedProjectsProps;
}

const TaggedProjects: React.FC<TaggedProjectsPageProps> = ({ pageContext }) => {
  return (
    <ContentContainer>
      <CenteredTitle>{`Projects tagged '${pageContext.tag}'`}</CenteredTitle>
      <ProjectList projects={pageContext.projects} />
    </ContentContainer>
  );
};

export default withDefaultLayout(TaggedProjects);

export const Head: React.FC = () => <Seo />;

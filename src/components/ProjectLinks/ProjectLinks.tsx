import React from 'react';
import { ProjectLink, ProjectLinksContainer } from './ProjectLinks.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAndroid, faApple, faGithub } from '@fortawesome/free-brands-svg-icons';
import {faFaucet, faGem, faUserSecret} from '@fortawesome/free-solid-svg-icons';

export interface ProjectLinksData {
  github: string | null;
  apple: string | null;
  spigot: string | null;
  android: string | null;
  privacy: string | null;
  rubyGem: string | null;
}

interface ProjectLinksProps {
  links: ProjectLinksData;
  projectTitle: string;
}

export const ProjectLinks: React.FC<ProjectLinksProps> = ({ links, projectTitle }) => {
  function renderGithubLink() {
    if (links.github === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.github} target="_blank" title={`${projectTitle} on GitHub`}>
        <FontAwesomeIcon icon={faGithub} size={'lg'} />
      </ProjectLink>
    );
  }

  function renderAppleLink() {
    if (links.apple === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.apple} target="_blank" title={`${projectTitle} in the App store`}>
        <FontAwesomeIcon icon={faApple} size={'lg'} />
      </ProjectLink>
    );
  }

  function renderSpigotLink() {
    if (links.spigot === null) {
      return undefined;
    }

    return (
      <ProjectLink href={`https://www.spigotmc.org/resources/${links.spigot}`} target="_blank" title={`${projectTitle} on SpigotMC`}>
        <FontAwesomeIcon icon={faFaucet} size={'lg'} />
      </ProjectLink>
    );
  }

  function renderAndroidLink() {
    if (links.android === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.android} target="_blank" title={`${projectTitle} in the Play store`}>
        <FontAwesomeIcon icon={faAndroid} size={'lg'} />
      </ProjectLink>
    );
  }

  function renderPrivacyLink() {
    if (links.privacy === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.privacy} title={`${projectTitle} - Privacy`}>
        <FontAwesomeIcon icon={faUserSecret} size={'lg'} />
      </ProjectLink>
    );
  }

  function renderRubyGemLink() {
    if (links.rubyGem === null) {
      return undefined;
    }

    return (
        <ProjectLink href={`https://rubygems.org/gems/${links.rubyGem}`} target="_blank" title={`${projectTitle} on Ruby gems`}>
          <FontAwesomeIcon icon={faGem} size={'lg'} />
        </ProjectLink>
    );
  }

  return (
    <ProjectLinksContainer>
      {renderGithubLink()}
      {renderAndroidLink()}
      {renderAppleLink()}
      {renderSpigotLink()}
      {renderPrivacyLink()}
      {renderRubyGemLink()}
    </ProjectLinksContainer>
  );
};

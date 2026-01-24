import React from 'react';
import { ProjectLink, ProjectLinksContainer } from './ProjectLinks.styles';
import ItchIcon from '../../icons/itchio.svg';
import { FaAndroid, FaApple, FaBox, FaFaucet, FaGem, FaGithub, FaGlobe, FaUserSecret } from 'react-icons/fa6';

export interface ProjectLinksData {
  website: string | null;
  github: string | null;
  apple: string | null;
  spigot: string | null;
  android: string | null;
  privacy: string | null;
  rubygem: string | null;
  itch: string | null;
  crate: string | null;
}

interface ProjectLinksProps {
  links: ProjectLinksData;
  projectTitle: string;
}

export const ProjectLinks: React.FC<ProjectLinksProps> = ({ links, projectTitle }) => {
  function renderWebsiteLink() {
    if (links.website === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.website} target="_blank" title={`Website of ${projectTitle}`}>
        <FaGlobe size={20} />
      </ProjectLink>
    );
  }

  function renderGithubLink() {
    if (links.github === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.github} target="_blank" title={`${projectTitle} on GitHub`}>
        <FaGithub size={20} />
      </ProjectLink>
    );
  }

  function renderAppleLink() {
    if (links.apple === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.apple} target="_blank" title={`${projectTitle} in the App store`}>
        <FaApple size={20} />
      </ProjectLink>
    );
  }

  function renderSpigotLink() {
    if (links.spigot === null) {
      return undefined;
    }

    return (
      <ProjectLink href={`https://www.spigotmc.org/resources/${links.spigot}`} target="_blank" title={`${projectTitle} on SpigotMC`}>
        <FaFaucet size={20} />
      </ProjectLink>
    );
  }

  function renderAndroidLink() {
    if (links.android === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.android} target="_blank" title={`${projectTitle} in the Play store`}>
        <FaAndroid size={20} />
      </ProjectLink>
    );
  }

  function renderPrivacyLink() {
    if (links.privacy === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.privacy} title={`${projectTitle} - Privacy`}>
        <FaUserSecret size={20} />
      </ProjectLink>
    );
  }

  function renderRubyGemLink() {
    if (links.rubygem === null) {
      return undefined;
    }

    return (
      <ProjectLink href={`https://rubygems.org/gems/${links.rubygem}`} target="_blank" title={`${projectTitle} on Ruby gems`}>
        <FaGem size={20} />
      </ProjectLink>
    );
  }

  function renderItchIoLink() {
    if (links.itch === null) {
      return undefined;
    }

    return (
      <ProjectLink href={links.itch} target="_blank" title={`${projectTitle} on Itch.io`}>
        <ItchIcon />
      </ProjectLink>
    );
  }

  function renderCratesIoLink() {
    if (links.crate === null) {
      return undefined;
    }

    return (
      <ProjectLink href={`https://crates.io/crates/${links.crate}`} target="_blank" title={`${projectTitle} on crates.io`}>
        <FaBox size={20} />
      </ProjectLink>
    );
  }

  return (
    <ProjectLinksContainer>
      {renderWebsiteLink()}
      {renderGithubLink()}
      {renderAndroidLink()}
      {renderAppleLink()}
      {renderSpigotLink()}
      {renderPrivacyLink()}
      {renderRubyGemLink()}
      {renderItchIoLink()}
      {renderCratesIoLink()}
    </ProjectLinksContainer>
  );
};

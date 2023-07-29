import React from 'react';
import {graphql, StaticQuery} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub, faLinkedin, faMastodon } from '@fortawesome/free-brands-svg-icons';
import {ContactLink, Copyright, FooterContent, RssLink, StyledFooter, Contacts} from './Footer.styles';
import { faEnvelopeOpenText, faRssSquare } from '@fortawesome/free-solid-svg-icons';

interface StaticQueryProps {
  site: {
    siteMetadata: {
      author: {
        email: string;
        firstName: string;
        social: {
          github: string;
          discord: string;
          linkedin: string;
          mastodon: string;
        };
      };
    };
  };
}

const Footer: React.FC = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          site {
            siteMetadata {
              author {
                email
                firstName
                social {
                  github
                  discord
                  linkedin
                  mastodon
                }
              }
            }
          }
        }
      `}
      render={(data: StaticQueryProps) => (
        <StyledFooter>
          <FooterContent>
          <RssLink to={"/rss.xml"}><FontAwesomeIcon icon={faRssSquare} title={"RSS Feed for Nikl's blog"} /></RssLink>
          <Contacts>
            <ContactLink
              href={data.site.siteMetadata.author.social.mastodon}
              target="_blank"
              rel="me"
              title={`${data.site.siteMetadata.author.firstName} on Mastodon`}
            >
              <FontAwesomeIcon icon={faMastodon} />
            </ContactLink>
            <ContactLink
              href={`https://github.com/${data.site.siteMetadata.author.social.github}`}
              target="_blank"
              title={`${data.site.siteMetadata.author.firstName} on GitHub`}
            >
              <FontAwesomeIcon icon={faGithub} />
            </ContactLink>
            <ContactLink
              href={`https://discord.gg/${data.site.siteMetadata.author.social.discord}`}
              target="_blank"
              title={`${data.site.siteMetadata.author.firstName}' Discord server`}
            >
              <FontAwesomeIcon icon={faDiscord} />
            </ContactLink>
            <ContactLink
              href={`https://www.linkedin.com/in/${data.site.siteMetadata.author.social.linkedin}`}
              target="_blank"
              title={`${data.site.siteMetadata.author.firstName} on LinkedIn`}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </ContactLink>
            <ContactLink
              href={`mailto:${data.site.siteMetadata.author.email}`}
              title={`Send ${data.site.siteMetadata.author.firstName} an e-mail`}
            >
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </ContactLink>
          </Contacts>
          <Copyright>Nikl.me © 2022</Copyright>
          </FooterContent>
        </StyledFooter>
      )}
    />
  );
};

export default Footer;

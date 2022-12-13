import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub, faLinkedin, faMastodon, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ContactLink, Copyright, StyledFooter } from './Footer.styles';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

interface StaticQueryProps {
  site: {
    siteMetadata: {
      author: {
        email: string;
        firstName: string;
        social: {
          github: string;
          discord: string;
          twitter: string;
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
                  twitter
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
          <div>
            <ContactLink
              href={data.site.siteMetadata.author.social.mastodon}
              target="_blank"
              rel="me"
              title={`${data.site.siteMetadata.author.firstName} on Mastodon`}
            >
              <FontAwesomeIcon icon={faMastodon} />
            </ContactLink>
            <ContactLink
              href={`https://twitter.com/${data.site.siteMetadata.author.social.twitter}`}
              target="_blank"
              title={`${data.site.siteMetadata.author.firstName} on Twitter`}
            >
              <FontAwesomeIcon icon={faTwitter} />
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
          </div>
          <Copyright>Nikl.me © 2022</Copyright>
        </StyledFooter>
      )}
    />
  );
};

export default Footer;

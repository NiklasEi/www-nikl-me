import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import { FaDiscord, FaGithub, FaLinkedin, FaMastodon, FaEnvelopeOpenText, FaRssSquare } from 'react-icons/fa';
import { ContactLink, Copyright, FooterContent, RssLink, StyledFooter, Contacts } from './Footer.styles';

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
            <RssLink>
              <Link to={'/rss.xml'} title={"RSS Feed for Nikl's blog"}>
                <FaRssSquare />
              </Link>
            </RssLink>
            <Contacts>
              <ContactLink
                href={data.site.siteMetadata.author.social.mastodon}
                target="_blank"
                rel="me"
                title={`${data.site.siteMetadata.author.firstName} on Mastodon`}
              >
                <FaMastodon />
              </ContactLink>
              <ContactLink
                href={`https://github.com/${data.site.siteMetadata.author.social.github}`}
                target="_blank"
                title={`${data.site.siteMetadata.author.firstName} on GitHub`}
              >
                <FaGithub />
              </ContactLink>
              <ContactLink
                href={`https://discord.gg/${data.site.siteMetadata.author.social.discord}`}
                target="_blank"
                title={`${data.site.siteMetadata.author.firstName}' Discord server`}
              >
                <FaDiscord />
              </ContactLink>
              <ContactLink
                href={`https://www.linkedin.com/in/${data.site.siteMetadata.author.social.linkedin}`}
                target="_blank"
                title={`${data.site.siteMetadata.author.firstName} on LinkedIn`}
              >
                <FaLinkedin />
              </ContactLink>
              <ContactLink
                href={`mailto:${data.site.siteMetadata.author.email}`}
                title={`Send ${data.site.siteMetadata.author.firstName} an e-mail`}
              >
                <FaEnvelopeOpenText />
              </ContactLink>
            </Contacts>
            <Copyright>Nikl.me © 2026</Copyright>
          </FooterContent>
        </StyledFooter>
      )}
    />
  );
};

export default Footer;

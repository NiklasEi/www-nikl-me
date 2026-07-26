import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { FaDiscord, FaGithub, FaLinkedin, FaBluesky, FaEnvelopeOpenText, FaSquareRss } from 'react-icons/fa6';
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
          bluesky: string;
        };
      };
    };
  };
}

const Footer: React.FC = () => {
  const data: StaticQueryProps = useStaticQuery(graphql`
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
              bluesky
            }
          }
        }
      }
    }
  `);
  const { email, firstName, social } = data.site.siteMetadata.author;

  return (
    <StyledFooter>
      <FooterContent>
        <RssLink>
          <Link to={'/rss.xml'} title={"RSS Feed for Nikl's blog"}>
            <FaSquareRss />
          </Link>
        </RssLink>
        <Contacts>
          <ContactLink href={social.bluesky} target="_blank" rel="me" title={`${firstName} on BlueSky`}>
            <FaBluesky />
          </ContactLink>
          <ContactLink href={`https://github.com/${social.github}`} target="_blank" title={`${firstName} on GitHub`}>
            <FaGithub />
          </ContactLink>
          <ContactLink href={`https://discord.gg/${social.discord}`} target="_blank" title={`${firstName}' Discord server`}>
            <FaDiscord />
          </ContactLink>
          <ContactLink href={`https://www.linkedin.com/in/${social.linkedin}`} target="_blank" title={`${firstName} on LinkedIn`}>
            <FaLinkedin />
          </ContactLink>
          <ContactLink href={`mailto:${email}`} title={`Send ${firstName} an e-mail`}>
            <FaEnvelopeOpenText />
          </ContactLink>
        </Contacts>
        <Copyright>Nikl.me © 2026</Copyright>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;

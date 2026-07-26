import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      keywords: string;
    };
  };
}

interface SeoProps {
  title?: string;
  description?: string;
  tags?: string[];
  fediverseCreator?: boolean;
}

export const Seo: React.FC<SeoProps> = ({ title, description, tags, fediverseCreator = false }) => {
  const data: StaticQueryProps = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          keywords
        }
      }
    }
  `);
  const siteMetadata = data.site.siteMetadata;

  return (
    <>
      <title>{title ?? siteMetadata.title}</title>
      <meta name="description" content={description ?? siteMetadata.description} />
      <meta name="keywords" content={tags ? tags.concat(['nikl', 'nikl.me']).join(', ') : siteMetadata.keywords} />
      {fediverseCreator && <meta name="fediverse:creator" content="@nikl_me@mastodon.online" />}
    </>
  );
};

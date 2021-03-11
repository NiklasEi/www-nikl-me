import { graphql, Link } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../layouts/default';
import { groupTags } from '../utilities/tags';

interface ProjectsProps {
  data: ProjectData;
}

const Projects: React.FC<PropsWithChildren<ProjectsProps>> = ({ data }) => {
  const groupedTags = groupTags(
    data.allMarkdownRemark.edges.map(({ node }) => ({
      ...node.frontmatter
    }))
  );
  return (
    <div>
      <h1>Nikl's projects</h1>
      {groupedTags.map((groupedTag) => (
        <div>
          <span>
            {groupedTag.tag}({groupedTag.count})
          </span>
        </div>
      ))}
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug}>
            <h3>
              {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default withDefaultLayout(Projects);

interface ProjectData {
  allMarkdownRemark: {
    totalCount: number;
    edges: {
      node: {
        id: string;
        frontmatter: {
          title: string;
          date: string;
          tags: string[];
          github?: string;
          apple?: string;
          android?: string;
          privacy?: string;
        };
        fields: {
          slug: string;
        };
        excerpt: string;
      };
    }[];
  };
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { group: { eq: "projects" } }, frontmatter: { hide: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            tags
            github
            apple
            android
            privacy
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

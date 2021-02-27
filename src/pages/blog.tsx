import { graphql, Link } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import withDefaultLayout from '../layouts/default';

interface BlogProps {
  data: BlogData;
}

const Blog: React.FC<PropsWithChildren<BlogProps>> = ({ data }) => {
  return (
    <div>
      <h1>Nikl's thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
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

export default withDefaultLayout(Blog);

interface BlogData {
  allMarkdownRemark: {
    totalCount: number;
    edges: {
      node: {
        id: string;
        frontmatter: {
          title: string;
          date: string;
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
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

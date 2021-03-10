import { CreateNodeArgs, CreatePagesArgs } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import * as path from 'path';

export const onCreateNode = ({ node, getNode, actions }: CreateNodeArgs) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent!);
    switch (fileNode.sourceInstanceName) {
      case 'blog': {
        const basePath = 'blog';
        const slug = createFilePath({ node, getNode });
        createNodeField({
          node,
          name: `slug`,
          value: `/${basePath}${slug}`
        });
        return;
      }
      case 'projects': {
        const basePath = 'projects';
        const slug = createFilePath({ node, getNode });
        createNodeField({
          node,
          name: `slug`,
          value: `/${basePath}${slug}`
        });
        return;
      }
    }
  }
};

interface AllMarkdown {
  allMarkdownRemark: {
    edges: MarkdownNode[];
  };
}

interface MarkdownNode {
  node: {
    fields: {
      slug: string;
    };
  };
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;
  const result = await graphql<AllMarkdown>(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.data === undefined) {
    console.error('Failed to query markdown');
    return;
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/BlogPost/BlogPost.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug
      }
    });
  });
};

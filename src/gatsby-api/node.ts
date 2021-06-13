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
        break;
      }
      case 'projects': {
        const basePath = 'projects';
        const slug = createFilePath({ node, getNode });
        createNodeField({
          node,
          name: `slug`,
          value: `/${basePath}${slug}`
        });
        break;
      }
    }
    createNodeField({
      node,
      name: `group`,
      value: fileNode.sourceInstanceName ?? ''
    });
  }
};

interface AllMarkdown {
  allMarkdownRemark: {
    edges: MarkdownNode[];
  };
}

interface MarkdownNode {
  node: {
    parent: {
      id: string;
    };
    fields: {
      slug: string;
    };
  };
}

export const createPages = async (args: CreatePagesArgs) => {
  await createBlogPostsAndProjects(args);
};

const createBlogPostsAndProjects = async ({ graphql, actions, getNode }: CreatePagesArgs) => {
  const { createPage } = actions;
  const result = await graphql<AllMarkdown>(`
    query {
      allMarkdownRemark {
        edges {
          node {
            parent {
              id
            }
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
    const fileNode = getNode(node.parent.id!);
    switch (fileNode.sourceInstanceName) {
      case 'blog':
        {
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/BlogPost/BlogPost.tsx`),
            context: {
              slug: node.fields.slug
            }
          });
        }
        break;
      case 'projects': {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/Project/Project.tsx`),
          context: {
            slug: node.fields.slug
          }
        });
        break;
      }
    }
  });
};

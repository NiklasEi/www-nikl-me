import { CreateNodeArgs, CreatePagesArgs } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import * as path from 'path';
import { ProjectData } from '../pages/projects';

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

interface AllMarkdownWithTags {
  allMarkdownRemark: {
    edges: MarkdownNode<{ tags?: string[] }>[];
  };
}

interface AllMarkdown {
  allMarkdownRemark: {
    edges: MarkdownNode[];
  };
}

interface MarkdownNode<T = {}> {
  node: {
    id: string;
    parent: {
      id: string;
    };
    fields: {
      slug: string;
    };
    frontmatter: T;
  };
}

export const createPages = async (args: CreatePagesArgs) => {
  await createBlogPostsAndProjects(args);
  await createTagPages(args);
};

const createTagPages = async (args: CreatePagesArgs) => {
  const { graphql, getNode } = args;
  const result = await graphql<AllMarkdownWithTags>(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            parent {
              id
            }
            frontmatter {
              tags
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
  let projects = new Map<string, string[]>();
  let blogPosts = new Map<string, string[]>();
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const fileNode = getNode(node.parent.id!);
    switch (fileNode.sourceInstanceName) {
      case 'blog':
        {
          node.frontmatter.tags?.forEach((tag) => {
            if (blogPosts.has(tag)) {
              blogPosts.get(tag)?.push(node.id);
            } else {
              blogPosts.set(tag, [node.id]);
            }
          });
        }
        break;
      case 'projects':
        {
          node.frontmatter.tags?.forEach((tag) => {
            if (projects.has(tag)) {
              projects.get(tag)?.push(node.id);
            } else {
              projects.set(tag, [node.id]);
            }
          });
        }
        break;
    }
  });
  await createProjects(projects, args);
  // ToDo: group blog posts (categories + tags?)
  // await createBlogPosts();
};

interface TaggedProjectList {
  allMarkdownRemark: {
    edges: {
      node: ProjectData;
    }[];
  };
}

const createProjects = async (posts: Map<string, string[]>, args: CreatePagesArgs) => {
  const { graphql, actions } = args;
  const { createPage } = actions;
  const projects = await graphql<TaggedProjectList>(
    `
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___title], order: DESC }) {
          edges {
            node {
              id
              frontmatter {
                title
                tags
                github
                apple
                spigot
                android
                privacy
                rubygem
                itch
                crate
                cover
              }
              fields {
                slug
              }
              excerpt
            }
          }
        }
      }
    `
  );

  if (projects.data === undefined) {
    console.error(`Failed to get projects`);
    return;
  }
  for (let tag of posts.keys()) {
    let nodeIds = posts.get(tag) ?? [];
    const taggedProjects = projects.data.allMarkdownRemark.edges.map(({ node }) => node).filter((node) => nodeIds.includes(node.id));

    createPage({
      path: `/projects/tag/${tag}`,
      component: path.resolve(`./src/templates/TaggedProjects/TaggedProjects.tsx`),
      context: {
        tag,
        projects: taggedProjects
      }
    });
  }
};

const createBlogPostsAndProjects = async ({ graphql, actions, getNode }: CreatePagesArgs) => {
  const { createPage } = actions;
  const result = await graphql<AllMarkdown>(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
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

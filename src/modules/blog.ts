export interface BlogListData {
  allMarkdownRemark: {
    totalCount: number;
    edges: {
      node: BlogPostData;
    }[];
  };
}

export interface BlogPostData {
  id: string;
  frontmatter: {
    title: string;
    date: string;
  };
  fields: {
    slug: string;
  };
  excerpt: string;
}

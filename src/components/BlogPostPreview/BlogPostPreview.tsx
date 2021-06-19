import React from 'react';
import { Link } from 'gatsby';
import { BlogPostData } from '../../modules/blog';

export const BlogPostPreview: React.FC<BlogPostData> = (post) => {
  return (
    <div>
      <Link to={post.fields.slug}>
        <h3>
          {post.frontmatter.title} <span>— {post.frontmatter.date}</span>
        </h3>
        <p>{post.excerpt}</p>
      </Link>
    </div>
  );
};

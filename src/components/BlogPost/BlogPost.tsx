import React from 'react';
import { BlogPostData } from '../../pages/blog';
import { Link } from 'gatsby';

export const BlogPost: React.FC<BlogPostData> = (post) => {
  return (
    <div key={post.id}>
      <Link to={post.fields.slug}>
        <h3>
          {post.frontmatter.title} <span>— {post.frontmatter.date}</span>
        </h3>
        <p>{post.excerpt}</p>
      </Link>
    </div>
  );
};

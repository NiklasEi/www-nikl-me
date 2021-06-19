import React from 'react';
import { BlogPostPreview } from '../BlogPostPreview/BlogPostPreview';
import { BlogPostData } from '../../modules/blog';

interface BlogPostListProps {
  posts: BlogPostData[];
}

export const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
  return (
    <div>
      <h1>Blog posts</h1>
      {posts.map((post) => (
        <BlogPostPreview {...post} key={post.id} />
      ))}
    </div>
  );
};

import React from 'react';
import { BlogPostData } from '../../pages/blog';
import { BlogPost } from '../BlogPost/BlogPost';

interface BlogPostListProps {
  posts: BlogPostData[];
}

export const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
  return (
    <div>
      <h1>Blog posts</h1>
      {posts.map((post) => (
        <BlogPost {...post} key={post.id} />
      ))}
    </div>
  );
};

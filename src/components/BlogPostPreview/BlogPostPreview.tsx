import React from 'react';
import { BlogPostData } from '../../modules/blog';
import { PostContainer, PostHeader } from './BlogPostPreview.styles';
import { ContainerLink } from '../ProjectPreview/ProjectPreview.styles';

export const BlogPostPreview: React.FC<BlogPostData> = (post) => {
  return (
    <PostContainer>
      <ContainerLink to={post.fields.slug} />
      <PostHeader>
        <h1>{post.frontmatter.title}</h1>
        <span>{post.frontmatter.date}</span>
      </PostHeader>
      <p>{post.excerpt}</p>
    </PostContainer>
  );
};

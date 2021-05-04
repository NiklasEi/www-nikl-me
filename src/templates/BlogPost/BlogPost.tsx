import React, {PropsWithChildren, useEffect, useState} from 'react';
import { graphql } from 'gatsby';
import withDefaultLayout from '../../layouts/default';
import { BlogBody, BlogPostTitle, StyledBlogPost } from './BlogPost.styles';
import { NiklsDiscussions } from '../../../../nikls-discussions/build';

interface BlogEntryProps {
  data: BlogEntryData;
}

const BlogPost: React.FC<PropsWithChildren<BlogEntryProps>> = ({ data }) => {
    const [comment, setComment] = useState('');
    let discussion:NiklsDiscussions;

    useEffect(() => {
        discussion = new NiklsDiscussions("www-nikl-me", "NiklasEi", 8);
    }, [])

    const onChange = (event: any) => {
        setComment(event.target.value);
    };
    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log(`sending comment ${comment}`);
        const result = await discussion?.createComment(comment);
        console.log("done");

        console.dir(result);
    };
  const post = data.markdownRemark;
  return (
    <StyledBlogPost>
      <BlogPostTitle>{post.frontmatter.title}</BlogPostTitle>
      <BlogBody dangerouslySetInnerHTML={{ __html: post.html }} />
      <form action={"#"} onSubmit={onSubmit}>
        <textarea value={comment} onChange={onChange}/>
        <button type={"submit"}>Comment</button>
      </form>
    </StyledBlogPost>
  );
};

export default withDefaultLayout(BlogPost);

interface BlogEntryData {
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
    };
  };
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

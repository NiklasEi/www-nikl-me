import React from 'react';
import { FaTag } from 'react-icons/fa6';
import { TagContainer, TagName } from './Tag.styles';

export interface OuterProps {
  name: string;
}

export const Tag: React.FC<OuterProps> = ({ name }) => {
  return (
    <TagContainer>
      <FaTag />
      <TagName>{name}</TagName>
    </TagContainer>
  );
};

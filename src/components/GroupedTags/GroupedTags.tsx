import React from 'react';
import { TagGroup } from '../../utilities/tags';
import { Tag, TagsContainer } from './GroupedTags.styles';

export interface OuterProps {
  groupedTags: TagGroup[];
}

export const GroupedTags: React.FC<OuterProps> = ({ groupedTags }) => {
  return (
    <TagsContainer>
      {groupedTags.map((groupedTag) => (
        <Tag>
          <span>
            {groupedTag.tag}({groupedTag.count})
          </span>
        </Tag>
      ))}
    </TagsContainer>
  );
};

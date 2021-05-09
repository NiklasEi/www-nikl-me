import React from 'react';
import { TagGroup } from '../../utilities/tags';
import { TagsContainer } from './GroupedTags.styles';
import { Tile } from '../Tile/Tile';
import { Tag } from '../Tag/Tag';

export interface OuterProps {
  groupedTags: TagGroup[];
}

export const GroupedTags: React.FC<OuterProps> = ({ groupedTags }) => {
  return (
    <TagsContainer>
      {groupedTags.map((groupedTag) => (
        <Tile left={<Tag name={groupedTag.tag} />} right={<span>{groupedTag.count}</span>} />
      ))}
    </TagsContainer>
  );
};

import React from 'react';
import { TagGroup } from '../../utilities/tags';
import { Row, TagCount, TagsContainer } from './GroupedTags.styles';
import { Tile } from '../Tile/Tile';
import { Tag } from '../Tag/Tag';

export interface OuterProps {
  groupedTags: TagGroup[];
}

export const GroupedTags: React.FC<OuterProps> = ({ groupedTags }) => {
  return (
    <TagsContainer>
      {groupedTags.map((groupedTag) => (
        <Tile link={`/projects/tag/${groupedTag.tag}`} key={groupedTag.tag}>
          <Row>
            <Tag name={groupedTag.tag} />
            <TagCount>{groupedTag.count}</TagCount>
          </Row>
        </Tile>
      ))}
    </TagsContainer>
  );
};

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { TagName } from './Tag.styles';

export interface OuterProps {
  name: string;
}

export const Tag: React.FC<OuterProps> = ({ name }) => {
  return (
    <div>
      <FontAwesomeIcon icon={faTag} />
      <TagName>{name}</TagName>
    </div>
  );
};

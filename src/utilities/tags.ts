import { ProjectFrontmatter } from '../pages/projects';

export interface TagGroup {
  tag: string;
  count: number;
}

export function groupTags(projects: ProjectFrontmatter[]): TagGroup[] {
  let tags: TagGroup[] = [];
  for (const currentProject of projects) {
    for (const tag of currentProject.tags) {
      let current = tags.find((tagGroup) => tagGroup.tag === tag);
      if (current === undefined) {
        tags.push({ tag, count: 1 });
      } else {
        tags = [...tags.filter((tagGroup) => tagGroup.tag !== tag), { tag, count: current.count + 1 }];
      }
    }
  }
  tags.sort((a, b) => b.count - a.count);
  return tags;
}

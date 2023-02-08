import type { CollectionItem } from '../../types/eleventy.js';

export function firstWithTag(tag: string, items: CollectionItem[]): CollectionItem | undefined {
  return items?.find(item => {
    return !!item.data?.tags?.find(itemTag => itemTag === tag);
  });
}

export function findByTag(tag: string, items: CollectionItem[]): CollectionItem[] {
  const results = items?.filter(item => {
    return !!item.data?.tags?.find(itemTag => itemTag === tag);
  });
  return [...results];
}

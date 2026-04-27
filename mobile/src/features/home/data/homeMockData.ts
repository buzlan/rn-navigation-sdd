import { mockListItems } from '@shared/data/mockFactory';
import type { MockListItem } from '@shared/data/mockFactory';

export type HomeListItem = MockListItem;

export const HOME_LIST_ITEMS: HomeListItem[] = mockListItems(8, 'home');

export function getHomeItemById(itemId: string): HomeListItem | undefined {
  return HOME_LIST_ITEMS.find((item) => item.id === itemId);
}

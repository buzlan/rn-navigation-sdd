/**
 * Deterministic mock data for upcoming Home list/details and shared-screen flows.
 * Same inputs always produce the same objects (no randomness, no I/O).
 */

export type MockListItem = {
  id: string;
  title: string;
  summary: string;
};

export type MockSharedInfo = {
  id: string;
  title: string;
  body: string;
  sourcePath: string;
};

/** Simple stable hash for string -> small non-negative integer (not cryptographic). */
function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const TITLE_PREFIXES = ['Note', 'Guide', 'Spotlight', 'Walkthrough', 'Checklist'] as const;

/**
 * A single list row for a stable id (e.g. route param / deep-link key).
 */
export function mockListItemForId(id: string): MockListItem {
  const h = hashString(id);
  const label = TITLE_PREFIXES[h % TITLE_PREFIXES.length];
  return {
    id,
    title: `${label} ${h % 1000}`,
    summary: `Deterministic summary for "${id}" (${h % 200} words).`
  };
}

/**
 * Build `count` list items with ids `${idPrefix}-0` … `${idPrefix}-${count - 1}`.
 */
export function mockListItems(count: number, idPrefix = 'item'): MockListItem[] {
  return Array.from({ length: count }, (_, i) => mockListItemForId(`${idPrefix}-${i}`));
}

/**
 * Shared-info document for a given entry path (e.g. "home" vs "drawer").
 */
export function mockSharedInfoForPath(sourcePath: string): MockSharedInfo {
  const h = hashString(sourcePath);
  return {
    id: `shared-${sourcePath.replace(/[^\w-]+/g, '-') || 'root'}`,
    title: 'Shared information',
    body:
      `This is deterministic mock content for source path "${sourcePath}".\n` +
      `Ref hash: ${h % 10_000}. Use the same path to get the same text.`,
    sourcePath
  };
}

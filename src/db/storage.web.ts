/**
 * Web version of storage.ts: the same text-file API, kept in localStorage
 * under the "expense-journal:" prefix. Metro picks this file for web builds.
 */
const PREFIX = 'expense-journal:';

const store = (): Storage | null => (typeof localStorage === 'undefined' ? null : localStorage);

export const readText = async (path: string): Promise<string | null> =>
  store()?.getItem(PREFIX + path) ?? null;

export const writeText = async (path: string, content: string): Promise<void> => {
  store()?.setItem(PREFIX + path, content);
};

/** File names (not paths) directly inside `dir`, e.g. listFiles('notes/') -> ['2026-11-15.md']. */
export const listFiles = async (dir: string): Promise<string[]> => {
  const s = store();
  if (!s) return [];
  const names: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const key = s.key(i);
    if (!key?.startsWith(PREFIX + dir)) continue;
    const name = key.slice((PREFIX + dir).length);
    if (name && !name.includes('/')) names.push(name);
  }
  return names;
};

export const deleteFile = async (path: string): Promise<void> => {
  store()?.removeItem(PREFIX + path);
};

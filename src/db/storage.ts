/**
 * Small text-file store used by DB.ts and SettingsManager.ts.
 *
 * Paths are relative, e.g. "notes/2026-11-15.md" or "settings.json".
 * On iOS / Android they live in the app's document directory (this file);
 * on the web Metro picks storage.web.ts, which keeps them in localStorage.
 */
import * as FileSystem from 'expo-file-system';

const BASE = FileSystem.documentDirectory ?? '';

const ensureDir = async (dir: string) => {
  const uri = BASE + dir;
  const info = await FileSystem.getInfoAsync(uri);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
  }
};

const parentDir = (path: string) => path.slice(0, path.lastIndexOf('/') + 1);

export const readText = async (path: string): Promise<string | null> => {
  const uri = BASE + path;
  const info = await FileSystem.getInfoAsync(uri);
  if (!info.exists) return null;
  return FileSystem.readAsStringAsync(uri);
};

export const writeText = async (path: string, content: string): Promise<void> => {
  const dir = parentDir(path);
  if (dir) await ensureDir(dir);
  await FileSystem.writeAsStringAsync(BASE + path, content);
};

/** File names (not paths) directly inside `dir`, e.g. listFiles('notes/') -> ['2026-11-15.md']. */
export const listFiles = async (dir: string): Promise<string[]> => {
  await ensureDir(dir);
  return FileSystem.readDirectoryAsync(BASE + dir);
};

export const deleteFile = async (path: string): Promise<void> => {
  await FileSystem.deleteAsync(BASE + path, { idempotent: true });
};

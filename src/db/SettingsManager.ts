import { readText, writeText } from './storage';

const SETTINGS_FILE = 'settings.json';

const DEFAULT_LABELS = ['market', 'yemek', 'fatura', 'kira', 'maas', 'eglence', 'ulasim', 'diger'];

export const saveThemeColor = async (color: string) => {
  const settings = await getSettings();
  settings.accentColor = color;
  await saveSettings(settings);
};

export const getThemeColor = async () => {
  const settings = await getSettings();
  return settings.accentColor || '#03DAC6';
};

export const saveLabels = async (labels: string[]) => {
  const settings = await getSettings();
  settings.labels = labels;
  await saveSettings(settings);
};

export const getLabels = async () => {
  const settings = await getSettings();
  return settings.labels || DEFAULT_LABELS;
};

export const saveLanguage = async (language: string) => {
  const settings = await getSettings();
  settings.language = language;
  await saveSettings(settings);
};

export const getLanguage = async (): Promise<string | undefined> => {
  const settings = await getSettings();
  return settings.language;
};

const getSettings = async () => {
  try {
    const content = await readText(SETTINGS_FILE);
    return content ? JSON.parse(content) : {};
  } catch {
    return {};
  }
};

const saveSettings = async (settings: any) => {
  try {
    await writeText(SETTINGS_FILE, JSON.stringify(settings));
  } catch (e) {
    console.error('Ayarlar kaydedilemedi:', e);
  }
};

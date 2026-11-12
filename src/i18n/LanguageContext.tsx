import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getLanguage, saveLanguage } from '@/src/db/SettingsManager';
import { Language, Translation, translations, detectDeviceLanguage } from './translations';

interface LanguageContextValue {
  language: Language;
  t: Translation;
  setLanguage: (language: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'tr',
  t: translations.tr,
  setLanguage: async () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(detectDeviceLanguage());

  useEffect(() => {
    getLanguage().then((stored) => {
      if (stored === 'tr' || stored === 'en') setLanguageState(stored);
    });
  }, []);

  const setLanguage = useCallback(async (next: Language) => {
    setLanguageState(next);
    await saveLanguage(next);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, t: translations[language], setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

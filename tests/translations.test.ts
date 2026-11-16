import { detectDeviceLanguage, LANGUAGES, translations } from '@/src/i18n/translations';

describe('translations', () => {
  const { tr, en } = translations;

  it('has the same keys in Turkish and English', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(tr).sort());
  });

  it('has no empty strings', () => {
    for (const lang of [tr, en]) {
      const empty = Object.entries(lang).filter(([, v]) => typeof v === 'string' && !v.trim());
      expect(empty).toEqual([]);
    }
  });

  it('offers a picker entry for every language', () => {
    expect(LANGUAGES.map((l) => l.code).sort()).toEqual(Object.keys(translations).sort());
  });

  it('uses a valid locale for number and date formatting', () => {
    for (const lang of [tr, en]) {
      expect(() => new Intl.NumberFormat(lang.locale).format(1234.5)).not.toThrow();
    }
  });
});

describe('detectDeviceLanguage', () => {
  const realIntl = global.Intl;
  afterEach(() => {
    global.Intl = realIntl;
  });

  const withDateTimeFormat = (impl: () => unknown) => {
    global.Intl = { ...realIntl, DateTimeFormat: impl as unknown as typeof Intl.DateTimeFormat };
  };

  it('picks Turkish for a Turkish locale', () => {
    withDateTimeFormat(() => ({ resolvedOptions: () => ({ locale: 'tr-TR' }) }));
    expect(detectDeviceLanguage()).toBe('tr');
  });

  it('picks English for any other locale', () => {
    withDateTimeFormat(() => ({ resolvedOptions: () => ({ locale: 'en-GB' }) }));
    expect(detectDeviceLanguage()).toBe('en');
  });

  it('falls back to Turkish when the locale cannot be read', () => {
    withDateTimeFormat(() => {
      throw new Error('no Intl');
    });
    expect(detectDeviceLanguage()).toBe('tr');
  });
});

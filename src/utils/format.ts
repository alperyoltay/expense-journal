/**
 * Formats an amount of money the same way everywhere in the app:
 * grouped by the locale, at most two decimals, the currency after it.
 *   formatMoney(17109.5, 'tr-TR', '₺')       -> "17.109,5 ₺"
 *   formatMoney(1500, 'en-US', '₺', true)    -> "+1,500 ₺"
 *   formatMoney(-45, 'tr-TR', '₺')           -> "-45 ₺"
 */
export const formatMoney = (value: number, locale: string, currency: string, signed = false): string => {
  const rounded = Math.round(value * 100) / 100;
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(Math.abs(rounded));
  const sign = rounded < 0 ? '-' : signed && rounded > 0 ? '+' : '';
  return `${sign}${number} ${currency}`;
};

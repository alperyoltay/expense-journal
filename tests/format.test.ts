import { formatMoney } from '@/src/utils/format';

describe('formatMoney', () => {
  it('groups thousands and uses a decimal comma in Turkish', () => {
    expect(formatMoney(17109.5, 'tr-TR', '₺')).toBe('17.109,5 ₺');
    expect(formatMoney(33500, 'tr-TR', '₺')).toBe('33.500 ₺');
  });

  it('uses the English separators in English', () => {
    expect(formatMoney(16390.5, 'en-US', '₺')).toBe('16,390.5 ₺');
  });

  it('adds + only when asked, and - for negatives', () => {
    expect(formatMoney(1500, 'tr-TR', '₺', true)).toBe('+1.500 ₺');
    expect(formatMoney(1500, 'tr-TR', '₺')).toBe('1.500 ₺');
    expect(formatMoney(-12500, 'tr-TR', '₺', true)).toBe('-12.500 ₺');
  });

  it('never shows a sign on zero', () => {
    expect(formatMoney(0, 'tr-TR', '₺', true)).toBe('0 ₺');
    expect(formatMoney(-0, 'tr-TR', '₺')).toBe('0 ₺');
  });

  it('hides floating point noise from summed amounts', () => {
    expect(formatMoney(0.1 + 0.2, 'en-US', '₺')).toBe('0.3 ₺');
    expect(formatMoney(185.5 + 45 + 640.25, 'tr-TR', '₺')).toBe('870,75 ₺');
  });
});

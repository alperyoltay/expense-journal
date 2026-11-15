import { parseTransactions } from '@/src/utils/parser';
import { TransactionType } from '@/src/utils/constants';

describe('parseTransactions', () => {
  it('parses a single expense with a description', () => {
    expect(parseTransactions('#gider 150 #market ekmek')).toEqual([
      { time: undefined, type: TransactionType.EXPENSE, amount: 150, description: '#market ekmek' },
    ]);
  });

  it('parses income and keeps the time prefix', () => {
    expect(parseTransactions('09:30 #gelir 2500 maaş')).toEqual([
      { time: '09:30', type: TransactionType.INCOME, amount: 2500, description: 'maaş' },
    ]);
  });

  it('parses several transactions, one per line', () => {
    const result = parseTransactions('#gider 40 kahve\n#gelir 100 iade\n#gider 12.5 otobüs');
    expect(result.map((t) => [t.type, t.amount])).toEqual([
      [TransactionType.EXPENSE, 40],
      [TransactionType.INCOME, 100],
      [TransactionType.EXPENSE, 12.5],
    ]);
  });

  it('accepts a comma as the decimal separator (150,75)', () => {
    expect(parseTransactions('#gider 150,75 market')[0].amount).toBe(150.75);
  });

  it('is case-insensitive for the tag', () => {
    expect(parseTransactions('#GIDER 20 su')[0].type).toBe(TransactionType.EXPENSE);
  });

  it('returns an empty description when none is given', () => {
    expect(parseTransactions('#gelir 50')[0].description).toBe('');
  });

  it('ignores plain notes and tags without an amount', () => {
    expect(parseTransactions('bugün hiçbir şey harcamadım #gider market')).toEqual([]);
  });

  it('returns an empty list for empty input', () => {
    expect(parseTransactions('')).toEqual([]);
  });

  it('can be called repeatedly (global regex state does not leak)', () => {
    expect(parseTransactions('#gider 10 a')).toHaveLength(1);
    expect(parseTransactions('#gider 10 a')).toHaveLength(1);
  });
});

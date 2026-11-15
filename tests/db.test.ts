import {
  appendNote, clearAllData, getAllTransactions, getNoteByDate, getTransactionsByMonth, saveNote,
} from '@/src/db/DB';
import { getLabels, getThemeColor, saveLabels, saveThemeColor } from '@/src/db/SettingsManager';
import { listFiles } from '@/src/db/storage.web';
import { TransactionType } from '@/src/utils/constants';

// Run DB.ts on top of the web storage (localStorage), so the note logic can be
// tested in Node without expo-file-system.
jest.mock('@/src/db/storage', () => jest.requireActual('@/src/db/storage.web'));

class MemoryStorage {
  private data = new Map<string, string>();
  get length() { return this.data.size; }
  key(i: number) { return [...this.data.keys()][i] ?? null; }
  getItem(k: string) { return this.data.has(k) ? this.data.get(k)! : null; }
  setItem(k: string, v: string) { this.data.set(k, String(v)); }
  removeItem(k: string) { this.data.delete(k); }
  clear() { this.data.clear(); }
}

beforeEach(() => {
  (globalThis as any).localStorage = new MemoryStorage();
});

describe('notes', () => {
  it('returns null for a day without a note', async () => {
    expect(await getNoteByDate('2026-11-01')).toBeNull();
  });

  it('saves and reads back a note', async () => {
    await saveNote('#gider 40 kahve', '2026-11-15');
    expect((await getNoteByDate('2026-11-15'))?.content).toBe('#gider 40 kahve');
  });

  it('appends to an existing note on a new line', async () => {
    await appendNote('#gider 40 kahve', '2026-11-15');
    await appendNote('#gelir 100 iade', '2026-11-15');
    expect((await getNoteByDate('2026-11-15'))?.content).toBe('#gider 40 kahve\n#gelir 100 iade');
  });
});

describe('transactions', () => {
  beforeEach(async () => {
    await saveNote('#gider 40 kahve\n#gelir 2500 maaş', '2026-11-01');
    await saveNote('#gider 150,75 market', '2026-11-15');
    await saveNote('#gider 300 kira', '2026-10-31');
  });

  it('returns only the requested month, newest day first', async () => {
    const txs = await getTransactionsByMonth('2026-11');
    expect(txs.map((t) => [t.dateStr, t.amount])).toEqual([
      ['2026-11-15', 150.75],
      ['2026-11-01', 40],
      ['2026-11-01', 2500],
    ]);
    expect(txs[2].type).toBe(TransactionType.INCOME);
  });

  it('returns every month from getAllTransactions', async () => {
    expect(await getAllTransactions()).toHaveLength(4);
  });

  it('clearAllData removes every note', async () => {
    await clearAllData();
    expect(await getAllTransactions()).toEqual([]);
    expect(await listFiles('notes/')).toEqual([]);
  });
});

describe('settings', () => {
  it('falls back to defaults when nothing is saved', async () => {
    expect(await getThemeColor()).toBe('#03DAC6');
    expect(await getLabels()).toContain('market');
  });

  it('keeps several settings in one file', async () => {
    await saveThemeColor('#880808');
    await saveLabels(['kira']);
    expect(await getThemeColor()).toBe('#880808');
    expect(await getLabels()).toEqual(['kira']);
  });
});

describe('web storage', () => {
  it('lists only the files directly inside a folder', async () => {
    await saveNote('a', '2026-11-15');
    await saveThemeColor('#fff');
    expect(await listFiles('notes/')).toEqual(['2026-11-15.md']);
  });
});

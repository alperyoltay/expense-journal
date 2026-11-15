import { TransactionType } from '../utils/constants';
import { parseTransactions } from '../utils/parser';
import { deleteFile, listFiles, readText, writeText } from './storage';

const NOTES_DIR = 'notes/';

export interface TransactionRecord {
  id?: number;
  note_id?: number;
  type: TransactionType;
  amount: number;
  description: string;
  dateStr: string;
  time?: string;
}

export interface NoteRecord {
  id?: number;
  content: string;
  dateStr: string;
  created_at: string;
}

const notePath = (dateStr: string) => `${NOTES_DIR}${dateStr}.md`;

export const initDB = async () => {
  await listFiles(NOTES_DIR);
  console.log('Notes directory initialized');
};

export const saveNote = async (content: string, dateStr: string) => {
  await writeText(notePath(dateStr), content);
  return dateStr;
};

export const appendNote = async (content: string, dateStr: string) => {
  const existing = await getNoteByDate(dateStr);
  const updatedContent = existing
    ? `${existing.content}\n${content}`
    : content;
  return await saveNote(updatedContent, dateStr);
};

export const getNoteByDate = async (dateStr: string): Promise<NoteRecord | null> => {
  try {
    const content = await readText(notePath(dateStr));
    if (content === null) return null;
    return {
      content,
      dateStr,
      created_at: new Date().toISOString(),
    };
  } catch (e) {
    console.warn('getNoteByDate failed:', e);
    return null;
  }
};

const readTransactions = async (fileFilter: (name: string) => boolean): Promise<TransactionRecord[]> => {
  const files = await listFiles(NOTES_DIR);
  const allTransactions: TransactionRecord[] = [];

  for (const fileName of files.filter((f) => f.endsWith('.md') && fileFilter(f))) {
    const dateStr = fileName.replace('.md', '');
    const content = (await readText(`${NOTES_DIR}${fileName}`)) ?? '';
    for (const tx of parseTransactions(content)) {
      allTransactions.push({ ...tx, dateStr });
    }
  }

  return allTransactions.sort((a, b) => b.dateStr.localeCompare(a.dateStr));
};

export const getTransactionsByMonth = async (monthStr: string): Promise<TransactionRecord[]> => {
  try {
    return await readTransactions((f) => f.startsWith(monthStr));
  } catch (e) {
    console.warn('getTransactionsByMonth failed:', e);
    return [];
  }
};

export const getAllTransactions = async (): Promise<TransactionRecord[]> => {
  try {
    return await readTransactions(() => true);
  } catch (e) {
    console.warn('getAllTransactions failed:', e);
    return [];
  }
};

export const clearAllData = async () => {
  try {
    const files = await listFiles(NOTES_DIR);
    for (const file of files) {
      if (file.endsWith('.md')) {
        await deleteFile(`${NOTES_DIR}${file}`);
      }
    }
  } catch (e) {
    console.warn('clearAllData failed:', e);
  }
};

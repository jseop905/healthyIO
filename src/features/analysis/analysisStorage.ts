import AsyncStorage from '@react-native-async-storage/async-storage';
import { Analysis, AnalysisSchema } from '@/src/types/analysis';
import { z } from 'zod';

const STORAGE_KEY = '@healthyio/analyses';

export async function saveAnalysis(analysis: Analysis): Promise<void> {
  const list = await getAnalysisList();
  list.unshift(analysis);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export async function getAnalysisList(): Promise<Analysis[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  const parsed = JSON.parse(raw);
  const result = z.array(AnalysisSchema).safeParse(parsed);
  if (!result.success) return [];

  return result.data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getAnalysisById(id: string): Promise<Analysis | null> {
  const list = await getAnalysisList();
  return list.find((a) => a.id === id) ?? null;
}

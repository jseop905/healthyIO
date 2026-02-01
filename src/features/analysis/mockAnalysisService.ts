import { Analysis } from '@/src/types/analysis';
import { bristolInfo } from '@/src/data/bristolInfo';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeImage(imageUri: string): Promise<Analysis> {
  await delay(1000 + Math.random() * 1000);

  const bristolType = Math.floor(Math.random() * 7) + 1;
  const info = bristolInfo[bristolType];

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    imageUri,
    bristolType,
    characteristics: info.characteristics,
    createdAt: new Date().toISOString(),
  };
}

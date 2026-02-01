import { z } from 'zod';

export const AnalysisSchema = z.object({
  id: z.string(),
  imageUri: z.string(),
  bristolType: z.number().int().min(1).max(7),
  characteristics: z.array(z.string()),
  memo: z.string().optional(),
  createdAt: z.string(),
});

export type Analysis = z.infer<typeof AnalysisSchema>;

export const BristolTypeInfoSchema = z.object({
  type: z.number().int().min(1).max(7),
  name: z.string(),
  description: z.string(),
  characteristics: z.array(z.string()),
});

export type BristolTypeInfo = z.infer<typeof BristolTypeInfoSchema>;

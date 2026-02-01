import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { analyzeImage } from './mockAnalysisService';
import { saveAnalysis, getAnalysisList, getAnalysisById } from './analysisStorage';

const ANALYSIS_LIST_KEY = ['analyses'];

export function useSubmitAnalysis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageUri: string) => {
      const analysis = await analyzeImage(imageUri);
      await saveAnalysis(analysis);
      return analysis;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANALYSIS_LIST_KEY });
    },
  });
}

export function useAnalysisList() {
  return useQuery({
    queryKey: ANALYSIS_LIST_KEY,
    queryFn: getAnalysisList,
  });
}

export function useAnalysisDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['analysis', id],
    queryFn: () => getAnalysisById(id!),
    enabled: !!id,
  });
}

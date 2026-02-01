import { Image, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Text, View, useThemeColor } from '@/components/Themed';
import Button from '@/components/Button';
import ErrorState from '@/components/ErrorState';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Spacing } from '@/constants/Tokens';
import { useSubmitAnalysis } from '@/src/features/analysis/hooks';

export default function ConfirmImageScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const submitAnalysis = useSubmitAnalysis();
  const background = useThemeColor({}, 'background');

  const handleRetake = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!uri) return;
    submitAnalysis.mutate(uri, {
      onSuccess: () => {
        router.replace('/(tabs)');
      },
    });
  };

  if (!uri) {
    return (
      <ErrorState
        title="이미지가 없습니다"
        description="카메라 화면으로 돌아가 다시 촬영해주세요."
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Image source={{ uri }} style={styles.preview} resizeMode="contain" />
      {submitAnalysis.isPending && (
        <View style={styles.loading}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>분석 중...</Text>
        </View>
      )}
      {submitAnalysis.isError && (
        <View style={styles.error}>
          <Text style={styles.errorText}>분석에 실패했습니다. 다시 시도해주세요.</Text>
        </View>
      )}
      <View style={styles.actions}>
        <Button title="재촬영" onPress={handleRetake} variant="secondary" disabled={submitAnalysis.isPending} />
        <Button title="분석 요청" onPress={handleSubmit} disabled={submitAnalysis.isPending} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    backgroundColor: 'transparent',
  },
  loading: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: 'transparent',
  },
  loadingText: {
    marginTop: Spacing.sm,
  },
  error: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    backgroundColor: 'transparent',
  },
  errorText: {
    color: '#e74c3c',
  },
});

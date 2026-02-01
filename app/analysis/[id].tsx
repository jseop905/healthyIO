import { Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Text, View, useThemeColor } from '@/components/Themed';
import BristolBadge from '@/components/BristolBadge';
import Card from '@/components/Card';
import ErrorState from '@/components/ErrorState';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Spacing, Typography } from '@/constants/Tokens';
import { bristolInfo } from '@/src/data/bristolInfo';
import { useAnalysisDetail } from '@/src/features/analysis/hooks';

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function AnalysisDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const secondary = useThemeColor({}, 'textSecondary');
  const { data: analysis, isLoading, isError } = useAnalysisDetail(id);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError || !analysis) {
    return (
      <ErrorState
        title="분석 데이터를 찾을 수 없습니다"
        description="데이터가 삭제되었거나 오류가 발생했습니다."
      />
    );
  }

  const info = bristolInfo[analysis.bristolType];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: analysis.imageUri }} style={styles.image} resizeMode="cover" />

      <Card style={styles.section}>
        <View style={styles.bristolHeader}>
          <BristolBadge type={analysis.bristolType} />
          <Text style={styles.bristolName}>{info.name}</Text>
        </View>
        <Text style={[styles.bristolDesc, { color: secondary }]}>{info.description}</Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>특징</Text>
        {analysis.characteristics.map((c, i) => (
          <Text key={i} style={styles.listItem}>• {c}</Text>
        ))}
      </Card>

      {analysis.memo && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>메모</Text>
          <Text style={styles.bodyText}>{analysis.memo}</Text>
        </Card>
      )}

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>분석 정보</Text>
        <Text style={[styles.meta, { color: secondary }]}>
          분석 일시: {formatDateTime(analysis.createdAt)}
        </Text>
        <Text style={[styles.meta, { color: secondary }]}>
          분석 ID: {analysis.id}
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.xl,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#ddd',
  },
  section: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
  bristolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
    backgroundColor: 'transparent',
  },
  bristolName: {
    ...Typography.heading3,
  },
  bristolDesc: {
    ...Typography.bodySmall,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: Spacing.sm,
  },
  listItem: {
    ...Typography.body,
    marginBottom: 4,
  },
  bodyText: {
    ...Typography.body,
  },
  meta: {
    ...Typography.bodySmall,
    marginBottom: 4,
  },
});

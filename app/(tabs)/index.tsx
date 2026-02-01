import { FlatList, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Text, View, useThemeColor } from '@/components/Themed';
import Card from '@/components/Card';
import BristolBadge from '@/components/BristolBadge';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Spacing, Typography } from '@/constants/Tokens';
import { useAnalysisList } from '@/src/features/analysis/hooks';
import { Analysis } from '@/src/types/analysis';

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function AnalysisItem({ item }: { item: Analysis }) {
  const secondary = useThemeColor({}, 'textSecondary');

  return (
    <Card
      onPress={() => router.push({ pathname: '/analysis/[id]', params: { id: item.id } })}
      style={styles.card}
    >
      <View style={styles.row}>
        <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
        <View style={styles.info}>
          <View style={styles.badgeRow}>
            <BristolBadge type={item.bristolType} />
            <Text style={[styles.date, { color: secondary }]}>{formatDate(item.createdAt)}</Text>
          </View>
          <Text style={styles.characteristics} numberOfLines={2}>
            {item.characteristics.join(', ')}
          </Text>
          {item.memo && (
            <Text style={[styles.memo, { color: secondary }]} numberOfLines={1}>
              {item.memo}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
}

export default function AnalysisListScreen() {
  const { data: analyses, isLoading, isError } = useAnalysisList();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError) {
    return (
      <ErrorState
        title="데이터를 불러오는 데 실패했습니다"
        description="네트워크 상태를 확인하고 다시 시도해주세요."
      />
    );
  }

  if (!analyses || analyses.length === 0) {
    return (
      <EmptyState
        icon="list"
        title="아직 분석 내역이 없습니다"
        description="카메라로 촬영하여 첫 분석을 시작해보세요."
        actionLabel="촬영하기"
        onAction={() => router.push('/(tabs)/camera')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={analyses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnalysisItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  card: {
    marginBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: 'transparent',
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
    gap: 4,
    backgroundColor: 'transparent',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'transparent',
  },
  date: {
    ...Typography.caption,
  },
  characteristics: {
    ...Typography.bodySmall,
  },
  memo: {
    ...Typography.caption,
  },
});

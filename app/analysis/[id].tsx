import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Text, View } from '@/components/Themed';

export default function AnalysisDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>분석 상세</Text>
      <Text style={styles.id}>분석 ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  id: {
    marginTop: 16,
    color: '#888',
  },
});

import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Text, View } from '@/components/Themed';

export default function ConfirmImageScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이미지 확인</Text>
      <Text style={styles.description}>
        {uri ? '이미지를 확인하고 분석을 요청하세요.' : '이미지가 없습니다.'}
      </Text>
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
  description: {
    marginTop: 16,
    color: '#888',
  },
});

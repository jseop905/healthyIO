import { Alert, Image, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Text, View } from '@/components/Themed';
import Button from '@/components/Button';
import { Spacing } from '@/constants/Tokens';

export default function ConfirmImageScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  const handleRetake = () => {
    router.back();
  };

  const handleSubmit = () => {
    Alert.alert('분석 요청', '분석 요청 기능은 API 연동 후 활성화됩니다.');
  };

  if (!uri) {
    return (
      <View style={styles.container}>
        <Text>이미지가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.preview} resizeMode="contain" />
      <View style={styles.actions}>
        <Button title="재촬영" onPress={handleRetake} variant="secondary" />
        <Button title="분석 요청" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
});

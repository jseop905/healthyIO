import { Alert, Image, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Text, View } from '@/components/Themed';

export default function ConfirmImageScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  const handleRetake = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Phase 5에서 실제 분석 요청 연동 예정
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
        <Pressable style={[styles.button, styles.retakeButton]} onPress={handleRetake}>
          <Text style={styles.buttonText}>재촬영</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>분석 요청</Text>
        </Pressable>
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
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#2f95dc',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>촬영</Text>
      <Text style={styles.description}>카메라 또는 갤러리에서 이미지를 선택하세요.</Text>
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

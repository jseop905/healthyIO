import { Alert, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { Text, View } from '@/components/Themed';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const navigateToConfirm = (uri: string) => {
    router.push({ pathname: '/confirm-image', params: { uri } });
  };

  const handleTakePhoto = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('권한 필요', '카메라 권한을 허용해주세요.');
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      navigateToConfirm(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      navigateToConfirm(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>카메라로 촬영</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.secondaryButton]} onPress={handlePickImage}>
        <Text style={styles.buttonText}>갤러리에서 선택</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: '#2f95dc',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

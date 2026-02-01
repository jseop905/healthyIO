import { Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { View } from '@/components/Themed';
import Button from '@/components/Button';
import { Spacing } from '@/constants/Tokens';

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
      <Button title="카메라로 촬영" onPress={handleTakePhoto} size="lg" />
      <Button title="갤러리에서 선택" onPress={handlePickImage} variant="secondary" size="lg" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
});

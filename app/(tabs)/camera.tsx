import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { View } from '@/components/Themed';
import Button from '@/components/Button';
import ErrorState from '@/components/ErrorState';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Spacing } from '@/constants/Tokens';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isPickerLoading, setIsPickerLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const navigateToConfirm = (uri: string) => {
    router.push({ pathname: '/confirm-image', params: { uri } });
  };

  const handleTakePhoto = async () => {
    setPermissionDenied(false);
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        setPermissionDenied(true);
        return;
      }
    }

    setIsPickerLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        navigateToConfirm(result.assets[0].uri);
      }
    } finally {
      setIsPickerLoading(false);
    }
  };

  const handlePickImage = async () => {
    setPermissionDenied(false);
    setIsPickerLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        navigateToConfirm(result.assets[0].uri);
      }
    } finally {
      setIsPickerLoading(false);
    }
  };

  if (permissionDenied) {
    return (
      <ErrorState
        icon="camera"
        title="카메라 권한이 필요합니다"
        description="설정에서 카메라 권한을 허용해주세요."
        onRetry={handleTakePhoto}
      />
    );
  }

  if (isPickerLoading) {
    return <LoadingSpinner fullScreen />;
  }

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

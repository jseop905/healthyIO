import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, useThemeColor } from './Themed';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export default function LoadingSpinner({ fullScreen = false }: LoadingSpinnerProps) {
  const tint = useThemeColor({}, 'tint');

  if (!fullScreen) {
    return <ActivityIndicator color={tint} size="large" />;
  }

  return (
    <View style={styles.fullScreen}>
      <ActivityIndicator color={tint} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

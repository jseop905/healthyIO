import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { BorderRadius, Shadows, Spacing } from '@/constants/Tokens';
import { useThemeColor } from './Themed';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function Card({ children, onPress, style }: CardProps) {
  const cardBg = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.card,
        Shadows.sm,
        {
          backgroundColor: cardBg,
          borderColor,
          opacity: onPress && pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
  },
});

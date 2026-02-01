import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { BorderRadius, Spacing, Typography } from '@/constants/Tokens';
import { useThemeColor } from './Themed';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, fontSize: 14 },
  md: { paddingVertical: 14, paddingHorizontal: Spacing.lg, fontSize: 16 },
  lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, fontSize: 18 },
} as const;

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const border = useThemeColor({}, 'border');

  const s = sizeStyles[size];
  const isDisabled = disabled || loading;

  const bgColor =
    variant === 'primary' ? tint :
    variant === 'secondary' ? textSecondary :
    'transparent';

  const textColor =
    variant === 'outline' ? tint : '#fff';

  const borderColor =
    variant === 'outline' ? tint : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: bgColor,
          borderColor,
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1,
        },
        fullWidth && styles.fullWidth,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text style={[styles.text, { color: textColor, fontSize: s.fontSize }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: Typography.button.fontWeight,
  },
});

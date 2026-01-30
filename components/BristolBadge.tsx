import { StyleSheet, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Tokens';
import { useColorScheme } from './useColorScheme';

interface BristolBadgeProps {
  type: number;
}

export default function BristolBadge({ type }: BristolBadgeProps) {
  const theme = useColorScheme() ?? 'light';
  const key = `bristol${type}` as keyof typeof Colors.light;
  const color = Colors[theme][key] as string;

  return (
    <Text style={[styles.badge, { backgroundColor: color }]}>
      Type {type}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
});

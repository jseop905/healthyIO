import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Spacing, Typography } from '@/constants/Tokens';
import { Text, View, useThemeColor } from './Themed';
import Button from './Button';

interface EmptyStateProps {
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const secondary = useThemeColor({}, 'textSecondary');

  return (
    <View style={styles.container}>
      <FontAwesome name={icon} size={48} color={secondary} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={[styles.description, { color: secondary }]}>{description}</Text>}
      {actionLabel && onAction && (
        <Button title={actionLabel} onPress={onAction} variant="outline" size="sm" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  icon: {
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heading3,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...Typography.bodySmall,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';

export type EmptyStateViewProps = {
  title: string;
  message?: string;
  /** Shown as a button when `onActionPress` is provided. */
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyStateView({
  title,
  message,
  actionLabel,
  onActionPress
}: EmptyStateViewProps) {
  const showAction = Boolean(actionLabel && onActionPress);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {showAction ? (
        <Pressable
          accessibilityRole="button"
          onPress={onActionPress}
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1c1917'
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: '#57534e'
  },
  action: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d6d3d1',
    backgroundColor: '#fafaf9'
  },
  actionPressed: {
    opacity: 0.85
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1c1917'
  }
});

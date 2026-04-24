import { Pressable, StyleSheet, Text, View } from 'react-native';

type WelcomeScreenProps = {
  onContinue?: () => void;
};

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <View style={styles.container} testID="auth-welcome-screen">
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      <Pressable
        accessibilityRole="button"
        onPress={onContinue}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        testID="auth-welcome-continue-button"
      >
        <Text style={styles.buttonLabel}>Continue to Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563'
  },
  button: {
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  buttonPressed: {
    opacity: 0.85
  },
  buttonLabel: {
    color: '#f9fafb',
    fontWeight: '600'
  }
});

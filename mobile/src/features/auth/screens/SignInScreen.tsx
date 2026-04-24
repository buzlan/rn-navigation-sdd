import { Pressable, StyleSheet, Text, View } from 'react-native';

type SignInScreenProps = {
  onSignIn?: () => void;
};

export function SignInScreen({ onSignIn }: SignInScreenProps) {
  return (
    <View style={styles.container} testID="auth-signin-screen">
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Use the button below to start a demo session.</Text>

      <Pressable
        accessibilityRole="button"
        onPress={onSignIn}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        testID="auth-signin-submit-button"
      >
        <Text style={styles.buttonLabel}>Sign In</Text>
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
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  buttonPressed: {
    opacity: 0.85
  },
  buttonLabel: {
    color: '#eff6ff',
    fontWeight: '700'
  }
});

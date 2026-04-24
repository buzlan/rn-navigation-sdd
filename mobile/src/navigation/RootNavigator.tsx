import { useSyncExternalStore } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthNavigator } from '@features/auth/navigation/AuthNavigator';
import { getAuthState, signIn, signOut, subscribeAuth } from '@features/auth/state/authStore';
import {
  selectCanAccessApp,
  selectDisplayName,
  selectIsRestoring
} from '@features/auth/state/authSelectors';
import type { RootStackParamList } from '@navigation/params/routeTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RestoringSessionView() {
  return (
    <View style={styles.container} testID="root-restoring-screen">
      <Text style={styles.title}>Restoring session...</Text>
      <Text style={styles.subtitle}>Please wait while we prepare your app.</Text>
    </View>
  );
}

type SignedInPlaceholderProps = {
  displayName: string | null;
};

function SignedInPlaceholder({ displayName }: SignedInPlaceholderProps) {
  return (
    <View style={styles.container} testID="root-app-placeholder-screen">
      <Text style={styles.title}>Signed-in app placeholder</Text>
      <Text style={styles.subtitle}>
        {displayName ? `Welcome, ${displayName}.` : 'Welcome.'}
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={signOut}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        testID="root-app-placeholder-signout-button"
      >
        <Text style={styles.buttonLabel}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

export function RootNavigator() {
  const authState = useSyncExternalStore(subscribeAuth, getAuthState, getAuthState);
  const isRestoring = selectIsRestoring(authState);
  const canAccessApp = selectCanAccessApp(authState);
  const displayName = selectDisplayName(authState);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isRestoring ? (
        <Stack.Screen name="Auth" component={RestoringSessionView} />
      ) : canAccessApp ? (
        <Stack.Screen
          key={`app-session-${authState.sessionVersion}`}
          name="App"
        >
          {() => <SignedInPlaceholder displayName={displayName} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Auth">
          {() => (
            <AuthNavigator
              onSignInSuccess={() => {
                signIn('demo-user', 'Demo User');
              }}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center'
  },
  button: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  buttonPressed: {
    opacity: 0.85
  },
  buttonLabel: {
    color: '#f9fafb',
    fontWeight: '700'
  }
});

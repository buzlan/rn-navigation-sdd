import { useSyncExternalStore } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthNavigator } from '@features/auth/navigation/AuthNavigator';
import { getAuthState, signIn, subscribeAuth } from '@features/auth/state/authStore';
import {
  selectCanAccessApp,
  selectIsRestoring
} from '@features/auth/state/authSelectors';
import type { RootStackParamList } from '@navigation/params/routeTypes';
import { AppTabsNavigator } from './AppTabsNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RestoringSessionView() {
  return (
    <View style={styles.container} testID="root-restoring-screen">
      <Text style={styles.title}>Restoring session...</Text>
      <Text style={styles.subtitle}>Please wait while we prepare your app.</Text>
    </View>
  );
}

export function RootNavigator() {
  const authState = useSyncExternalStore(subscribeAuth, getAuthState, getAuthState);
  const isRestoring = selectIsRestoring(authState);
  const canAccessApp = selectCanAccessApp(authState);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isRestoring ? (
        <Stack.Screen name="Auth" component={RestoringSessionView} />
      ) : canAccessApp ? (
        <Stack.Screen
          key={`app-session-${authState.sessionVersion}`}
          name="App"
        >
          {() => <AppTabsNavigator />}
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
  }
});

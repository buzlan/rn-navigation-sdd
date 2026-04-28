import { useSyncExternalStore } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthNavigator } from '@features/auth/navigation/AuthNavigator';
import { getAuthState, signIn, subscribeAuth } from '@features/auth/state/authStore';
import { HomeModalScreen } from '@features/home/screens/HomeModalScreen';
import { AppDrawerNavigator } from '@features/secondary/navigation/AppDrawerNavigator';
import {
  selectCanAccessApp,
  selectIsRestoring
} from '@features/auth/state/authSelectors';
import type { HomeStackParamList } from '@navigation/params/homeParams';
import type { RootStackParamList } from '@navigation/params/routeTypes';

type RootNavigatorParamList = RootStackParamList & {
  HomeModalInfo: HomeStackParamList['HomeModalInfo'];
};

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

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
        <>
          <Stack.Screen
            key={`app-session-${authState.sessionVersion}`}
            name="App"
          >
            {() => <AppDrawerNavigator />}
          </Stack.Screen>
          <Stack.Screen
            component={HomeModalScreen}
            name="HomeModalInfo"
            options={{ headerShown: true, presentation: 'modal', title: 'Modal' }}
          />
        </>
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

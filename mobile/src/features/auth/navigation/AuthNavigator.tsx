import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '@navigation/params/authParams';

import { SignInScreen } from '../screens/SignInScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';

type AuthNavigatorProps = {
  onSignInSuccess?: () => void;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator({ onSignInSuccess }: AuthNavigatorProps) {
  return (
    <Stack.Navigator initialRouteName="AuthWelcome">
      <Stack.Screen
        name="AuthWelcome"
        options={{ headerShown: false }}
      >
        {({ navigation }) => (
          <WelcomeScreen onContinue={() => navigation.navigate('AuthSignIn')} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AuthSignIn"
        options={{ title: 'Sign In' }}
      >
        {() => <SignInScreen onSignIn={onSignInSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

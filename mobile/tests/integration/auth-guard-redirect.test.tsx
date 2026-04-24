import React from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import { RootNavigator } from '../../src/navigation/RootNavigator';
import { signIn, signOut } from '../../src/features/auth/state/authStore';

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  const { View } = require('react-native');

  const Screen = ({ component: Component, children }: any) => {
    if (typeof children === 'function') {
      return children({ navigation: { navigate: jest.fn() } });
    }
    if (Component) {
      return <Component />;
    }
    return null;
  };

  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: any) => <View>{children}</View>,
      Screen
    })
  };
}, { virtual: true });

jest.mock('@features/auth/navigation/AuthNavigator', () => ({
  AuthNavigator: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return <Text testID="auth-navigator-mock">Auth flow</Text>;
  }
}));

describe('auth guard redirect (integration)', () => {
  beforeEach(() => {
    signOut();
  });

  it('renders auth flow and hides protected app content when signed out', () => {
    const screen = render(<RootNavigator />);

    expect(screen.getByTestId('auth-navigator-mock')).toBeTruthy();
    expect(screen.queryByTestId('root-app-placeholder-screen')).toBeNull();
  });

  it('redirects away from protected content after sign out', async () => {
    signIn('demo-user', 'Demo User');
    const screen = render(<RootNavigator />);

    expect(screen.getByTestId('root-app-placeholder-screen')).toBeTruthy();

    act(() => {
      signOut();
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-navigator-mock')).toBeTruthy();
      expect(screen.queryByTestId('root-app-placeholder-screen')).toBeNull();
    });
  });
});

import { act, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

jest.mock('@react-navigation/drawer', () => {
  const { createNativeStackNavigator } = require('@react-navigation/native-stack');
  return { createDrawerNavigator: createNativeStackNavigator };
});

import { RootNavigator } from '../../src/navigation/RootNavigator';
import { signIn, signOut } from '../../src/features/auth/state/authStore';

describe('drawer flow (integration)', () => {
  afterEach(() => {
    act(() => {
      signOut();
    });
  });

  it('lets signed-in user access secondary sections and return to Home app context', async () => {
    signIn('demo-user', 'Demo User');
    const navRef = createNavigationContainerRef<any>();
    const screen = render(
      <NavigationContainer ref={navRef}>
        <RootNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(navRef.isReady()).toBe(true);
      expect(navRef.getCurrentRoute()?.name).toBe('Home');
    });

    // Drawer access is represented via drawer route navigation in integration tests.
    act(() => {
      navRef.navigate('Settings');
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('Settings');
      expect(screen.getByTestId('secondary-settings-screen')).toBeTruthy();
    });

    act(() => {
      navRef.navigate('Help');
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('Help');
      expect(screen.getByTestId('secondary-help-screen')).toBeTruthy();
    });

    act(() => {
      navRef.navigate('AppTabs', { screen: 'HomeTab' });
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('Home');
    });
  });
});

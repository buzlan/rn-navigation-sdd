import { act, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

jest.mock('@react-navigation/drawer', () => {
  const { createNativeStackNavigator } = require('@react-navigation/native-stack');
  return { createDrawerNavigator: createNativeStackNavigator };
});

import { RootNavigator } from '../../src/navigation/RootNavigator';
import { signIn, signOut } from '../../src/features/auth/state/authStore';

describe('tabs + nested stack flow (integration)', () => {
  afterEach(() => {
    act(() => {
      signOut();
    });
  });

  it('allows signed-in user to enter app, switch to Home flow, and open Home details', async () => {
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

    act(() => {
      navRef.navigate('Explore');
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('Explore');
    });

    act(() => {
      navRef.navigate('HomeTab');
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('Home');
    });

    act(() => {
      navRef.navigate('HomeDetails', { itemId: 'home-2' });
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('HomeDetails');
      expect(screen.getByText('Selected item: home-2')).toBeTruthy();
    });
  });
});

import { act, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

jest.mock('@react-navigation/drawer', () => {
  const { createNativeStackNavigator } = require('@react-navigation/native-stack');
  return { createDrawerNavigator: createNativeStackNavigator };
});

import { RootNavigator } from '../../src/navigation/RootNavigator';
import { signIn, signOut } from '../../src/features/auth/state/authStore';

describe('modal flow (integration)', () => {
  afterEach(() => {
    act(() => {
      signOut();
    });
  });

  it('opens root modal from Home flow context and dismisses back to Home', async () => {
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
      navRef.navigate('HomeModalInfo', { origin: 'home' });
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('HomeModalInfo');
      expect(screen.getByTestId('home-modal-screen')).toBeTruthy();
      expect(screen.getByText('Origin: home')).toBeTruthy();
    });

    act(() => {
      navRef.goBack();
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('Home');
    });
  });
});

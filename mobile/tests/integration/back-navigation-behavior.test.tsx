import { act, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

import { HomeStackNavigator } from '../../src/features/home/navigation/HomeStackNavigator';
import { AppDrawerNavigator } from '../../src/features/secondary/navigation/AppDrawerNavigator';
import { RootNavigator } from '../../src/navigation/RootNavigator';
import type { HomeStackParamList } from '../../src/navigation/params/homeParams';
import { signIn, signOut } from '../../src/features/auth/state/authStore';

describe('back navigation behavior (integration)', () => {
  afterEach(() => {
    signOut();
  });

  it('returns from HomeDetails back to Home in HomeStackNavigator', async () => {
    const navRef = createNavigationContainerRef<HomeStackParamList>();

    render(
      <NavigationContainer ref={navRef}>
        <HomeStackNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(navRef.isReady()).toBe(true);
      expect(navRef.getCurrentRoute()?.name).toBe('Home');
    });

    act(() => {
      navRef.navigate('HomeDetails', { itemId: 'home-1' });
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('HomeDetails');
    });

    act(() => {
      navRef.goBack();
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('Home');
    });
  });

  it('returns from Settings back to AppTabs in AppDrawerNavigator', async () => {
    const navRef = createNavigationContainerRef<any>();

    render(
      <NavigationContainer ref={navRef}>
        <AppDrawerNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(navRef.isReady()).toBe(true);
      expect(navRef.getCurrentRoute()?.name).toBe('AppTabs');
    });

    act(() => {
      navRef.navigate('Settings');
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('Settings');
    });

    act(() => {
      navRef.goBack();
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('AppTabs');
    });
  });

  it('dismisses root modal back to App in signed-in RootNavigator flow', async () => {
    signIn('demo-user', 'Demo User');
    const navRef = createNavigationContainerRef<any>();

    render(
      <NavigationContainer ref={navRef}>
        <RootNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(navRef.isReady()).toBe(true);
      expect(navRef.getCurrentRoute()?.name).toBe('App');
    });

    act(() => {
      navRef.navigate('HomeModalInfo', { origin: 'home' });
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('HomeModalInfo');
    });

    act(() => {
      navRef.goBack();
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('App');
    });
  });
});

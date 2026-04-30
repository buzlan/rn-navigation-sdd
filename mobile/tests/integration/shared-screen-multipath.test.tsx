import { act, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import { SharedInfoScreen } from '../../src/features/shared-screen/screens/SharedInfoScreen';

type SharedHarnessParamList = {
  HomeEntry: undefined;
  HelpEntry: undefined;
  SharedInfo: {
    sourcePath: string;
  };
};

const Stack = createNativeStackNavigator<SharedHarnessParamList>();

function HomeEntryScreen() {
  return (
    <View>
      <Text testID="entry-home">Home entry</Text>
    </View>
  );
}

function HelpEntryScreen() {
  return (
    <View>
      <Text testID="entry-help">Help entry</Text>
    </View>
  );
}

describe('shared screen multipath flow (integration)', () => {
  it('reaches SharedInfo from multiple paths and preserves sourcePath context', async () => {
    const navRef = createNavigationContainerRef<SharedHarnessParamList>();
    const screen = render(
      <NavigationContainer ref={navRef}>
        <Stack.Navigator initialRouteName="HomeEntry">
          <Stack.Screen component={HomeEntryScreen} name="HomeEntry" />
          <Stack.Screen component={HelpEntryScreen} name="HelpEntry" />
          <Stack.Screen component={SharedInfoScreen} name="SharedInfo" />
        </Stack.Navigator>
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(navRef.isReady()).toBe(true);
      expect(navRef.getCurrentRoute()?.name).toBe('HomeEntry');
      expect(screen.getByTestId('entry-home')).toBeTruthy();
    });

    act(() => {
      navRef.navigate('SharedInfo', { sourcePath: 'home/list' });
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('SharedInfo');
      expect(screen.getByTestId('shared-info-screen')).toBeTruthy();
      expect(screen.getByText('Reached from: home/list')).toBeTruthy();
    });

    act(() => {
      navRef.navigate('HelpEntry');
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('HelpEntry');
      expect(screen.getByTestId('entry-help')).toBeTruthy();
    });

    act(() => {
      navRef.navigate('SharedInfo', { sourcePath: 'drawer/help' });
    });

    await waitFor(() => {
      expect(navRef.getCurrentRoute()?.name).toBe('SharedInfo');
      expect(screen.getByText('Reached from: drawer/help')).toBeTruthy();
    });
  });
});

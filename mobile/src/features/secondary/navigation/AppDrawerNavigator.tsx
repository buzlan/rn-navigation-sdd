import { createDrawerNavigator } from '@react-navigation/drawer';
import type { NavigatorScreenParams } from '@react-navigation/native';

import { AppTabsNavigator } from '@navigation/AppTabsNavigator';
import type { AppTabParamList } from '@navigation/params/appParams';

import { HelpScreen } from '../screens/HelpScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type SecondaryDrawerParamList = {
  AppTabs: NavigatorScreenParams<AppTabParamList> | undefined;
  Settings: undefined;
  Help: undefined;
};

const Drawer = createDrawerNavigator<SecondaryDrawerParamList>();

export function AppDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="AppTabs" screenOptions={{ headerTitleAlign: 'center' }}>
      <Drawer.Screen component={AppTabsNavigator} name="AppTabs" options={{ title: 'Home' }} />
      <Drawer.Screen component={SettingsScreen} name="Settings" />
      <Drawer.Screen component={HelpScreen} name="Help" />
    </Drawer.Navigator>
  );
}

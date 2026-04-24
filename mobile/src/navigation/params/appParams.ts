import type { NavigatorScreenParams } from '@react-navigation/native';

import type { HomeStackParamList } from './homeParams';

/**
 * Bottom tabs after sign-in. The Home tab hosts a nested stack (`HomeStackParamList`).
 */
export type AppTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Explore: undefined;
  Profile: undefined;
};

/**
 * Signed-in app shell: hosts primary navigation (e.g. tabs) and can be extended for
 * drawer or global modal group routes later.
 */
export type AppShellParamList = {
  AppTabs: NavigatorScreenParams<AppTabParamList> | undefined;
};

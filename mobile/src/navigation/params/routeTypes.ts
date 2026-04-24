import type { NavigatorScreenParams } from '@react-navigation/native';

import type { AppShellParamList } from './appParams';
import type { AuthStackParamList } from './authParams';

/**
 * Root-level route map: unauthenticated area vs. signed-in app.
 * Composed entry type for the root navigator (wiring in a later task).
 */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  App: NavigatorScreenParams<AppShellParamList> | undefined;
};

export type RootRouteName = keyof RootStackParamList;

export type { AuthStackParamList } from './authParams';
export type { AppShellParamList, AppTabParamList } from './appParams';
export type { HomeStackParamList } from './homeParams';

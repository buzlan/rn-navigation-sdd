import type { AuthState, AuthUser } from './authStore';

export function selectAuthStatus(state: AuthState) {
  return state.status;
}

export function selectAuthUser(state: AuthState): AuthUser | null {
  return state.user;
}

export function selectUserId(state: AuthState): string | null {
  return state.user?.userId ?? null;
}

export function selectDisplayName(state: AuthState): string | null {
  return state.user?.displayName ?? null;
}

export function selectIsSignedIn(state: AuthState): boolean {
  return state.status === 'signedIn' && state.user != null;
}

export function selectIsRestoring(state: AuthState): boolean {
  return state.status === 'restoring';
}

export function selectIsSignedOut(state: AuthState): boolean {
  return state.status === 'signedOut';
}

export function selectLastAuthChangeAt(state: AuthState): string {
  return state.lastAuthChangeAt;
}

/**
 * App shell is available for an established signed-in session.
 */
export function selectCanAccessApp(state: AuthState): boolean {
  return selectIsSignedIn(state);
}

import type { AuthState } from '../../features/auth/state/authStore';
import { selectIsRestoring, selectIsSignedIn } from '../../features/auth/state/authSelectors';

/**
 * Result of checking access to a protected (authenticated) navigation area.
 * Callers (navigators) map `ok: false` to the appropriate flow without deep-link or URL handling.
 */
export type RequireAuthResult =
  | { ok: true }
  | { ok: false; reason: 'signed_out' | 'session_restoring' };

/**
 * Returns whether the current session may enter protected routes (e.g. the signed-in `App` flow
 * from the root `RootStackParamList` in `routeTypes.ts`).
 *
 * - `signed_out` — user is not authenticated; keep or switch to the auth flow.
 * - `session_restoring` — session is not yet known; avoid flashing protected UI (loading/splash) until
 *   restore completes in the auth store.
 */
export function requireAuth(state: Readonly<AuthState>): RequireAuthResult {
  if (selectIsSignedIn(state)) {
    return { ok: true };
  }

  if (selectIsRestoring(state)) {
    return { ok: false, reason: 'session_restoring' };
  }

  return { ok: false, reason: 'signed_out' };
}

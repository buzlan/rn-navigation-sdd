export type AuthStatus = 'signedOut' | 'restoring' | 'signedIn';

export type AuthUser = {
  userId: string;
  displayName: string;
};

export type AuthState = {
  status: AuthStatus;
  user: AuthUser | null;
  lastAuthChangeAt: string;
  /**
   * Incremented on explicit sign-out so protected navigator trees can be remounted
   * and prior signed-in history is cleared.
   */
  sessionVersion: number;
};

type Listener = () => void;

const listeners = new Set<Listener>();

let state: AuthState = {
  status: 'signedOut',
  user: null,
  lastAuthChangeAt: new Date().toISOString(),
  sessionVersion: 0
};

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

type CommitOptions = {
  bumpSessionVersion?: boolean;
};

function commit(next: Pick<AuthState, 'status' | 'user'>, options: CommitOptions = {}): void {
  state = {
    status: next.status,
    user: next.user,
    lastAuthChangeAt: new Date().toISOString(),
    sessionVersion: options.bumpSessionVersion ? state.sessionVersion + 1 : state.sessionVersion
  };
  emit();
}

/**
 * Returns the current auth snapshot. Use with {@link subscribeAuth} for external stores / hooks.
 */
export function getAuthState(): Readonly<AuthState> {
  return state;
}

/**
 * Subscribes to auth state changes. Returns an unsubscribe for cleanup.
 */
export function subscribeAuth(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Sets an authenticated user (e.g. after successful sign-in).
 */
export function signIn(userId: string, displayName?: string): void {
  const label = displayName?.trim() || userId;
  commit({ status: 'signedIn', user: { userId, displayName: label } });
}

/**
 * Clears the session and returns to signed-out.
 */
export function signOut(): void {
  commit({ status: 'signedOut', user: null }, { bumpSessionVersion: true });
}

/**
 * Marks a session restore in progress (e.g. app launch before storage is read).
 * User is unknown until a completion action runs.
 */
export function beginSessionRestore(): void {
  commit({ status: 'restoring', user: null });
}

/**
 * Completes restore: valid signed-in user found.
 */
export function completeSessionRestoreSignedIn(user: AuthUser): void {
  commit({ status: 'signedIn', user });
}

/**
 * Completes restore: no valid session.
 */
export function completeSessionRestoreSignedOut(): void {
  commit({ status: 'signedOut', user: null });
}

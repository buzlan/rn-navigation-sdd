import type { AuthState, AuthUser } from '../../../src/features/auth/state/authStore';

describe('authStore', () => {
  let getAuthState: () => Readonly<AuthState>;
  let signIn: (userId: string, displayName?: string) => void;
  let signOut: () => void;
  let beginSessionRestore: () => void;
  let completeSessionRestoreSignedIn: (user: AuthUser) => void;
  let completeSessionRestoreSignedOut: () => void;
  let subscribeAuth: (listener: () => void) => () => void;

  beforeEach(() => {
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- fresh module after resetModules
    const m = require('../../../src/features/auth/state/authStore') as typeof import('../../../src/features/auth/state/authStore');
    getAuthState = m.getAuthState;
    signIn = m.signIn;
    signOut = m.signOut;
    beginSessionRestore = m.beginSessionRestore;
    completeSessionRestoreSignedIn = m.completeSessionRestoreSignedIn;
    completeSessionRestoreSignedOut = m.completeSessionRestoreSignedOut;
    subscribeAuth = m.subscribeAuth;
  });

  it('starts in signedOut with no user', () => {
    const s = getAuthState();
    expect(s.status).toBe('signedOut');
    expect(s.user).toBeNull();
    expect(s.lastAuthChangeAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('signIn transitions to signedIn with user and fresh timestamp', () => {
    const t0 = getAuthState().lastAuthChangeAt;
    signIn('user-1', 'Alice');
    const s = getAuthState();
    expect(s.status).toBe('signedIn');
    expect(s.user).toEqual({ userId: 'user-1', displayName: 'Alice' });
    // commit() always re-stamps; same ISO string is possible in the same millisecond
    expect(new Date(s.lastAuthChangeAt).getTime()).toBeGreaterThanOrEqual(new Date(t0).getTime());
  });

  it('signs out after sign in', () => {
    signIn('user-1', 'Alice');
    signOut();
    const s = getAuthState();
    expect(s.status).toBe('signedOut');
    expect(s.user).toBeNull();
  });

  it('beginSessionRestore then completeSessionRestoreSignedIn', () => {
    beginSessionRestore();
    expect(getAuthState().status).toBe('restoring');
    expect(getAuthState().user).toBeNull();
    const user: AuthUser = { userId: 'r1', displayName: 'Restored' };
    completeSessionRestoreSignedIn(user);
    expect(getAuthState()).toMatchObject({ status: 'signedIn', user });
  });

  it('beginSessionRestore then completeSessionRestoreSignedOut', () => {
    beginSessionRestore();
    expect(getAuthState().status).toBe('restoring');
    completeSessionRestoreSignedOut();
    const s = getAuthState();
    expect(s.status).toBe('signedOut');
    expect(s.user).toBeNull();
  });

  it('notifies subscribers on transition', () => {
    const fn = jest.fn();
    const unsub = subscribeAuth(fn);
    signIn('u', 'Name');
    expect(fn).toHaveBeenCalledTimes(1);
    unsub();
    signOut();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('auth to app flow (integration)', () => {
  it.todo('shows auth flow on app entry when session is signed out');

  it.todo('transitions from auth flow to app flow after sign-in');

  it.todo('shows signed-in app shell after successful sign-in');

  it.skip('wires real integration once RootNavigator exists', () => {
    // Intended future shape for this integration:
    // 1) Render <RootNavigator /> with a signed-out auth store snapshot.
    // 2) Assert auth flow UI is visible and app shell is not visible.
    // 3) Trigger signIn(...) via store action/user event.
    // 4) Assert app flow UI is visible and auth flow is hidden.
  });
});

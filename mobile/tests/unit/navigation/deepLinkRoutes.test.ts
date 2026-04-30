describe('deep link routes (unit)', () => {
  it.todo('parses supported deep link path into a typed route intent');

  it.todo('returns unknown-route result for unsupported path');

  it.todo('returns missing-param issues when required params are absent');

  it.todo('resolves parsed intent to target route name and params');

  it.todo('returns safe fallback route when intent cannot be resolved');

  it.skip('wires real deep-link registry API once implemented', () => {
    // Intended API shape (for future implementation):
    // 1) parseDeepLinkPath(path: string) -> ParsedDeepLinkIntent
    // 2) resolveDeepLinkIntent(intent) -> { routeName, params } | { fallbackRoute, reason }
    //
    // Example future assertions:
    // const parsed = parseDeepLinkPath('/home/details/home-1');
    // expect(parsed).toEqual({
    //   ok: true,
    //   intent: { kind: 'homeDetails', params: { itemId: 'home-1' } }
    // });
    //
    // const resolved = resolveDeepLinkIntent(parsed.intent);
    // expect(resolved).toEqual({
    //   ok: true,
    //   routeName: 'HomeDetails',
    //   params: { itemId: 'home-1' }
    // });
  });
});

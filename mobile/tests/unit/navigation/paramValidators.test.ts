import {
  allParamResults,
  optionalStringParam,
  requireStringParam
} from '../../../src/shared/navigation/paramValidators';

describe('paramValidators', () => {
  describe('requireStringParam', () => {
    it('returns trimmed value for a valid required string', () => {
      const result = requireStringParam('itemId', '  abc  ');

      expect(result).toEqual({ ok: true, value: 'abc' });
    });

    it('returns missing issue for undefined and null values', () => {
      const undefinedResult = requireStringParam('itemId', undefined);
      const nullResult = requireStringParam('itemId', null);

      expect(undefinedResult).toEqual({
        ok: false,
        issues: [
          { param: 'itemId', code: 'missing', message: 'Missing required param: itemId' }
        ]
      });
      expect(nullResult).toEqual({
        ok: false,
        issues: [
          { param: 'itemId', code: 'missing', message: 'Missing required param: itemId' }
        ]
      });
    });

    it('returns invalid_type issue for non-string values', () => {
      const result = requireStringParam('itemId', 123);

      expect(result).toEqual({
        ok: false,
        issues: [
          { param: 'itemId', code: 'invalid_type', message: 'Param "itemId" must be a string' }
        ]
      });
    });

    it('returns invalid_value issue for blank strings when empty values are not allowed', () => {
      const result = requireStringParam('itemId', '   ');

      expect(result).toEqual({
        ok: false,
        issues: [
          { param: 'itemId', code: 'invalid_value', message: 'Param "itemId" cannot be empty' }
        ]
      });
    });
  });

  describe('optionalStringParam', () => {
    it('returns undefined for nullish optional values', () => {
      const undefinedResult = optionalStringParam('origin', undefined);
      const nullResult = optionalStringParam('origin', null);

      expect(undefinedResult).toEqual({ ok: true, value: undefined });
      expect(nullResult).toEqual({ ok: true, value: undefined });
    });

    it('returns trimmed value for valid optional string', () => {
      const result = optionalStringParam('origin', '  home  ');

      expect(result).toEqual({ ok: true, value: 'home' });
    });

    it('returns invalid_type issue for non-string optional value', () => {
      const result = optionalStringParam('origin', false);

      expect(result).toEqual({
        ok: false,
        issues: [
          { param: 'origin', code: 'invalid_type', message: 'Param "origin" must be a string' }
        ]
      });
    });

    it('returns invalid_value issue for blank optional string', () => {
      const result = optionalStringParam('origin', '  ');

      expect(result).toEqual({
        ok: false,
        issues: [
          { param: 'origin', code: 'invalid_value', message: 'Param "origin" cannot be empty' }
        ]
      });
    });
  });

  describe('allParamResults', () => {
    it('returns combined typed value when all parts are valid', () => {
      const result = allParamResults<{
        itemId: string;
        origin: string | undefined;
      }>({
        itemId: requireStringParam('itemId', 'home-1'),
        origin: optionalStringParam('origin', '  home  ')
      });

      expect(result).toEqual({
        ok: true,
        value: {
          itemId: 'home-1',
          origin: 'home'
        }
      });
    });

    it('collects issues from multiple failing param checks', () => {
      const result = allParamResults<{
        itemId: string;
        origin: string | undefined;
      }>({
        itemId: requireStringParam('itemId', undefined),
        origin: optionalStringParam('origin', '   ')
      });

      expect(result).toEqual({
        ok: false,
        issues: [
          { param: 'itemId', code: 'missing', message: 'Missing required param: itemId' },
          { param: 'origin', code: 'invalid_value', message: 'Param "origin" cannot be empty' }
        ]
      });
    });
  });
});

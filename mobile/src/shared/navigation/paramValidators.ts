/**
 * Small, framework-agnostic helpers for route / deep-link param validation.
 * Use results to drive UI fallbacks (e.g. shared error/empty states) without coupling to React Navigation.
 */

export type ParamIssueCode = 'missing' | 'invalid_type' | 'invalid_value';

export type ParamIssue = {
  /** Logical param name (e.g. route key or query key). */
  param: string;
  code: ParamIssueCode;
  message: string;
};

export type ParamResult<T> = { ok: true; value: T } | { ok: false; issues: ParamIssue[] };

function issue(param: string, code: ParamIssueCode, message: string): ParamIssue {
  return { param, code, message };
}

export type RequireStringOptions = {
  /**
   * When false (default), strings that are only whitespace are invalid.
   * When true, empty / whitespace is accepted after trimming to `""`.
   */
  allowEmpty?: boolean;
};

/**
 * Required non-null string param. Fails on missing, wrong type, or (by default) blank strings.
 */
export function requireStringParam(
  name: string,
  value: unknown,
  options: RequireStringOptions = {}
): ParamResult<string> {
  if (value === undefined || value === null) {
    return { ok: false, issues: [issue(name, 'missing', `Missing required param: ${name}`)] };
  }
  if (typeof value !== 'string') {
    return {
      ok: false,
      issues: [issue(name, 'invalid_type', `Param "${name}" must be a string`)]
    };
  }
  if (!options.allowEmpty && value.trim() === '') {
    return {
      ok: false,
      issues: [issue(name, 'invalid_value', `Param "${name}" cannot be empty`)]
    };
  }
  return { ok: true, value: options.allowEmpty ? value : value.trim() };
}

/**
 * Optional string. `undefined` / `null` succeeds with `undefined`. If present, must be a string
 * and satisfy the same empty rules as {@link requireStringParam}.
 */
export function optionalStringParam(
  name: string,
  value: unknown,
  options: RequireStringOptions = {}
): ParamResult<string | undefined> {
  if (value === undefined || value === null) {
    return { ok: true, value: undefined };
  }
  if (typeof value !== 'string') {
    return {
      ok: false,
      issues: [issue(name, 'invalid_type', `Param "${name}" must be a string`)]
    };
  }
  if (!options.allowEmpty && value.trim() === '') {
    return {
      ok: false,
      issues: [issue(name, 'invalid_value', `Param "${name}" cannot be empty`)]
    };
  }
  return { ok: true, value: options.allowEmpty ? value : value.trim() };
}

/**
 * Combine per-field results into one object result. All issues are collected when multiple fields fail.
 */
export function allParamResults<T extends Record<string, unknown>>(
  parts: { [K in keyof T]: ParamResult<T[K]> }
): ParamResult<T> {
  const outIssues: ParamIssue[] = [];
  const value = {} as T;

  (Object.keys(parts) as (keyof T)[]).forEach((key) => {
    const r = parts[key];
    if (r.ok) {
      value[key] = r.value;
    } else {
      outIssues.push(...r.issues);
    }
  });

  if (outIssues.length > 0) {
    return { ok: false, issues: outIssues };
  }
  return { ok: true, value };
}

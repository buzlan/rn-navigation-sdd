import type { ParamIssue } from './paramValidators';

/**
 * Discriminated navigation diagnostics recorded in-app (no external analytics).
 * Each payload is stored with an ISO `at` timestamp when recorded.
 */
export type NavDiagnosticPayload =
  | {
      kind: 'invalid_params';
      routeKey?: string;
      issues: readonly ParamIssue[];
    }
  | {
      kind: 'guard_rejected';
      reason: 'signed_out' | 'session_restoring';
      attemptedRouteKey?: string;
    }
  | {
      kind: 'fallback_route';
      reason: string;
      from?: string;
    }
  | {
      kind: 'route_resolved';
      routeKey: string;
      source?: 'internal' | 'deep_link' | 'restore';
    };

export type NavDiagnosticEvent = NavDiagnosticPayload & { at: string };

const MAX_EVENTS = 50;
const buffer: NavDiagnosticEvent[] = [];

function append(payload: NavDiagnosticPayload): void {
  const event: NavDiagnosticEvent = { ...payload, at: new Date().toISOString() };
  buffer.unshift(event);
  if (buffer.length > MAX_EVENTS) {
    buffer.length = MAX_EVENTS;
  }
  logDev(event);
}

function logDev(event: NavDiagnosticEvent): void {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.warn('[nav:diagnostic]', event.kind, event);
  }
}

/** Most recent first; capped length for demo/local debugging. */
export function getRecentNavDiagnostics(): ReadonlyArray<NavDiagnosticEvent> {
  return [...buffer];
}

export function recordInvalidParams(
  issues: readonly ParamIssue[],
  routeKey?: string
): void {
  append({ kind: 'invalid_params', issues, routeKey });
}

export function recordGuardRejection(
  reason: 'signed_out' | 'session_restoring',
  attemptedRouteKey?: string
): void {
  append({ kind: 'guard_rejected', reason, attemptedRouteKey });
}

export function recordFallbackRoute(reason: string, from?: string): void {
  append({ kind: 'fallback_route', reason, from });
}

export function recordRouteResolved(
  routeKey: string,
  source?: 'internal' | 'deep_link' | 'restore'
): void {
  append({ kind: 'route_resolved', routeKey, source });
}

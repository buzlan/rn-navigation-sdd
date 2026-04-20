# Navigation Contract: Navigation Playground

## Purpose

Define the navigation interface and behavioral contract for the demo app so implementers and
reviewers share one source of truth for route ownership, params, and guard behavior.

## Navigator Responsibilities

### Root Navigator

- Owns auth-state-based flow switching.
- Composes main app shell and auth shell.
- Hosts modal routes that should appear above primary navigation context.

### Auth Navigator

- Exposes only signed-out and sign-in related screens.
- Must never render protected app routes while session is signed out.

### App Shell Navigator

- Hosts bottom tabs as primary entry.
- Includes Home nested stack, drawer sections, and shared route registration.

### Home Stack Navigator

- Hosts Home list, Home details, and modal trigger points.
- Enforces details route param contract and fallback behavior.

### Drawer Navigator

- Hosts secondary sections reachable from authenticated app context.
- Must preserve return behavior to prior app context when closed.

## Route Contract Table

| Route Key | Navigator Scope | Requires Auth | Entry Methods | Required Params |
|-----------|-----------------|---------------|---------------|-----------------|
| `Auth/Welcome` | auth | No | appLaunch | None |
| `Auth/SignIn` | auth | No | appLaunch, redirect | None |
| `Tabs/Home` | tabs | Yes | postAuth, tab | None |
| `Tabs/Explore` | tabs | Yes | postAuth, tab | None |
| `Tabs/Profile` | tabs | Yes | postAuth, tab | None |
| `Home/Details` | homeStack | Yes | push, deepLink | `itemId` (string) |
| `Home/ModalInfo` | modal | Yes | modal, push | `origin` (string, optional) |
| `Drawer/Settings` | drawer | Yes | drawer, deepLink | None |
| `Shared/Info` | shared | Yes | push, drawer, deepLink | `sourcePath` (string) |
| `Navigation/Fallback` | root | No | redirect | `reason` (string) |

## Guard and Validation Rules

- Protected routes MUST redirect signed-out users to `Auth/SignIn`.
- Deep-link targets that require auth MUST preserve intended destination for post-auth resume.
- Routes with required params MUST validate presence and shape before screen render.
- Invalid params MUST route to `Navigation/Fallback` or an in-screen error state without crash.
- Unsupported deep-link paths MUST resolve to safe fallback and log diagnostic context.

## Back Navigation Contract

- Modal dismissal returns to immediate prior context.
- Stack back pops within current stack before leaving tab context.
- Closing drawer returns focus to last active app screen.
- Sign-out resets protected navigation history and lands in auth flow.

## Shared Screen Contract

- `Shared/Info` is reachable from at least two paths (e.g., Home and Drawer).
- Shared screen behavior MUST remain consistent regardless of origin.
- Origin can be represented via optional `sourcePath` for analytics/debug display only.

## Non-Functional Contract Clauses

- Route keys must be centralized and stable.
- Param typing must be explicit in route declarations.
- Navigation transitions must be deterministic and testable.
- Error and empty-state UX must use common shared patterns.

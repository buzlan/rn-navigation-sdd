# Implementation Plan: Navigation Playground

**Branch**: `001-navigation-playground` | **Date**: 2026-04-20 | **Spec**: `specs/001-navigation-playground/spec.md`
**Input**: Feature specification from `specs/001-navigation-playground/spec.md`

## Summary

Build a React Native demo app that showcases multiple navigation patterns in one coherent user
experience: auth gating, root app switching, tabs, nested stacks, drawer sections, modal flows,
deep linking, typed params, and predictable back navigation. The implementation uses a simple but
production-minded modular architecture where navigation composition is centralized, feature screen
modules are isolated, route contracts are typed, auth state is explicit, and error/fallback
behavior is consistent across invalid params and unauthorized access attempts.

## Technical Context

**Language/Version**: TypeScript (strict mode) on React Native  
**Primary Dependencies**: React Navigation (native stack, tabs, drawer), deep-link integration utilities  
**Storage**: In-memory auth/session state for demo behavior, optional local persistence for session restore  
**Testing**: Jest + React Native Testing Library for screen/state tests, navigation integration tests for flows  
**Target Platform**: iOS and Android mobile devices  
**Project Type**: Mobile application (single React Native app)  
**Performance Goals**: Primary navigation actions render usable target views within 1 second in local demo runs  
**Constraints**: Explicit route typing, predictable back behavior, graceful unauthorized/invalid-param handling  
**Scale/Scope**: Demo app with auth flow, 3+ tabs, nested stack, drawer sections, modal screens, selected deep links

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Type Safety First**: PASS
  - Plan enforces strict TypeScript route contracts and typed auth/navigation interfaces.
- **Predictable Navigation Architecture**: PASS
  - Root navigator owns auth/app switching and composes tabs, stack, drawer, and modal patterns.
- **Feature-Modular Boundaries**: PASS
  - Feature folders isolate UI, navigation, and state logic; shared modules host common contracts/utilities.
- **Clear Screen Contracts**: PASS
  - Each screen defines params, entry paths, and loading/error/empty-state expectations.
- **Quality, Consistency, and Testability**: PASS
  - Plan includes lint/typecheck gates and tests for auth, deep links, invalid params, and back behavior.

Post-design re-check: PASS (artifacts in `research.md`, `data-model.md`, `contracts/`, and `quickstart.md`
preserve all constitutional requirements without exceptions).

## Project Structure

### Documentation (this feature)

```text
specs/001-navigation-playground/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── navigation-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── App.tsx
│   └── providers/
│       └── AppProviders.tsx
├── navigation/
│   ├── RootNavigator.tsx
│   ├── linking/
│   │   ├── linkingConfig.ts
│   │   └── deepLinkRoutes.ts
│   ├── params/
│   │   ├── authParams.ts
│   │   ├── appParams.ts
│   │   ├── homeParams.ts
│   │   └── routeTypes.ts
│   └── guards/
│       └── requireAuth.ts
├── features/
│   ├── auth/
│   │   ├── screens/
│   │   │   ├── SignInScreen.tsx
│   │   │   └── WelcomeScreen.tsx
│   │   ├── state/
│   │   │   ├── authStore.ts
│   │   │   └── authSelectors.ts
│   │   └── navigation/
│   │       └── AuthNavigator.tsx
│   ├── home/
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── HomeDetailsScreen.tsx
│   │   │   └── HomeModalScreen.tsx
│   │   ├── navigation/
│   │   │   └── HomeStackNavigator.tsx
│   │   └── data/
│   │       └── homeMockData.ts
│   ├── secondary/
│   │   ├── screens/
│   │   │   ├── SettingsScreen.tsx
│   │   │   └── HelpScreen.tsx
│   │   └── navigation/
│   │       └── AppDrawerNavigator.tsx
│   └── shared-screen/
│       └── screens/
│           └── SharedInfoScreen.tsx
├── shared/
│   ├── components/
│   │   ├── EmptyStateView.tsx
│   │   └── ErrorStateView.tsx
│   ├── navigation/
│   │   ├── paramValidators.ts
│   │   └── navigationEvents.ts
│   └── data/
│       └── mockFactory.ts
└── tests/
    ├── unit/
    │   ├── paramValidators.test.ts
    │   └── authSelectors.test.ts
    └── integration/
        ├── auth-to-app-flow.test.tsx
        ├── deep-link-routing.test.tsx
        └── back-navigation-behavior.test.tsx
```

**Structure Decision**: Single React Native app with feature-based modular boundaries, centralized
navigation composition under `src/navigation/`, and feature ownership under `src/features/`. This
keeps demo complexity low while preserving extension points for additional navigator types.

## Architecture Decisions

### Root Navigation Architecture

- `RootNavigator` is the single entry point for navigation tree composition.
- Root decision is auth-state-driven:
  - signed out -> `AuthNavigator`
  - signed in -> `AppShellNavigator`
- `AppShellNavigator` composes:
  - bottom tabs as primary app navigation,
  - Home tab nested stack,
  - drawer wrapper for secondary sections,
  - modal routes at root presentation level.

### Module Boundaries and Responsibilities

- `src/navigation/`: route contracts, linking config, top-level navigator composition, guards.
- `src/features/auth`: sign-in/out UI and auth state transitions only.
- `src/features/home`: home content, details flow, modal trigger points.
- `src/features/secondary`: drawer-accessed sections.
- `src/features/shared-screen`: screen intentionally reachable from multiple paths.
- `src/shared`: reusable visual states, param validation helpers, mock data utilities.

### Data Flow

- Auth events (`signIn`, `signOut`) update `authStore`.
- `RootNavigator` subscribes to auth selectors and switches flow boundaries.
- Screen navigation actions dispatch typed route intents to the active navigator.
- Params pass through typed route contracts, then through runtime param validation.
- Deep link input is translated into route intents through `linkingConfig` + guard checks.

### Route Param Typing Strategy

- Define route param maps per navigator (`AuthParams`, `HomeStackParams`, `TabParams`, `DrawerParams`).
- Compose root-level route union (`AppRouteParams`) in `routeTypes.ts`.
- Expose typed navigation helper wrappers to prevent untyped route key/param usage.
- Validate incoming optional/untrusted params at runtime with explicit fallback states.

### Deep Linking Configuration Approach

- Centralize deep link mappings in `linkingConfig.ts`.
- Map only approved screens for demo scope (home details, shared screen, optional secondary screen).
- Apply auth guard before allowing protected deep-link destinations.
- On invalid path or invalid params, route to safe fallback with informative error state.

### State Management for Authentication

- Keep demo state simple and explicit with a focused auth store:
  - `status`: `signedOut | signedIn | restoring`
  - `user`: lightweight demo profile or null
- Root flow switching depends only on derived auth selectors.
- Sign-out always clears protected route context and resets to auth entry flow.

### Mock Data Strategy for Demo Screens

- Use static in-repo mock fixtures with typed schemas.
- Generate deterministic sample entities for Home list/details and shared screens.
- Keep mocks colocated with owning feature while shared generators live under `src/shared/data`.

### Error Handling for Invalid Navigation Params

- Route entry validator checks required keys, type shape, and value constraints.
- Invalid params never crash screen rendering; instead show a consistent error or empty state.
- Deep-link param failures redirect to a safe screen and record a debug event.

### Testing Approach for Navigation Flows

- Unit tests:
  - auth selectors and state transitions
  - param validation helpers
  - deep-link route parsing helpers
- Integration tests:
  - unauthenticated launch -> sign-in -> app flow -> sign-out loop
  - tab/stack/drawer/modal transitions and back behavior
  - deep-link routing under signed-in and signed-out states
  - shared screen reached from multiple paths

### Extension Strategy for Future Navigator Types

- Add new navigator types by:
  1. creating dedicated param map and navigation module,
  2. wiring into `RootNavigator` composition table,
  3. extending deep-link mapping only where relevant,
  4. adding integration tests for entry/exit and back semantics.
- Keep existing feature modules unchanged unless ownership explicitly changes.

## Implementation Phases

1. **Foundation**
   - Create route param types, auth store, and root flow switching.
   - Add baseline tabs and auth/app boundary.
2. **Core Navigation Composition**
   - Add Home stack, drawer sections, modal presentation, shared screen routing.
3. **Robustness Layer**
   - Add deep linking, param validation, guard handling, and consistent error/empty states.
4. **Quality and Validation**
   - Add unit/integration tests and run lint/typecheck/format gates.

## Validation Points

- Root auth/app switch works in all session states.
- Navigator transitions are traceable and deterministic.
- Back behavior aligns with expected screen history.
- Invalid/missing params are handled safely and visibly.
- Deep links route correctly or fail safely with guard-aware outcomes.
- Shared screen behavior stays consistent from each entry path.
- Tests cover critical journeys and pass in CI-local runs.

## Complexity Tracking

No constitutional violations currently require justification.

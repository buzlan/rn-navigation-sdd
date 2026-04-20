# Research: Navigation Playground

## Decision 1: Root navigation split by auth state

- **Decision**: Use a single root navigator that conditionally renders auth flow versus main app
  flow based on a dedicated auth session state.
- **Rationale**: Keeps guard logic centralized, prevents protected-route leaks, and makes sign-out
  reset behavior deterministic.
- **Alternatives considered**:
  - Per-screen guard wrappers only: rejected because it scatters security behavior and makes
    unauthorized transitions harder to reason about.
  - Multiple app roots without central orchestration: rejected because back-stack resets become
    less predictable.

## Decision 2: Compose tabs + nested stack + drawer + modal at predictable boundaries

- **Decision**: Use bottom tabs for primary sections, nested stack inside Home, drawer for
  secondary areas, and root-level modal presentation for cross-cutting overlays.
- **Rationale**: Mirrors common React Navigation composition while keeping responsibilities clear
  for a demo.
- **Alternatives considered**:
  - Drawer as app root with tabs nested inside: rejected to avoid complexity in first-time user
    mental model for a demo project.
  - Multiple modal layers within feature stacks: rejected due to back behavior ambiguity.

## Decision 3: Typed route contracts + runtime param validation

- **Decision**: Pair compile-time route param typing with runtime validators for untrusted params
  (especially deep links).
- **Rationale**: Type checking catches local coding mistakes; runtime checks protect external entry
  paths and malformed payloads.
- **Alternatives considered**:
  - Type-only approach: rejected because external deep links can bypass compile-time guarantees.
  - Runtime-only untyped contracts: rejected for weaker developer feedback and maintainability.

## Decision 4: Centralized deep-link map with auth-aware redirect rules

- **Decision**: Keep all deep-link parsing and route mapping in one linking module with explicit
  fallback and auth redirect behavior.
- **Rationale**: Makes supported deep links auditable and easy to extend without hidden behavior.
- **Alternatives considered**:
  - Feature-local deep-link handlers: rejected because route ownership and conflict resolution
    become fragmented.
  - Open all screens to deep links by default: rejected for security and user-experience risks.

## Decision 5: Lightweight auth state management for demo project

- **Decision**: Use a minimal auth store (status + user summary + actions) as single source of
  truth for flow switching.
- **Rationale**: Satisfies guarded-route behavior with minimal complexity and clear testability.
- **Alternatives considered**:
  - Full global state architecture from start: rejected as unnecessary for demo scope.
  - Navigation-only implicit auth state: rejected because business/session logic should not live in
    navigator components.

## Decision 6: Feature-first module organization

- **Decision**: Organize screens and feature logic by domain (`auth`, `home`, `secondary`, shared
  screen) while keeping cross-cutting navigation contracts centralized.
- **Rationale**: Aligns with constitution modularity and keeps extensions low-risk.
- **Alternatives considered**:
  - Navigator-type-first foldering only: rejected because feature ownership becomes unclear over
    time.
  - Flat screen directory: rejected due to poor scalability and traceability.

## Decision 7: Demo data as typed local fixtures

- **Decision**: Use deterministic typed mock data fixtures in-feature with shared builders for
  cross-screen consistency.
- **Rationale**: Enables repeatable navigation demos and deterministic tests without backend
  dependencies.
- **Alternatives considered**:
  - Randomized ad hoc mock generation: rejected for flaky test outcomes.
  - Real backend dependency: rejected for unnecessary setup complexity.

## Decision 8: Testing strategy mixes focused unit tests and flow integration tests

- **Decision**: Cover validators/selectors with unit tests and major user journeys with
  integration tests (auth gating, navigation composition, deep links, back behavior).
- **Rationale**: Gives high confidence in flow integrity while keeping test suite understandable.
- **Alternatives considered**:
  - Integration-only testing: rejected due to slower feedback and weaker fault localization.
  - Unit-only testing: rejected because navigator composition risks would be under-tested.

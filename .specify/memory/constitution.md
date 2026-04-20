# RN Navigation SDD Playground Constitution

## Core Principles

### I. Type Safety First
All application code MUST use strict TypeScript settings and explicit types for public
interfaces. Use `any` only as a temporary migration escape hatch with an inline
justification and a tracked follow-up task. Route params, navigation props, state
selectors, and shared feature contracts MUST be typed and exported from canonical sources.
Rationale: strict typing prevents runtime navigation defects and keeps refactors safe.

### II. Predictable Navigation Architecture
Navigation MUST be organized as a composable hierarchy (root navigator -> feature
navigators -> screens) with clearly defined ownership boundaries. New navigation patterns
such as tabs, drawers, nested stacks, modals, and deep links MUST integrate through shared
navigation conventions instead of ad hoc setup. Cross-feature navigation MUST happen through
typed route definitions, not string literals scattered across screens. Rationale:
predictability improves maintainability and enables scalable extension.

### III. Feature-Modular Boundaries
The repository MUST follow a feature-based folder structure where each feature owns its UI,
navigation wiring, state orchestration, and tests while shared primitives live in explicitly
named shared modules. UI rendering, navigation setup, and business/state logic MUST remain
separated and communicate through typed interfaces. Features MUST avoid importing private
implementation details from other features. Rationale: modular boundaries reduce coupling and
support incremental delivery.

### IV. Clear Screen Contracts
Each screen MUST have a single primary responsibility and a documented contract: accepted
route params, required state dependencies, loading/error/empty behavior, and navigation
outcomes. Route param typing MUST be explicit in navigator param lists and screen props.
Error and empty states MUST be handled consistently through shared patterns rather than
one-off implementations. Rationale: clear contracts improve readability and user experience
consistency.

### V. Quality, Consistency, and Testability
Linting, formatting, and naming conventions are mandatory quality gates for every change.
Code MUST pass configured static checks before merge. Navigation flows and core business
logic MUST be testable in isolation and in integration, with automated coverage for critical
journeys (auth, nested navigation, modal flows, and deep links). Naming MUST follow
consistent conventions for files, components, hooks, routes, and test artifacts. Rationale:
uniform standards preserve readability and confidence over time.

## Architecture Boundaries & Folder Standards

- `src/features/<feature-name>/` MUST contain feature-scoped screens, components, state,
  and navigator configuration.
- `src/navigation/` MUST contain root-level navigation composition, shared route registries,
  and deep-link mapping.
- `src/shared/` (or equivalent) MUST contain reusable UI primitives, utilities, and
  cross-feature abstractions with stable interfaces.
- Screen components MUST delegate non-UI business logic to feature services/hooks/stores.
- State logic MUST not directly depend on presentational UI components.
- Any new navigation pattern MUST include:
  - typed route definitions,
  - integration in the root navigation map,
  - documented ownership (which feature owns it),
  - tests for happy path and failure/empty path behavior.

## Delivery Workflow & Quality Gates

- Every change MUST begin from an approved spec/plan/task workflow entry.
- Pull requests MUST include:
  - evidence of lint/typecheck/format success,
  - tests for affected navigation flows and business logic,
  - explicit note of changed routes, params, or deep-link behavior.
- Reviewers MUST reject changes that:
  - weaken TypeScript strictness,
  - introduce untyped navigation transitions,
  - mix UI and business logic without justification,
  - omit error and empty-state behavior for user-facing screens.
- Naming conventions MUST stay consistent:
  - screens and components: `PascalCase`,
  - hooks/util helpers: `camelCase`,
  - file/folder names: project standard (prefer `kebab-case` for folders and feature keys),
  - route keys: stable, descriptive, and centrally declared.

## Governance

This constitution is the highest-priority engineering guide for this repository and
supersedes conflicting local conventions. Amendments require a documented rationale, an
impact assessment on templates/workflows, and team approval in review.

Versioning policy:
- MAJOR: incompatible principle changes or principle removals.
- MINOR: new principle/section or materially expanded governance.
- PATCH: clarifications and non-semantic wording improvements.

Compliance policy:
- Constitution checks are required during planning and review.
- Violations MUST be explicitly documented with justification and follow-up tasks.
- Repeated violations require amendment review or corrective action in templates/processes.

**Version**: 1.0.0 | **Ratified**: 2026-04-20 | **Last Amended**: 2026-04-20

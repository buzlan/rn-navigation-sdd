# Tasks: Navigation Playground

**Input**: Design documents from `/specs/001-navigation-playground/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Test tasks are included because the specification explicitly requires testability of navigation flows and core logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize project structure and baseline tooling for predictable implementation.

- [ ] T001 Create navigation-focused folder structure in `src/app`, `src/navigation`, `src/features`, `src/shared`, and `tests`
- [ ] T002 Configure TypeScript strict options and path aliases in `tsconfig.json`
- [ ] T003 [P] Add ESLint + Prettier config for naming/style rules in `.eslintrc.js` and `.prettierrc`
- [ ] T004 [P] Add Jest and React Native Testing Library baseline setup in `jest.config.js` and `tests/setupTests.ts`
- [ ] T005 Install and wire React Navigation dependencies in `package.json` and `src/app/providers/AppProviders.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared architecture contracts and guard foundations required by all stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T006 Define canonical route param maps and root route union in `src/navigation/params/authParams.ts`, `src/navigation/params/appParams.ts`, `src/navigation/params/homeParams.ts`, and `src/navigation/params/routeTypes.ts`
- [ ] T007 Implement auth session store and selectors in `src/features/auth/state/authStore.ts` and `src/features/auth/state/authSelectors.ts`
- [ ] T008 Implement route guard helper for protected routes in `src/navigation/guards/requireAuth.ts`
- [ ] T009 [P] Create shared error and empty-state UI primitives in `src/shared/components/ErrorStateView.tsx` and `src/shared/components/EmptyStateView.tsx`
- [ ] T010 [P] Implement route param validation utilities in `src/shared/navigation/paramValidators.ts`
- [ ] T011 Add navigation diagnostics event helpers in `src/shared/navigation/navigationEvents.ts`
- [ ] T012 Create deterministic mock data factory in `src/shared/data/mockFactory.ts`

**Checkpoint**: Route typing, auth state, guards, validators, and shared states are ready for story implementation.

---

## Phase 3: User Story 1 - Complete Auth-to-App Entry (Priority: P1) 🎯 MVP

**Goal**: Users reliably transition from signed-out auth flow to signed-in app flow and back out on sign-out.

**Independent Test**: From signed out, open app -> auth flow appears -> sign in -> tab app appears -> sign out -> auth flow restored.

### Tests for User Story 1

- [ ] T013 [P] [US1] Add auth state transition unit tests in `tests/unit/auth/authStore.test.ts`
- [ ] T014 [P] [US1] Add root flow switching integration test in `tests/integration/auth-to-app-flow.test.tsx`
- [ ] T015 [US1] Add guarded route redirect integration test for signed-out access in `tests/integration/auth-guard-redirect.test.tsx`

### Implementation for User Story 1

- [ ] T016 [P] [US1] Implement auth screens in `src/features/auth/screens/WelcomeScreen.tsx` and `src/features/auth/screens/SignInScreen.tsx`
- [ ] T017 [US1] Implement auth navigator in `src/features/auth/navigation/AuthNavigator.tsx`
- [ ] T018 [US1] Implement root navigator auth/app switching in `src/navigation/RootNavigator.tsx`
- [ ] T019 [US1] Implement app entry wiring in `src/app/App.tsx` with navigation container and auth provider context
- [ ] T020 [US1] Implement sign-out reset behavior and protected history clearing in `src/navigation/RootNavigator.tsx` and `src/features/auth/state/authStore.ts`
- [ ] T021 [US1] Add verification notes for auth entry/exit behavior in `specs/001-navigation-playground/quickstart.md`

**Checkpoint**: Auth lifecycle is complete and independently testable as MVP.

---

## Phase 4: User Story 2 - Navigate Across App Patterns (Priority: P2)

**Goal**: Authenticated users can navigate tabs, nested stack, drawer, and modal with predictable back behavior.

**Independent Test**: Sign in, switch among 3+ tabs, open details from Home with params, open/dismiss modal, open drawer section, and validate back navigation path.

### Tests for User Story 2

- [ ] T022 [P] [US2] Add integration test for tabs plus nested stack details flow in `tests/integration/tabs-stack-flow.test.tsx`
- [ ] T023 [P] [US2] Add integration test for drawer navigation access and return behavior in `tests/integration/drawer-flow.test.tsx`
- [ ] T024 [P] [US2] Add integration test for modal presentation and dismissal behavior in `tests/integration/modal-flow.test.tsx`
- [ ] T025 [US2] Add integration test for shared screen reachable from multiple paths in `tests/integration/shared-screen-multipath.test.tsx`

### Implementation for User Story 2

- [ ] T026 [P] [US2] Implement main tab navigator with at least three tabs in `src/navigation/AppTabsNavigator.tsx`
- [ ] T027 [P] [US2] Implement Home feature screens and mock-backed list data in `src/features/home/screens/HomeScreen.tsx` and `src/features/home/data/homeMockData.ts`
- [ ] T028 [US2] Implement Home stack navigator with typed details route in `src/features/home/navigation/HomeStackNavigator.tsx`
- [ ] T029 [US2] Implement Home details screen param consumption in `src/features/home/screens/HomeDetailsScreen.tsx`
- [ ] T030 [US2] Implement modal screen and root modal route registration in `src/features/home/screens/HomeModalScreen.tsx` and `src/navigation/RootNavigator.tsx`
- [ ] T031 [US2] Implement drawer navigator and secondary screens in `src/features/secondary/navigation/AppDrawerNavigator.tsx`, `src/features/secondary/screens/SettingsScreen.tsx`, and `src/features/secondary/screens/HelpScreen.tsx`
- [ ] T032 [US2] Implement shared screen module with source-path awareness in `src/features/shared-screen/screens/SharedInfoScreen.tsx`
- [ ] T033 [US2] Validate back navigation semantics across stack, drawer, modal, and tabs in `tests/integration/back-navigation-behavior.test.tsx`

**Checkpoint**: Multi-navigator composition works coherently for signed-in flows.

---

## Phase 5: User Story 3 - Support Safe Direct Entry (Priority: P3)

**Goal**: Deep links and route params are safely processed with guard-aware redirects and graceful fallbacks.

**Independent Test**: Open valid and invalid deep links in signed-in and signed-out states and verify destination, fallback, and auth redirect behavior.

### Tests for User Story 3

- [ ] T034 [P] [US3] Add unit tests for param validators and error codes in `tests/unit/navigation/paramValidators.test.ts`
- [ ] T035 [P] [US3] Add unit tests for deep link parsing and route resolution in `tests/unit/navigation/deepLinkRoutes.test.ts`
- [ ] T036 [P] [US3] Add integration test for valid deep links into selected screens in `tests/integration/deep-link-valid-routes.test.tsx`
- [ ] T037 [P] [US3] Add integration test for invalid/missing params fallback behavior in `tests/integration/deep-link-invalid-params.test.tsx`
- [ ] T038 [US3] Add integration test for protected deep links when signed out in `tests/integration/deep-link-auth-guard.test.tsx`

### Implementation for User Story 3

- [ ] T039 [US3] Implement deep-link route registry in `src/navigation/linking/deepLinkRoutes.ts`
- [ ] T040 [US3] Implement navigation container linking configuration in `src/navigation/linking/linkingConfig.ts`
- [ ] T041 [US3] Integrate runtime param validation into details and shared routes in `src/features/home/screens/HomeDetailsScreen.tsx` and `src/features/shared-screen/screens/SharedInfoScreen.tsx`
- [ ] T042 [US3] Implement fallback route/screen for rejected intents in `src/features/shared-screen/screens/NavigationFallbackScreen.tsx` and `src/navigation/RootNavigator.tsx`
- [ ] T043 [US3] Implement auth-aware deep-link redirect/resume behavior in `src/navigation/guards/requireAuth.ts` and `src/navigation/RootNavigator.tsx`

**Checkpoint**: Deep links, param validation, and auth guards are robust and independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gates, cleanup, and documentation for maintainable incremental delivery.

- [ ] T044 [P] Add end-to-end smoke integration covering full happy path in `tests/integration/navigation-smoke-happy-path.test.tsx`
- [ ] T045 Run and fix typecheck/lint/format gates via project scripts in `package.json` and update scripts if needed
- [ ] T046 Perform navigation code cleanup and remove dead paths in `src/navigation/` and `src/features/`
- [ ] T047 [P] Document navigator responsibilities, extension steps, and known edge cases in `README.md`
- [ ] T048 [P] Add task-based commit guidance and verification checklist in `specs/001-navigation-playground/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story phases (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on completion of required user stories

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; serves as MVP and unlocks realistic app-shell validation
- **US2 (P2)**: Starts after Foundational; benefits from US1 complete but remains independently testable
- **US3 (P3)**: Starts after Foundational; requires navigator structure from US2 for deep-link targets

### Within Each User Story

- Write tests first and ensure they fail before implementation
- Implement screens/contracts before orchestration where applicable
- Add verification task before moving to next story

### Suggested Completion Order

T001 -> T012 -> (US1: T013 -> T021) -> (US2: T022 -> T033) -> (US3: T034 -> T043) -> T044 -> T048

### Parallel Opportunities

- **Setup**: T003 and T004 can run in parallel after T001/T002
- **Foundational**: T009/T010/T011 can run in parallel after T006/T007/T008
- **US1**: T013 and T014 in parallel; T016 can proceed while tests are being finalized
- **US2**: T022/T023/T024 parallel; T026/T027 parallel; T031 and T032 parallel
- **US3**: T034/T035/T036/T037 parallel; T039 and T040 parallel
- **Polish**: T047 and T048 parallel after T045/T046

---

## Parallel Example: User Story 2

```bash
# Parallel test preparation
Task: "T022 [US2] tabs + stack integration test in tests/integration/tabs-stack-flow.test.tsx"
Task: "T023 [US2] drawer integration test in tests/integration/drawer-flow.test.tsx"
Task: "T024 [US2] modal integration test in tests/integration/modal-flow.test.tsx"

# Parallel implementation slices
Task: "T026 [US2] app tabs in src/navigation/AppTabsNavigator.tsx"
Task: "T027 [US2] home screens + mock data in src/features/home/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) with tests and verification.
3. Commit MVP in task-based slices for clean history.

### Incremental Delivery

1. Add US2 for multi-navigator composition.
2. Add US3 for deep-link and validation robustness.
3. Finish with polish, docs, and final quality gates.

### Commit Strategy

- Prefer one commit per completed task or tightly related task pair.
- Keep each commit passing lint/type/tests for modified scope.
- Use commit messages that include task IDs (e.g., `feat: T028 implement HomeStackNavigator typed details route`).

---

## Notes

- All tasks include concrete file paths and explicit deliverables.
- Tasks are sized for approximately 2–4 hours by keeping scope narrow and dependency-aware.
- Tests are included to satisfy navigation flow and business-logic testability requirements.

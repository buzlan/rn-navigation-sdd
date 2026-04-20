# Data Model: Navigation Playground

## Entity: AuthSession

### Purpose

Represents user authentication state used to switch between auth and app flows and enforce
guarded navigation.

### Fields

- `status` (enum): `signedOut | restoring | signedIn`
- `userId` (string, optional): stable demo identifier when signed in
- `displayName` (string, optional): demo user label
- `lastAuthChangeAt` (datetime string): timestamp of latest sign-in or sign-out action

### Validation Rules

- `status` MUST always be present.
- `userId` and `displayName` MUST be absent when `status = signedOut`.
- `userId` MUST be present when `status = signedIn`.

### State Transitions

- `signedOut -> restoring`: app startup session restore begins.
- `restoring -> signedIn`: restore succeeds or sign-in completes.
- `restoring -> signedOut`: restore fails or no prior session found.
- `signedIn -> signedOut`: explicit sign-out or auth invalidation.

## Entity: RouteDefinition

### Purpose

Declares navigable destinations, navigator ownership, and route parameter contracts.

### Fields

- `routeKey` (string): canonical unique route name
- `navigatorScope` (enum): `auth | tabs | homeStack | drawer | modal | shared`
- `requiresAuth` (boolean): indicates if auth is required
- `entryMethods` (string array): allowed entry contexts (`tab`, `push`, `drawer`, `modal`, `deeplink`)
- `paramsSchemaId` (string, optional): reference to associated route param schema

### Validation Rules

- `routeKey` MUST be unique.
- `entryMethods` MUST include at least one allowed method.
- `requiresAuth = true` routes MUST not be reachable while `AuthSession.status = signedOut`.

## Entity: RouteParamsPayload

### Purpose

Represents parameters supplied during navigation for routes that require contextual input.

### Fields

- `routeKey` (string): destination route key
- `payload` (object): key/value parameter map
- `source` (enum): `internalNavigation | deepLink`
- `validated` (boolean): result of runtime validation
- `validationErrors` (string array): error codes/messages when validation fails

### Validation Rules

- `routeKey` MUST reference an existing `RouteDefinition`.
- Required fields in `payload` MUST be present for routes with required params.
- `validated = false` MUST include at least one value in `validationErrors`.

## Entity: DeepLinkIntent

### Purpose

Represents an incoming deep-link request before it is converted into route navigation.

### Fields

- `rawUrl` (string): incoming deep-link URL
- `targetRouteKey` (string, optional): parsed route destination
- `parsedParams` (object, optional): params parsed from URL
- `requiresAuth` (boolean): whether target route is protected
- `resolutionStatus` (enum): `resolved | redirectedToAuth | redirectedToFallback | rejected`
- `resolutionReason` (string, optional): description of why fallback/redirect occurred

### Validation Rules

- `rawUrl` MUST be non-empty.
- `resolutionStatus = resolved` requires `targetRouteKey` to be present.
- Invalid or unsupported links MUST resolve to `redirectedToFallback` or `rejected`, never crash.

## Entity Relationships

- `AuthSession` controls whether a `RouteDefinition` with `requiresAuth = true` is allowed.
- `RouteParamsPayload.routeKey` references `RouteDefinition.routeKey`.
- `DeepLinkIntent` resolves to `RouteDefinition` plus a `RouteParamsPayload` validation result.

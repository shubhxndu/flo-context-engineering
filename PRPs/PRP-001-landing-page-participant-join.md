name: "PRP-001: Landing Page with Participant Join Flow - TypeScript Implementation"
description: |

---

## Goal

**Feature Goal**: Create a mobile-first landing page that allows workshop participants to join sessions using 4-character alphanumeric codes while providing clear CTAs for organizers to access their dashboard.

**Deliverable**: Complete landing page component with participant join form, validation, session persistence, and organizer navigation.

**Success Definition**: Participants can successfully join workshops by entering valid codes and their details, with session data persisting across page refreshes and clear error handling for invalid inputs.

## User Persona (if applicable)

**Target User**: Workshop participants and organizers accessing the app during live sessions

**Use Case**: Participants joining active workshops via workshop codes shared by organizers

**User Journey**:
1. Participant receives 4-character workshop code from organizer
2. Navigates to landing page on mobile device
3. Enters workshop code and personal details
4. Gets redirected to workshop session page
5. Session persists if they refresh or return later

**Pain Points Addressed**:
- Complicated sign-up processes for temporary workshop attendance
- Lost session data when participants accidentally refresh pages
- Poor mobile experience during live workshops
- Unclear path for organizers to access admin functions

## Why

- Provides frictionless entry point for workshop participants using simple 4-character codes
- Ensures reliable session management for demo environments with 5-10 concurrent users
- Mobile-first design matches real workshop usage patterns (participants on phones)
- Clear separation between participant and organizer flows reduces confusion

## What

User-visible behavior:
- Clean, mobile-optimized landing page with prominent join form
- 4-character code input with real-time validation feedback
- Name and optional email fields with proper validation
- Clear "Join Workshop" button with loading states
- Prominent "Organizer Dashboard" button for workshop leaders
- Error handling with user-friendly messages
- Session persistence using cookies

Technical requirements:
- TypeScript-first implementation with strict type safety
- React Hook Form with Zod validation
- Cookie-based session management
- Responsive design using Tailwind CSS
- Pages Router routing to workshop session

### Success Criteria

- [ ] Participant can enter valid 4-character workshop code and join session
- [ ] Form validation prevents invalid codes (not 4 chars, special characters)
- [ ] Session data persists in cookies for 24 hours
- [ ] Mobile-responsive design works on 320px+ viewports
- [ ] Loading states and error messages provide clear user feedback
- [ ] Organizer CTA redirects to `/o/login` page
- [ ] TypeScript compiles with zero errors
- [ ] All form validation edge cases handled properly

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- file: src/pages/index.tsx
  why: Current landing page structure and patterns to follow
  pattern: Pages Router component export pattern, TypeScript typing
  gotcha: Must use ReactElement instead of JSX.Element for return types

- file: src/lib/utils.ts
  why: Existing utility functions and cn() class merging pattern
  pattern: Class variance authority usage with Tailwind
  gotcha: Import pattern for utility functions

- file: src/utils/session.ts
  why: Session management patterns already established
  pattern: Cookie handling with js-cookie, TypeScript interfaces
  gotcha: Session persistence strategy and expiration handling

- file: src/types/index.ts
  why: Existing TypeScript type definitions and naming conventions
  pattern: Interface naming, export patterns
  gotcha: Strict TypeScript settings require explicit typing

- file: CLAUDE.md
  why: Project-specific guidelines for TypeScript, React patterns, validation
  pattern: Zod validation requirements, React 19 features, component structure
  critical: MUST use ReactElement, NEVER JSX.Element; Zod validation for all external data
```

### Current Codebase tree

```bash
src/
├── components/                 # (exists but empty - needs join form component)
├── config/
│   └── constants.ts           # App constants
├── lib/
│   ├── api/
│   │   ├── organizerApi.ts    # RTK Query organizer endpoints
│   │   └── sessionApi.ts      # RTK Query session endpoints
│   ├── env.ts                 # Environment validation
│   └── utils.ts               # Utility functions
├── pages/
│   ├── _app.tsx               # Next.js app wrapper
│   ├── _document.tsx          # Next.js document
│   ├── index.tsx              # Current landing page (needs enhancement)
│   ├── o/
│   │   ├── dashboard.tsx      # Organizer dashboard
│   │   └── login.tsx          # Organizer login
│   └── s/
│       └── [code].tsx         # Workshop session page
├── store/
│   └── index.ts               # Redux store with RTK Query
├── styles/                    # Tailwind and global styles
├── test/
│   └── setup.ts               # Test configuration
├── types/
│   └── index.ts               # Global TypeScript types
└── utils/
    ├── session.ts             # Session management utilities
    └── visibility.ts          # Document visibility detection
```

### Desired Codebase tree with files to be added and responsibility of file

```bash
src/
├── components/
│   ├── ui/                    # Base UI components (shadcn/ui pattern)
│   │   ├── button.tsx         # Reusable button component
│   │   ├── input.tsx          # Form input component
│   │   └── form.tsx           # Form wrapper components
│   └── JoinForm.tsx           # Participant join form component
├── lib/
│   └── schemas/
│       └── workshop.ts        # Zod validation schemas
├── pages/
│   └── index.tsx              # Enhanced landing page (modified)
└── types/
    └── workshop.ts            # Workshop-specific TypeScript types
```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: React 19 + Next.js 15 Pages Router specific requirements
// MUST use ReactElement instead of JSX.Element for component return types
import { ReactElement } from 'react';

// CRITICAL: Project uses strict TypeScript - all props must be explicitly typed
// NO implicit any types allowed, must use proper interfaces

// CRITICAL: Zod validation required for ALL external data per CLAUDE.md
// Form data, URL params, API responses must be validated

// CRITICAL: RTK Query already configured - must integrate with existing store
// Cookie session management already established in utils/session.ts

// GOTCHA: Pages Router requires default exports for page components
// API routes not needed for this task - client-side redirect only

// GOTCHA: Tailwind CSS with shadcn/ui patterns established
// Must follow class-variance-authority pattern for component variants

// GOTCHA: react-hook-form + Zod resolver pattern already in dependencies
// Must use @hookform/resolvers/zod for form validation integration
```

## Implementation Blueprint

### Data models and structure

Create the core data models, we ensure type safety and consistency.

```typescript
Examples:
 - Zod schemas for workshop join form validation
 - TypeScript interfaces for form data and session
 - Component prop types with strict typing
 - API integration types for RTK Query
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: CREATE lib/schemas/workshop.ts
  - IMPLEMENT: Zod schemas for workshop code and participant join form validation
  - FOLLOW pattern: lib/env.ts (Zod schema structure, validation patterns)
  - NAMING: camelCase for schema names, strict validation rules
  - PLACEMENT: Validation schemas in lib/schemas/

Task 2: CREATE types/workshop.ts
  - IMPLEMENT: TypeScript interfaces derived from Zod schemas using z.infer
  - FOLLOW pattern: types/index.ts (interface structure, export patterns)
  - NAMING: PascalCase for interfaces, camelCase for properties
  - DEPENDENCIES: Import and infer types from Task 1 schemas
  - PLACEMENT: Type definitions in types/

Task 3: CREATE components/ui/button.tsx
  - IMPLEMENT: Reusable button component with variants using class-variance-authority
  - FOLLOW pattern: shadcn/ui button component pattern, forwardRef usage
  - NAMING: PascalCase component, variant props, proper TypeScript typing
  - DEPENDENCIES: Import cn utility from lib/utils.ts
  - PLACEMENT: Base UI components in components/ui/

Task 4: CREATE components/ui/input.tsx
  - IMPLEMENT: Form input component with proper TypeScript props and forwardRef
  - FOLLOW pattern: shadcn/ui input component pattern, React.forwardRef
  - NAMING: PascalCase component, proper HTML input props extension
  - DEPENDENCIES: Import cn utility from lib/utils.ts
  - PLACEMENT: Base UI components in components/ui/

Task 5: CREATE components/JoinForm.tsx
  - IMPLEMENT: Participant join form with react-hook-form and Zod validation
  - FOLLOW pattern: pages/o/login.tsx (form handling patterns if they exist)
  - NAMING: PascalCase component, proper props interface, event handlers
  - DEPENDENCIES: Import schemas from Task 1, types from Task 2, UI components from Tasks 3-4
  - PLACEMENT: Feature components in components/

Task 6: MODIFY pages/index.tsx
  - IMPLEMENT: Enhanced landing page integrating JoinForm component
  - FOLLOW pattern: pages/o/login.tsx (page component structure, TypeScript typing)
  - NAMING: Default export, proper metadata, ReactElement return type
  - DEPENDENCIES: Import JoinForm from Task 5, session utilities
  - PLACEMENT: Page routes in pages/

Task 7: CREATE components/ui/form.tsx
  - IMPLEMENT: Form wrapper components for consistent form styling and behavior
  - FOLLOW pattern: shadcn/ui form component patterns with Context API
  - NAMING: PascalCase components, proper form context typing
  - DEPENDENCIES: React Hook Form context, proper TypeScript generics
  - PLACEMENT: Base UI components in components/ui/
```

### Implementation Patterns & Key Details

```typescript
// Show critical patterns and gotchas - keep concise, focus on non-obvious details

// Example: Zod schema pattern with workshop code validation
const workshopCodeSchema = z
  .string()
  .length(4, 'Workshop code must be exactly 4 characters')
  .regex(/^[A-Z0-9]{4}$/, 'Code must contain only letters and numbers')
  .transform(val => val.toUpperCase());

// PATTERN: Strict TypeScript interfaces with Zod inference
export type WorkshopCode = z.infer<typeof workshopCodeSchema>;

// Example: Component pattern with proper TypeScript props
interface JoinFormProps {
  // PATTERN: Strict TypeScript interfaces (follow existing type patterns)
  onSubmit: (data: ParticipantJoinForm) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export const JoinForm = ({ onSubmit, isLoading = false, className }: JoinFormProps): ReactElement => {
  // PATTERN: react-hook-form with Zod resolver (check CLAUDE.md requirements)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ParticipantJoinForm>({
    resolver: zodResolver(participantJoinSchema),
    mode: 'onBlur',
  });

  // GOTCHA: Must handle async form submission with loading states
  // CRITICAL: Session persistence using existing utils/session.ts patterns

  return (
    // PATTERN: Tailwind CSS with cn() utility for class merging
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit(onSubmit)}>
      {/* Follow shadcn/ui component composition patterns */}
    </form>
  );
};

// Example: Page component pattern
export default function LandingPage(): ReactElement {
  // PATTERN: Next.js Pages Router with proper TypeScript typing
  // GOTCHA: Must use router.push() for client-side navigation
  // CRITICAL: Session management with cookie persistence
}
```

### Integration Points

```yaml
SESSION_MANAGEMENT:
  - utility: utils/session.ts
  - pattern: "Cookie-based session with js-cookie, 24-hour expiration"
  - method: "setParticipantSession(data) returns session object"

ROUTING:
  - framework: Next.js Pages Router
  - pattern: "router.push(`/s/${workshopCode}`) for workshop redirect"
  - pattern: "router.push('/o/login') for organizer redirect"

STYLING:
  - framework: Tailwind CSS with shadcn/ui components
  - pattern: "class-variance-authority for component variants"
  - utility: "cn() function for conditional class merging"

STATE_MANAGEMENT:
  - store: Redux Toolkit with RTK Query (already configured)
  - pattern: "Local component state for form, RTK Query for API data"
  - integration: "Session data passed to RTK Query hooks in workshop page"
```

## Validation Loop

### Level 1: Syntax & Style (Immediate Feedback)

```bash
# Run after each file creation - fix before proceeding
npm run lint                    # ESLint checks with TypeScript rules
npx tsc --noEmit               # TypeScript type checking (no JS output)
npm run format                 # Prettier formatting

# Project-wide validation
npm run lint:fix               # Auto-fix linting issues
npm run type-check             # Full TypeScript validation

# Expected: Zero errors. If errors exist, READ output and fix before proceeding.
```

### Level 2: Unit Tests (Component Validation)

```bash
# Test each component as it's created
npm test -- __tests__/JoinForm.test.tsx
npm test -- __tests__/workshop.schema.test.ts

# Form validation testing
npm test -- --testNamePattern="workshop code validation"
npm test -- --testNamePattern="form submission"

# Coverage validation
npm test -- --coverage --watchAll=false

# Expected: All tests pass. If failing, debug root cause and fix implementation.
```

### Level 3: Integration Testing (System Validation)

```bash
# Development server validation
npm run dev &
sleep 5  # Allow Next.js startup time

# Landing page load validation
curl -I http://localhost:3000/
# Expected: 200 OK response

# Form submission flow validation (manual testing)
# 1. Open http://localhost:3000/ in browser
# 2. Enter valid workshop code (e.g., "A1B2")
# 3. Enter participant name
# 4. Click "Join Workshop"
# 5. Verify redirect to /s/A1B2
# 6. Check browser cookies for session data

# Workshop code validation testing
# 1. Try invalid codes: "abc", "12345", "A!@#"
# 2. Verify error messages appear
# 3. Try valid codes: "A1B2", "XYZ9"
# 4. Verify successful form submission

# Mobile responsiveness validation
# 1. Test on mobile viewport (320px width)
# 2. Verify form is usable and readable
# 3. Check touch targets are adequate size

# Expected: All user flows working, proper validation, no console errors
```

### Level 4: Creative & Domain-Specific Validation

```bash
# TypeScript/Next.js Specific Validation:

# Strict TypeScript validation
npx tsc --noEmit --strict        # Strict TypeScript checking

# Production build validation
npm run build                    # Verify build succeeds
npm start &                      # Test production server
curl -I http://localhost:3000/   # Verify production serves correctly

# Form validation edge cases
# Test validation with:
# - Empty inputs
# - Special characters in workshop codes
# - Very long names
# - Invalid email formats
# - Network errors during submission

# Session persistence validation
# 1. Join workshop successfully
# 2. Close browser/tab
# 3. Return to same workshop URL
# 4. Verify session data is restored
# 5. Check cookie expiration handling

# Accessibility validation
# 1. Test keyboard navigation through form
# 2. Verify screen reader compatibility
# 3. Check color contrast ratios
# 4. Validate ARIA labels and roles

# Expected: All edge cases handled, accessibility standards met, production-ready
```

## Final Validation Checklist

### Technical Validation

- [ ] All 4 validation levels completed successfully
- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npx tsc --noEmit`
- [ ] No formatting issues: `npm run format --check`
- [ ] Production build succeeds: `npm run build`

### Feature Validation

- [ ] All success criteria from "What" section met
- [ ] Manual testing successful: form submission and validation flow
- [ ] Error cases handled gracefully with proper TypeScript error types
- [ ] Session persistence works across browser sessions
- [ ] Mobile-responsive design tested on multiple viewport sizes
- [ ] Organizer navigation path clearly visible and functional

### Code Quality Validation

- [ ] Follows existing TypeScript/React patterns and naming conventions
- [ ] File placement matches desired codebase tree structure
- [ ] Zod validation schemas properly implemented for all form data
- [ ] Dependencies properly managed with correct TypeScript typings
- [ ] shadcn/ui component patterns followed consistently

### TypeScript/Next.js Specific

- [ ] Proper TypeScript interfaces and types defined with z.infer
- [ ] Pages Router component patterns followed correctly
- [ ] ReactElement return types used (NOT JSX.Element)
- [ ] react-hook-form integration with Zod resolver working
- [ ] Cookie-based session management integrated properly

### Documentation & Deployment

- [ ] Code is self-documenting with clear TypeScript types
- [ ] Component props interfaces properly documented
- [ ] Form validation error messages are user-friendly
- [ ] Session management strategy documented in code comments

---

## Anti-Patterns to Avoid

- ❌ Don't use JSX.Element - use ReactElement from react import
- ❌ Don't skip Zod validation for form data - required per CLAUDE.md
- ❌ Don't ignore TypeScript strict mode errors - fix them properly
- ❌ Don't hardcode workshop codes - use proper validation
- ❌ Don't forget mobile-first responsive design
- ❌ Don't create new session management patterns - use existing utils/session.ts
- ❌ Don't bypass react-hook-form validation - integrate with Zod properly
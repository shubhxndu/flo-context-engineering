# CLAUDE.md

This file provides comprehensive guidance to Claude Code when working with the Workshop Companion App - a demo Next.js application with Pages Router, React 19, TypeScript, RTK Query, and SSR deployment for 5-10 concurrent users.

## Core Development Philosophy

### KISS (Keep It Simple, Stupid)
Simplicity should be a key goal in design. Choose straightforward solutions over complex ones whenever possible. Simple solutions are easier to understand, maintain, and debug.

### YAGNI (You Aren't Gonna Need It)
Avoid building functionality on speculation. Implement features only when they are needed, not when you anticipate they might be useful in the future.

### Design Principles
- **Dependency Inversion**: High-level modules should not depend on low-level modules. Both should depend on abstractions.
- **Open/Closed Principle**: Software entities should be open for extension but closed for modification.
- **Vertical Slice Architecture**: Organize by features, not layers
- **Component-First**: Build with reusable, composable components with single responsibility
- **Fail Fast**: Validate inputs early, throw errors immediately

## 🤖 AI Assistant Guidelines

### Context Awareness
- When implementing features, always check existing patterns first
- Prefer composition over inheritance in all designs
- Use existing utilities before creating new ones
- Check for similar functionality in other domains/features

### Common Pitfalls to Avoid
- Creating duplicate functionality
- Overwriting existing tests
- Modifying core frameworks without explicit instruction
- Adding dependencies without checking existing alternatives

### Workflow Patterns
- Preferably create tests BEFORE implementation (TDD)
- Use "think hard" for architecture decisions
- Break complex tasks into smaller, testable units
- Validate understanding before implementation

### Search Command Requirements
**CRITICAL**: Always use `rg` (ripgrep) instead of traditional `grep` and `find` commands:

```bash
# ❌ Don't use grep
grep -r "pattern" .

# ✅ Use rg instead
rg "pattern"

# ❌ Don't use find with name
find . -name "*.tsx"

# ✅ Use rg with file filtering
rg --files | rg "\.tsx$"
# or
rg --files -g "*.tsx"
```

**Enforcement Rules:**
```
(
    r"^grep\b(?!.*\|)",
    "Use 'rg' (ripgrep) instead of 'grep' for better performance and features",
),
(
    r"^find\s+\S+\s+-name\b",
    "Use 'rg --files | rg pattern' or 'rg --files -g pattern' instead of 'find -name' for better performance",
),
```

## 🧱 Code Structure & Modularity

### File and Component Limits
- **Never create a file longer than 500 lines of code.** If approaching this limit, refactor by splitting into modules or helper files.
- **Components should be under 200 lines** for better maintainability.
- **Functions should be short and focused sub 50 lines** and have a single responsibility.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.

## 🚀 Next.js 15 & React 19 Key Features (Pages Router)

### Next.js 15 Core Features for Workshop Companion App (Demo)
- **Turbopack**: Fast bundler for development (stable)
- **Pages Router**: Traditional file-system based routing (as per TDD specification)
- **SSR Deployment**: Server-side rendering for Heroku deployment
- **API Routes**: Server-side API endpoints for session management
- **Image Optimization**: For workshop resources and assets
- **Session Persistence**: Maintain participant sessions across page refreshes

### React 19 Features
- **React Compiler**: Eliminates need for `useMemo`, `useCallback`, and `React.memo`
- **Actions**: Handle async operations with built-in pending states
- **use() API**: Simplified data fetching and context consumption
- **Document Metadata**: Native support for SEO tags
- **Enhanced Suspense**: Better loading states and error boundaries

### TypeScript Integration (MANDATORY)
- **MUST use `ReactElement` instead of `JSX.Element`** for return types
- **MUST import types from 'react'** explicitly
- **NEVER use `JSX.Element` namespace** - use React types directly

```typescript
// ✅ CORRECT: Modern React 19 typing
import { ReactElement } from 'react';

function MyComponent(): ReactElement {
  return <div>Content</div>;
}

// ❌ FORBIDDEN: Legacy JSX namespace
function MyComponent(): JSX.Element {  // Cannot find namespace 'JSX'
  return <div>Content</div>;
}
```

## 🏗️ Project Structure (Workshop Companion App - Pages Router)

```
src/
├── pages/                 # Next.js Pages Router (TDD specification)
│   ├── index.tsx          # Landing page (participant join / organizer CTA)
│   ├── o/                 # Organizer routes
│   │   ├── login.tsx      # Organizer login
│   │   └── dashboard.tsx  # Organizer dashboard
│   └── s/                 # Session routes
│       └── [code].tsx     # Participant session
├── components/            # Shared UI components
│   ├── ui/                # Base components (shadcn/ui)
│   ├── JoinForm.tsx       # Participant join form
│   ├── OrganizerLoginForm.tsx # Organizer authentication
│   ├── ModuleViewer.tsx   # Module content display
│   ├── ProgressBar.tsx    # Workshop progress indicator
│   ├── NavArrows.tsx      # Module navigation
│   ├── BackToCurrent.tsx  # Return to current module
│   ├── EmojiTray.tsx      # Reaction system
│   ├── ResourcesList.tsx  # Workshop resources
│   └── EndedStatusPage.tsx # Session end state
├── lib/api/               # RTK Query slices (TDD specification)
│   ├── sessionApi.ts      # Participant API (state/modules/react)
│   └── organizerApi.ts    # Organizer API (login, workshops, control)
├── store/                 # Redux store + RTK Query config
│   └── index.ts           # Store configuration
├── lib/                   # Core utilities and configurations
│   ├── utils.ts           # Utility functions (visibility, polling control)
│   ├── env.ts             # Environment validation
│   └── constants.ts       # Application constants
├── config/                # Configuration files
│   ├── env.ts             # Environment variables
│   ├── constants.ts       # App constants
│   └── errorCodes.ts      # Error code mappings
├── utils/                 # Utility functions
│   ├── visibility.ts      # Document visibility detection
│   ├── polling.ts         # Polling control logic
│   ├── storage.ts         # Client storage utilities
│   └── session.ts         # Session persistence management
├── hooks/                 # Shared custom hooks
├── styles/                # Styling files (Tailwind + globals)
└── types/                 # Shared TypeScript types
```

## 🎯 TypeScript Configuration (STRICT REQUIREMENTS)

### MUST Follow These Compiler Options
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### MANDATORY Type Requirements
- **NEVER use `any` type** - use `unknown` if type is truly unknown
- **MUST have explicit return types** for all functions and components
- **MUST use proper generic constraints** for reusable components
- **MUST use type inference from Zod schemas** using `z.infer<typeof schema>`
- **NEVER use `@ts-ignore`** or `@ts-expect-error` - fix the type issue properly

## 📦 Package Management & Dependencies

### Essential Dependencies (Workshop Companion App)
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "react-markdown": "^9.0.0",
    "rehype-sanitize": "^6.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "15.0.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

### Workshop-Specific Dependencies
```bash
# UI and Styling (shadcn/ui)
npm install @radix-ui/react-* class-variance-authority clsx tailwind-merge

# Form Handling and Validation
npm install react-hook-form @hookform/resolvers zod

# State Management (RTK Query - as per TDD)
npm install @reduxjs/toolkit react-redux

# Markdown Rendering (TDD requirement)
npm install react-markdown rehype-sanitize

# Session Management
npm install js-cookie uuid
npm install -D @types/js-cookie @types/uuid

# Development Tools
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

## 🛡️ Data Validation with Zod (MANDATORY FOR ALL EXTERNAL DATA)

### MUST Follow These Validation Rules
- **MUST validate ALL external data**: API responses, form inputs, URL params, environment variables
- **MUST use branded types**: For all IDs and domain-specific values
- **MUST fail fast**: Validate at system boundaries, throw errors immediately
- **MUST use type inference**: Always derive TypeScript types from Zod schemas

### Schema Example (MANDATORY PATTERNS)
```typescript
import { z } from 'zod';

// MUST use branded types for ALL IDs
const UserIdSchema = z.string().uuid().brand<'UserId'>();
type UserId = z.infer<typeof UserIdSchema>;

// Environment validation (REQUIRED)
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

// API response validation
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: z.string().optional(),
    timestamp: z.string().datetime(),
  });
```

### Form Validation with React Hook Form
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
});

type FormData = z.infer<typeof formSchema>;

function UserForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    // Handle validated data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## 🧪 Testing Strategy (MANDATORY REQUIREMENTS)

### MUST Meet These Testing Standards
- **MINIMUM 80% code coverage** - NO EXCEPTIONS
- **MUST co-locate tests** with components in `__tests__` folders
- **MUST use React Testing Library** for all component tests
- **MUST test user behavior** not implementation details
- **MUST mock external dependencies** appropriately

### Test Configuration (Vitest + React Testing Library)
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### Test Example (WITH MANDATORY DOCUMENTATION)
```typescript
/**
 * @fileoverview Tests for UserProfile component
 * @module components/__tests__/UserProfile.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@testing-library/react';
import { UserProfile } from '../UserProfile';

/**
 * Test suite for UserProfile component.
 * 
 * Tests user interactions, state management, and error handling.
 * Mocks external dependencies to ensure isolated unit tests.
 */
describe('UserProfile', () => {
  /**
   * Tests that user name updates correctly on form submission.
   */
  it('should update user name on form submission', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    
    render(<UserProfile onUpdate={onUpdate} />);
    
    const input = screen.getByLabelText(/name/i);
    await user.type(input, 'John Doe');
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'John Doe' })
    );
  });
});
```

## 🎨 Component Guidelines (STRICT REQUIREMENTS)

### MANDATORY Component Documentation

```typescript
/**
 * Button component with multiple variants and sizes.
 * 
 * Provides a reusable button with consistent styling and behavior
 * across the application. Supports keyboard navigation and screen readers.
 * 
 * @component
 * @example
 * ```tsx
 * <Button 
 *   variant="primary" 
 *   size="medium" 
 *   onClick={handleSubmit}
 * >
 *   Submit Form
 * </Button>
 * ```
 */
interface ButtonProps {
  /** Visual style variant of the button */
  variant: 'primary' | 'secondary';
  
  /** Size of the button @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  
  /** Click handler for the button */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Content to be rendered inside the button */
  children: React.ReactNode;
  
  /** Whether the button is disabled @default false */
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size = 'medium', onClick, children, disabled = false }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }))}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

### Shadcn/UI Component Pattern (RECOMMENDED)
```typescript
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## 🔄 State Management (Workshop Companion App - RTK Query)

### State Management Hierarchy (Demo App Specification)
1. **Local State**: `useState` for component-specific UI state
2. **Server State**: **RTK Query** for ALL API data (as per TDD)
3. **Global State**: Redux store with RTK Query integration
4. **URL State**: Workshop codes and navigation state
5. **Session State**: Participant identity with cookie persistence (for demo reliability)

### RTK Query Setup (TDD Pattern)
```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { sessionApi } from '../lib/api/sessionApi';
import { organizerApi } from '../lib/api/organizerApi';

export const store = configureStore({
  reducer: {
    [sessionApi.reducerPath]: sessionApi.reducer,
    [organizerApi.reducerPath]: organizerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sessionApi.middleware,
      organizerApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Session API (Participant Features)
```typescript
// lib/api/sessionApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ['Workshop', 'State', 'Modules', 'Reactions'],
  endpoints: (builder) => ({
    joinWorkshop: builder.mutation<JoinResponse, JoinRequest>({
      query: (body) => ({
        url: '/join',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Workshop'],
    }),
    getWorkshopState: builder.query<StateResponse, string>({
      query: (code) => `/w/${code}/state`,
      providesTags: ['State'],
      // Polling every 3 seconds (TDD requirement)
      pollingInterval: 3000,
    }),
    getWorkshopModules: builder.query<ModulesResponse, string>({
      query: (code) => `/w/${code}/modules`,
      providesTags: ['Modules'],
      // Polling every 3 seconds (TDD requirement)
      pollingInterval: 3000,
    }),
    submitReaction: builder.mutation<ReactionResponse, ReactionRequest>({
      query: ({ code, ...body }) => ({
        url: `/w/${code}/react`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reactions'],
    }),
  }),
});

export const {
  useJoinWorkshopMutation,
  useGetWorkshopStateQuery,
  useGetWorkshopModulesQuery,
  useSubmitReactionMutation,
} = sessionApi;
```

### Session Persistence (Demo App Requirement)
```typescript
// utils/session.ts
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export interface ParticipantSession {
  id: string;
  workshopCode: string;
  name: string;
  email?: string;
  joinedAt: string;
}

export const useParticipantSession = (workshopCode: string) => {
  const sessionKey = `workshop_${workshopCode}`;

  const getSession = (): ParticipantSession | null => {
    const sessionData = Cookies.get(sessionKey);
    return sessionData ? JSON.parse(sessionData) : null;
  };

  const setSession = (name: string, email?: string): ParticipantSession => {
    const session: ParticipantSession = {
      id: uuidv4(),
      workshopCode,
      name,
      email,
      joinedAt: new Date().toISOString(),
    };

    Cookies.set(sessionKey, JSON.stringify(session), {
      expires: 1, // 1 day
      sameSite: 'strict'
    });

    return session;
  };

  const clearSession = () => {
    Cookies.remove(sessionKey);
  };

  return { getSession, setSession, clearSession };
};
```

### Polling Control (Demo App - Simplified)
```typescript
// utils/polling.ts
export const usePollingControl = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};
```

## 🔐 Security Requirements (MANDATORY)

### Input Validation (MUST IMPLEMENT ALL)
- **MUST sanitize ALL user inputs** with Zod before processing
- **MUST validate file uploads**: type, size, and content
- **MUST prevent XSS** with proper escaping
- **MUST implement CSRF protection** for forms
- **NEVER use dangerouslySetInnerHTML** without sanitization

### Environment Variables (MUST VALIDATE)
```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

## 🚀 Performance Guidelines

### Next.js 15 Optimizations (Pages Router + SSR)
- **SSR Deployment**: Server-side rendering for Heroku deployment
- **API Routes**: Built-in API endpoints for session management
- **Client-side optimization**: Code splitting for workshop features
- **Image optimization** with next/image (workshop resources)
- **Font optimization** with next/font
- **Session management**: Cookie-based persistence

### SSR Configuration (Demo App Requirement)
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    turbo: {
      // Turbopack for development
    },
  },
  // API routes enabled for session management
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Heroku Deployment Setup (SSR)
```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "heroku-postbuild": "npm run build"
  }
}
```

```
// Procfile
web: npm start
```

## 💅 Code Style & Quality

### ESLint Configuration (MANDATORY)
```javascript
// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "react/function-component-definition": ["error", {
        "namedComponents": "arrow-function"
      }],
    },
  },
];

export default eslintConfig;
```

## 📋 Development Commands

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --max-warnings 0",
    "lint:fix": "next lint --fix",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "validate": "npm run type-check && npm run lint && npm run test:coverage"
  }
}
```

## ⚠️ CRITICAL GUIDELINES (Workshop Companion App)

### Demo App Compliance Requirements
1. **ENFORCE Pages Router** - NO App Router usage (TDD specification)
2. **MANDATE RTK Query** - ALL server state through RTK Query
3. **IMPLEMENT SSR deployment** - Build process MUST support Heroku SSR deployment
4. **ENSURE polling control** - 3s intervals, pause when tab backgrounded
5. **VALIDATE workshop codes** - 4-character alphanumeric validation
6. **SUPPORT session persistence** - Cookie-based participant sessions for demo reliability
7. **IMPLEMENT markdown rendering** - react-markdown + rehype-sanitize
8. **ENFORCE mobile-first** - All components responsive by default
9. **OPTIMIZE for 5-10 users** - No complex caching or scaling needed

### Development Standards (MUST FOLLOW ALL)
1. **ENFORCE strict TypeScript** - ZERO compromises on type safety
2. **VALIDATE everything with Zod** - ALL external data must be validated
3. **MINIMUM 80% test coverage** - NO EXCEPTIONS
4. **MUST co-locate related files** - Tests MUST be in `__tests__` folders
5. **MAXIMUM 500 lines per file** - Split if larger
6. **MAXIMUM 200 lines per component** - Refactor if larger
7. **MUST handle ALL states** - Loading, error, empty, and success
8. **MUST use semantic commits** - feat:, fix:, docs:, refactor:, test:
9. **MUST write complete JSDoc** - ALL exports must be documented
10. **NEVER use `any` type** - Use proper typing or `unknown`
11. **MUST pass ALL automated checks** - Before ANY merge

## 📋 Pre-commit Checklist (MUST COMPLETE ALL)

- [ ] TypeScript compiles with ZERO errors (`npm run type-check`)
- [ ] Tests written and passing with 80%+ coverage (`npm run test:coverage`)
- [ ] ESLint passes with ZERO warnings (`npm run lint`)
- [ ] Prettier formatting applied (`npm run format`)
- [ ] All components have complete JSDoc documentation
- [ ] Zod schemas validate ALL external data
- [ ] ALL states handled (loading, error, empty, success)
- [ ] Error boundaries implemented for features
- [ ] Accessibility requirements met (ARIA labels, keyboard nav)
- [ ] No console.log statements in production code
- [ ] Environment variables validated with Zod
- [ ] Component files under 200 lines
- [ ] No prop drilling beyond 2 levels
- [ ] Server/Client components used appropriately

### FORBIDDEN Practices
- **NEVER use `any` type** (except library declaration merging with comments)
- **NEVER skip tests** for new functionality
- **NEVER ignore TypeScript errors** with `@ts-ignore`
- **NEVER trust external data** without Zod validation
- **NEVER use `JSX.Element`** - use `ReactElement` instead
- **NEVER store sensitive data** in localStorage or client state
- **NEVER use dangerouslySetInnerHTML** without sanitization
- **NEVER exceed file/component size limits**
- **NEVER prop drill** beyond 2 levels - use context or state management
- **NEVER commit** without passing all quality checks

---

*This guide is optimized for Next.js 15 with React 19. Keep it updated as frameworks evolve.*
*Focus on type safety, performance, and maintainability in all development decisions.*
*Last updated: January 2025*
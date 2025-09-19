# UI Style Guide

A comprehensive UI style guide for the Workshop Companion App - a demo Next.js application with dark theme default.

## Project Foundation

```yaml
framework: Next.js 15 (Pages Router)
language: TypeScript
styling: Tailwind CSS + shadcn/ui
animation: Motion (Framer Motion)
icons: Lucide React
forms: React Hook Form + Zod
state_management: RTK Query + Redux
architecture: Server-Side Rendering (SSR) for Heroku deployment
theme: Dark mode default (black background, white CTAs)
scale: 5-10 concurrent users (demo scope)
session: Cookie-based persistence (1 day expiry)
```

## Color System

### CSS Custom Properties

```css
:root {
  --background: #000000;
  --foreground: #ffffff;
}

[data-theme="light"] {
  --background: rgb(250, 250, 250);
  --foreground: #171717;
}

@theme {
  --color-primary: #ffffff;
  --color-primary-hover: #f1f5f9;
  --color-primary-foreground: #000000;
  --color-secondary: #1e293b;
  --color-secondary-hover: #334155;
  --color-secondary-foreground: #ffffff;
  --color-accent: #3b82f6;
  --color-accent-hover: #2563eb;
  --color-muted: #64748b;
  --color-border: #334155;
  --color-ring: #3b82f6;
}
```

### Workshop App Color Utilities (shadcn-style)

```css
/* Primary CTA colors - White on black */
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  border: 1px solid var(--color-primary);
}
.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

/* Secondary button colors */
.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-secondary-foreground);
  border: 1px solid var(--color-border);
}
.btn-secondary:hover {
  background-color: var(--color-secondary-hover);
}

/* Accent colors for reactions and highlights */
.text-accent {
  color: var(--color-accent);
}
.bg-accent {
  background-color: var(--color-accent);
}
.hover\:bg-accent:hover {
  background-color: var(--color-accent-hover);
}

/* Workshop-specific utilities */
.workshop-card {
  background-color: var(--color-secondary);
  border: 1px solid var(--color-border);
  color: var(--color-secondary-foreground);
}
```

## Typography System

### Font Stack

```css
@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Light.woff2") format("woff2");
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Medium.woff2") format("woff2");
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}

/* Font utilities */
.font-roxborough {
  font-family: "Satoshi", system-ui, sans-serif;
}
.font-sorts-mill {
  font-family: "Sorts Mill Goudy", serif !important;
}

/* Force custom font globally */
* {
  font-family: "Satoshi", system-ui, sans-serif !important;
}
```

### Typography Hierarchy

```css
/* Hero headings */
.hero-heading {
  @apply text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold;
}

/* Section headings */
.section-heading {
  @apply text-3xl md:text-4xl lg:text-5xl font-bold;
}

/* Subheadings */
.subheading {
  @apply text-2xl md:text-3xl font-bold;
}

/* Body text sizes */
.body-large {
  @apply text-lg;
}
.body-base {
  @apply text-base;
}
.body-small {
  @apply text-sm;
}

/* Logo text */
.logo-text {
  @apply font-sorts-mill uppercase font-bold;
}
```

## Layout System

### Container Patterns

```css
/* Standard container */
.container-standard {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Section padding */
.section-padding {
  @apply py-12 px-4 sm:px-8 md:px-12 lg:px-16;
}

/* Hero section height */
.hero-height {
  @apply h-[85vh];
}

/* Header offset for fixed navigation */
.main-content {
  @apply pt-16;
}
```

### Grid Patterns

```css
/* Footer grid */
.footer-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8;
}

/* Responsive flex */
.responsive-flex {
  @apply flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6;
}
```

### Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Small**: `sm:` (≥ 640px)
- **Medium**: `md:` (≥ 768px)
- **Large**: `lg:` (≥ 1024px)
- **Extra Large**: `xl:` (≥ 1280px)

## Component Architecture

### Base Component Pattern

```typescript
import React from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  // Component-specific props
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <element ref={ref} className={cn("base-classes", className)} {...props} />
    );
  }
);

Component.displayName = "Component";
export { Component };
```

### Button Component System

```typescript
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses = {
      primary: "bg-white hover:bg-gray-100 text-black border border-white",
      secondary:
        "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          "transform hover:scale-105 active:scale-95",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
```

### Input Component System

```typescript
import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
```

## Theme System

### Theme Context Implementation

```typescript
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Check for saved theme preference or default to dark theme
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to dark theme for workshop app
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Update document class and save to localStorage
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

### Theme Toggle Component

```typescript
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### Global Theme Transitions

```css
/* Smooth transitions for theme changes */
* {
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

body {
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
```

## Animation System

### Keyframe Animations

```css
@keyframes moveHorizontal {
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
}

@keyframes moveInCircle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes scroll-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Animation utility classes */
.animate-first {
  animation: moveVertical 30s ease infinite;
}
.animate-second {
  animation: moveInCircle 20s reverse infinite;
}
.animate-third {
  animation: moveHorizontal 40s ease infinite;
}
.animate-scroll-horizontal {
  animation: scroll-horizontal 20s linear infinite;
}
```

### Motion (Framer Motion) Patterns

```typescript
import { motion } from "motion";

// Page entry animation
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const pageTransition = {
  duration: 0.8,
  ease: "easeOut",
  delay: 0.3,
};

// Staggered children animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Button hover animations
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const buttonTap = {
  scale: 0.95,
};

// Modal animations
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotateX: 40,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotateX: 10,
    transition: { duration: 0.2 },
  },
};
```

### Performance Optimizations

```typescript
// Mobile and reduced motion detection
export function useAnimationPreferences() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    // Reduced motion preference
    const checkReducedMotion = () => {
      setReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return { isMobile, reducedMotion };
}
```

## Form System

### Form Validation with Zod

```typescript
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Standard form schema pattern
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),

  mobile: z
    .string()
    .regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Form hook usage
export function useContactForm() {
  return useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });
}
```

### Form Components

```typescript
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  className,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
```

## Icon System

### Lucide React Integration

```typescript
import {
  ExternalLink,
  FileText,
  Menu,
  X,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";

// Icon with text pattern
export function IconButton({
  children,
  icon: Icon,
  ...props
}: {
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="group inline-flex items-center gap-2" {...props}>
      <Icon className="w-5 h-5" />
      {children}
      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

// Icon sizes
const iconSizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};
```

## Utility Functions

### Class Name Utility

```typescript
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Text Selection Control

```css
/* Disable text selection globally */
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

/* Enable text selection for specific elements */
input,
textarea,
[contenteditable="true"],
.selectable-text {
  -webkit-user-select: text;
  -moz-user-select: text;
  user-select: text;
}
```

## Interactive States

### Standard Interaction Classes

```css
/* Button interactions */
.btn-interactive {
  @apply transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer;
}

/* Disabled states */
.btn-disabled {
  @apply cursor-not-allowed opacity-50 pointer-events-none;
}

/* Focus states */
.focus-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2;
}

/* Shadow elevations */
.elevation-1 {
  @apply shadow-md hover:shadow-lg transition-shadow duration-200;
}
.elevation-2 {
  @apply shadow-lg hover:shadow-xl transition-shadow duration-200;
}
.elevation-3 {
  @apply shadow-xl hover:shadow-2xl transition-shadow duration-200;
}
```

## Accessibility

### Screen Reader Support

```typescript
// Screen reader only text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

// Skip link component
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-primary text-white px-4 py-2 rounded-md z-50"
    >
      Skip to main content
    </a>
  );
}
```

### Focus Management

```css
/* Custom focus styles */
.focus-visible {
  @apply outline-none ring-2 ring-brand-primary ring-offset-2;
}

/* Focus trap for modals */
.focus-trap {
  @apply focus-within:ring-2 focus-within:ring-brand-primary;
}
```

## Performance Patterns

### Conditional Rendering

```typescript
// Performance-conscious component loading
export function OptimizedComponent() {
  const { isMobile, reducedMotion } = useAnimationPreferences();

  return (
    <>
      {!isMobile && <ComplexDesktopComponent />}
      {isMobile && <SimpleMobileComponent />}
      {!reducedMotion && <AnimatedComponent />}
      {reducedMotion && <StaticComponent />}
    </>
  );
}
```

### Image Optimization

```typescript
import Image from "next/image";

export function OptimizedImage({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={props.width || 400}
      height={props.height || 300}
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      className="object-cover"
      {...props}
    />
  );
}
```

## Responsive Design Utilities

### Mobile-First Media Queries

```css
/* Custom responsive utilities */
@media (max-width: 639px) {
  .mobile-only {
    display: block;
  }
  .desktop-only {
    display: none;
  }
}

@media (min-width: 640px) {
  .mobile-only {
    display: none;
  }
  .desktop-only {
    display: block;
  }
}

/* Responsive text alignment */
.text-center-mobile {
  text-align: center;
}

@media (min-width: 768px) {
  .text-center-mobile {
    text-align: left;
  }
}
```

### Responsive Spacing

```css
/* Progressive spacing scale */
.space-responsive {
  @apply space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12;
}

.gap-responsive {
  @apply gap-4 sm:gap-6 md:gap-8 lg:gap-12;
}

.p-responsive {
  @apply p-4 sm:p-6 md:p-8 lg:p-12;
}
```

## Workshop-Specific Components

### Module Viewer Component

```typescript
interface ModuleViewerProps {
  module: {
    id: string;
    title: string;
    contentMarkdown: string;
    index: number;
  };
  totalModules: number;
  isCurrentModule: boolean;
}

const ModuleViewer: React.FC<ModuleViewerProps> = ({
  module,
  totalModules,
  isCurrentModule,
}) => {
  return (
    <div
      className={cn(
        "p-6 rounded-lg border transition-all duration-200",
        isCurrentModule
          ? "bg-gray-900 border-blue-500 ring-2 ring-blue-500"
          : "bg-gray-800 border-gray-600"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{module.title}</h2>
        <span className="text-sm text-gray-400">
          {module.index + 1} of {totalModules}
        </span>
      </div>
      <ReactMarkdown className="prose prose-invert max-w-none">
        {module.contentMarkdown}
      </ReactMarkdown>
    </div>
  );
};
```

### Progress Bar Component

```typescript
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full bg-gray-800 rounded-full h-2", className)}>
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
      <div className="mt-2 text-sm text-gray-400 text-center">
        Module {currentStep} of {totalSteps}
      </div>
    </div>
  );
};
```

### Emoji Reaction Tray

```typescript
interface EmojiTrayProps {
  onReact: (emoji: string) => void;
  disabled?: boolean;
}

const EmojiTray: React.FC<EmojiTrayProps> = ({ onReact, disabled }) => {
  const emojis = ["👍", "🎉", "👏", "❤️", "✅"];

  return (
    <div className="flex gap-2 p-3 bg-gray-800 rounded-lg border border-gray-600">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          disabled={disabled}
          className="text-2xl p-2 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};
```

## Usage Instructions

### Workshop Companion App Setup

1. **Project Initialization**: Next.js 15 with Pages Router and TypeScript
2. **Dependencies**: Install RTK Query, shadcn/ui, Framer Motion, Lucide React
3. **Theme Setup**: Implement dark theme as default with ThemeProvider
4. **State Management**: Configure Redux store with RTK Query
5. **Session Management**: Implement cookie-based participant sessions
6. **Fonts**: Include Satoshi font family in `/public/fonts/`
7. **Components**: Build workshop-specific components following these patterns
8. **Deployment**: Configure for Heroku SSR deployment

### Key Architectural Decisions

- **SSR over Static Export**: Enables dynamic routing and session management
- **Cookie Sessions**: 1-day expiry for demo reliability
- **RTK Query**: Server state management with 3s polling intervals
- **Dark Theme Default**: Professional appearance with black/white contrast
- **Mobile-First**: Responsive design optimized for all screen sizes
- **Accessibility**: Focus management, ARIA labels, keyboard navigation

This style guide provides the complete design foundation for the Workshop Companion App with specific patterns for workshop functionality, real-time polling, and participant session management.

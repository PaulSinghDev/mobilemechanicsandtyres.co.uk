# Styling Guide

Modern styling patterns using Tailwind CSS utility classes, the `cn()` helper, and CSS variables for theming.

---

## Primary Styling Method: Tailwind CSS

### Basic Usage

Apply styles directly in the `className` attribute using Tailwind utility classes:

```typescript
<div className="p-4 bg-background rounded-lg shadow-md">
    Content
</div>
```

### Common Utility Classes

| Category | Examples |
|----------|----------|
| Spacing | `p-4`, `px-2`, `py-6`, `m-2`, `mx-auto`, `gap-4` |
| Flexbox | `flex`, `flex-col`, `items-center`, `justify-between` |
| Grid | `grid`, `grid-cols-3`, `gap-4` |
| Colors | `bg-background`, `text-foreground`, `border-border` |
| Typography | `text-sm`, `font-medium`, `text-muted-foreground` |
| Sizing | `w-full`, `h-64`, `max-w-md`, `min-h-screen` |
| Borders | `border`, `rounded-lg`, `border-border` |

---

## The cn() Helper Function

### Purpose

The `cn()` helper merges Tailwind classes conditionally and handles class conflicts intelligently (using `clsx` + `tailwind-merge`).

### Import

```typescript
import { cn } from '@/lib/utils';
```

### Basic Conditional Classes

```typescript
<div className={cn(
    "p-4 rounded-lg",
    isActive && "bg-primary text-primary-foreground",
    disabled && "opacity-50 cursor-not-allowed"
)}>
    Content
</div>
```

### Object Syntax

```typescript
<div className={cn(
    "p-4 rounded-lg",
    {
        "bg-primary text-primary-foreground": isActive,
        "opacity-50 cursor-not-allowed": disabled,
        "border-destructive": hasError,
    }
)}>
    Content
</div>
```

### Merging with Props

```typescript
interface ButtonProps {
    className?: string;
    variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ className, variant = 'default' }) => {
    return (
        <button className={cn(
            "px-4 py-2 rounded-md font-medium",
            variant === 'default' && "bg-primary text-primary-foreground",
            variant === 'outline' && "border border-input bg-background",
            className  // Allow parent to override/extend
        )}>
            Click me
        </button>
    );
};
```

---

## Responsive Design

### Breakpoint Prefixes

Tailwind uses mobile-first responsive design:

| Prefix | Min Width | Description |
|--------|-----------|-------------|
| (none) | 0px | Mobile default |
| `sm:` | 640px | Small screens |
| `md:` | 768px | Medium screens |
| `lg:` | 1024px | Large screens |
| `xl:` | 1280px | Extra large |
| `2xl:` | 1536px | 2X extra large |

### Responsive Examples

```typescript
// Grid that changes columns by screen size
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map(item => <Card key={item.id} />)}
</div>

// Responsive padding
<div className="p-2 sm:p-4 md:p-6 lg:p-8">
    Content
</div>

// Show/hide by screen size
<div className="hidden md:block">
    Desktop only content
</div>

<div className="block md:hidden">
    Mobile only content
</div>

// Responsive flex direction
<div className="flex flex-col md:flex-row gap-4">
    <Sidebar />
    <MainContent />
</div>
```

---

## CSS Variables Theming

### Project Theme Variables

ShadCN uses CSS variables defined in `globals.css` for theming:

```css
:root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
}

.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode overrides */
}
```

### Using Theme Colors in Tailwind

```typescript
// Background colors
<div className="bg-background">  // Uses --background
<div className="bg-primary">     // Uses --primary
<div className="bg-muted">       // Uses --muted
<div className="bg-card">        // Uses --card

// Text colors
<p className="text-foreground">  // Main text
<p className="text-muted-foreground">  // Secondary text
<p className="text-primary">     // Primary color text

// Border colors
<div className="border border-border">  // Standard border
<div className="border border-input">   // Input border
```

---

## Common Styling Patterns

### Flexbox Layouts

```typescript
// Row with centered items
<div className="flex items-center gap-2">
    <Icon />
    <span>Label</span>
</div>

// Column with spacing
<div className="flex flex-col gap-4">
    <Header />
    <Content />
    <Footer />
</div>

// Space between with wrap
<div className="flex flex-wrap justify-between items-center gap-4">
    <Title />
    <Actions />
</div>

// Centered container
<div className="flex items-center justify-center min-h-screen">
    <LoginForm />
</div>
```

### Grid Layouts

```typescript
// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {cards.map(card => <Card key={card.id} {...card} />)}
</div>

// Fixed sidebar layout
<div className="grid grid-cols-[250px_1fr] gap-4">
    <Sidebar />
    <MainContent />
</div>

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
    {items.map(item => <Item key={item.id} />)}
</div>
```

### Container Patterns

```typescript
// Page container with max width
<div className="container mx-auto px-4 py-8">
    <PageContent />
</div>

// Card-like container
<div className="bg-card rounded-lg border shadow-sm p-6">
    <CardContent />
</div>

// Full-height layout
<div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
        <Content />
    </main>
    <Footer />
</div>
```

### Interactive States

```typescript
// Hover and focus states
<button className="
    bg-primary text-primary-foreground
    hover:bg-primary/90
    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
">
    Click me
</button>

// Card with hover effect
<div className="
    bg-card rounded-lg border p-4
    transition-colors
    hover:bg-accent hover:text-accent-foreground
    cursor-pointer
">
    Clickable card
</div>
```

---

## Styling ShadCN Components

### Extending Component Styles

```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Add custom classes to ShadCN components
<Button className="w-full md:w-auto">
    Full width on mobile
</Button>

// Conditional styling
<Button className={cn(
    "transition-all",
    isPrimary && "shadow-lg"
)}>
    Dynamic button
</Button>
```

### Creating Styled Variants

```typescript
// components/ui/primary-button.tsx
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PrimaryButton({ className, ...props }: ButtonProps) {
    return (
        <Button
            className={cn(
                'bg-brand-primary hover:bg-brand-primary/90 font-semibold',
                className
            )}
            {...props}
        />
    );
}
```

---

## Animation & Transitions

### Basic Transitions

```typescript
// Smooth color transition
<div className="transition-colors duration-200 hover:bg-accent">
    Hover me
</div>

// Transform on hover
<div className="transition-transform duration-200 hover:scale-105">
    Grows on hover
</div>

// Multiple properties
<div className="transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-2px]">
    Lifts on hover
</div>
```

### Built-in Animations

```typescript
// Spin animation (for loading)
<Icon className="animate-spin" />

// Pulse animation
<div className="animate-pulse bg-muted rounded h-4 w-full" />

// Bounce animation
<div className="animate-bounce">Bouncing</div>
```

---

## Code Style Standards

### Indentation

**4 spaces** (not 2, not tabs) - project standard

```typescript
export const MyComponent: React.FC = () => {
    return (
        <div className="p-4">
            <span>Content</span>
        </div>
    );
};
```

### Quotes

**Single quotes** for strings (project standard)

```typescript
// ✅ CORRECT
import { Button } from '@/components/ui/button';
<div className='p-4'>

// ❌ WRONG
import { Button } from "@/components/ui/button";
<div className="p-4">
```

### Long Class Names

For components with many classes, break across lines:

```typescript
// ✅ READABLE - Multi-line for many classes
<div
    className={cn(
        'flex items-center justify-between',
        'rounded-lg border bg-card p-4',
        'hover:bg-accent transition-colors',
        isActive && 'ring-2 ring-primary'
    )}
>
    Content
</div>

// ❌ AVOID - Long single line
<div className="flex items-center justify-between rounded-lg border bg-card p-4 hover:bg-accent transition-colors">
```

---

## What NOT to Do

### Avoid Inline Styles

```typescript
// ❌ AVOID - Inline style object
<div style={{ padding: '16px', display: 'flex' }}>

// ✅ PREFERRED - Tailwind classes
<div className="p-4 flex">
```

### Avoid CSS Modules for Simple Cases

```typescript
// ❌ AVOID for simple styling
import styles from './Component.module.css';
<div className={styles.container}>

// ✅ PREFERRED - Tailwind classes
<div className="p-4 bg-card rounded-lg">
```

### Avoid Magic Numbers

```typescript
// ❌ AVOID - Arbitrary values when possible
<div className="p-[17px] mt-[23px]">

// ✅ PREFERRED - Use Tailwind scale
<div className="p-4 mt-6">
```

---

## Summary

**Styling Checklist:**
- ✅ Use Tailwind CSS utility classes
- ✅ Use `cn()` helper for conditional classes
- ✅ Mobile-first responsive design (sm:, md:, lg:)
- ✅ Use CSS variables via `bg-background`, `text-foreground`, etc.
- ✅ 4 space indentation
- ✅ Single quotes
- ✅ Break long class names across lines
- ❌ No inline style objects
- ❌ Avoid arbitrary values when Tailwind scale works

**See Also:**
- [component-patterns.md](component-patterns.md) - Component structure
- [shadcn-components.md](shadcn-components.md) - ShadCN usage
- [complete-examples.md](complete-examples.md) - Full styling examples

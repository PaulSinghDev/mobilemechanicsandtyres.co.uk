# TypeScript Standards

TypeScript best practices for type safety and maintainability in React frontend code.

---

## Strict Mode

### Configuration

TypeScript strict mode is **enabled** in the project:

```json
// tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true
    }
}
```

**This means:**
- No implicit `any` types
- Null/undefined must be handled explicitly
- Type safety enforced

---

## No `any` Type

### The Rule

```typescript
// ❌ NEVER use any
function handleData(data: any) {
    return data.something;
}

// ✅ Use specific types
interface MyData {
    something: string;
}

function handleData(data: MyData) {
    return data.something;
}

// ✅ Or use unknown for truly unknown data
function handleUnknown(data: unknown) {
    if (typeof data === 'object' && data !== null && 'something' in data) {
        return (data as MyData).something;
    }
}
```

**If you truly don't know the type:**
- Use `unknown` (forces type checking)
- Use type guards to narrow
- Document why type is unknown

---

## Explicit Return Types

### Function Return Types

```typescript
// ✅ CORRECT - Explicit return type
function getUser(id: number): Promise<User> {
    return apiClient.get(`/users/${id}`);
}

function calculateTotal(items: Item[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ AVOID - Implicit return type (less clear)
function getUser(id: number) {
    return apiClient.get(`/users/${id}`);
}
```

### Component Return Types

```typescript
// React.FC already provides return type (ReactElement)
export const MyComponent: React.FC<Props> = ({ prop }) => {
    return <div>{prop}</div>;
};

// For custom hooks
function useMyData(id: number): { data: Data; isLoading: boolean } {
    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    return { data: data!, isLoading };
}
```

---

## Type Imports

### Use 'type' Keyword

```typescript
// ✅ CORRECT - Explicitly mark as type import
import type { User } from '~types/user';
import type { Post } from '~types/post';
import type { ColumnDef } from '@tanstack/react-table';
import type { VariantProps } from 'class-variance-authority';

// ❌ AVOID - Mixed value and type imports
import { User } from '~types/user';  // Unclear if type or value
```

**Benefits:**
- Clearly separates types from values
- Better tree-shaking
- Prevents circular dependencies
- TypeScript compiler optimization

---

## Component Prop Interfaces

### Interface Pattern

```typescript
/**
 * Props for MyComponent
 */
interface MyComponentProps {
    /** The user ID to display */
    userId: number;

    /** Optional callback when action completes */
    onComplete?: () => void;

    /** Display mode for the component */
    mode?: 'view' | 'edit';

    /** Additional CSS classes */
    className?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({
    userId,
    onComplete,
    mode = 'view',  // Default value
    className,
}) => {
    return <div className={className}>...</div>;
};
```

**Key Points:**
- Separate interface for props
- JSDoc comments for each prop
- Optional props use `?`
- Provide defaults in destructuring

### Props with Children

```typescript
interface ContainerProps {
    children: React.ReactNode;
    title: string;
}

// React.FC automatically includes children type, but be explicit
export const Container: React.FC<ContainerProps> = ({ children, title }) => {
    return (
        <div>
            <h2>{title}</h2>
            {children}
        </div>
    );
};
```

---

## Tailwind & cn() Utility Typing

### cn() Helper Function

The `cn()` utility from `@/lib/utils` merges Tailwind classes:

```typescript
// utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
```

### Using cn() with TypeScript

```typescript
import { cn } from '@/lib/utils';

interface ButtonProps {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    size = 'md',
    className,
    children,
}) => {
    return (
        <button
            className={cn(
                // Base classes
                'rounded-md font-medium transition-colors',
                // Variant classes
                variant === 'default' && 'bg-primary text-primary-foreground',
                variant === 'outline' && 'border border-input bg-background',
                variant === 'ghost' && 'hover:bg-accent',
                // Size classes
                size === 'sm' && 'h-8 px-3 text-sm',
                size === 'md' && 'h-10 px-4',
                size === 'lg' && 'h-12 px-6 text-lg',
                // Custom classes
                className
            )}
        >
            {children}
        </button>
    );
};
```

### Class Variance Authority (CVA) Pattern

For components with many variants, use CVA:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant,
    size,
    ...props
}) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
};
```

---

## Utility Types

### Partial<T>

```typescript
// Make all properties optional
type UserUpdate = Partial<User>;

function updateUser(id: number, updates: Partial<User>) {
    // updates can have any subset of User properties
}
```

### Pick<T, K>

```typescript
// Select specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;

const preview: UserPreview = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    // Other User properties not allowed
};
```

### Omit<T, K>

```typescript
// Exclude specific properties
type UserWithoutPassword = Omit<User, 'password' | 'passwordHash'>;

const publicUser: UserWithoutPassword = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    // password and passwordHash not allowed
};
```

### Required<T>

```typescript
// Make all properties required
type RequiredConfig = Required<Config>;  // All optional props become required
```

### Record<K, V>

```typescript
// Type-safe object/map
const userMap: Record<string, User> = {
    'user1': { id: 1, name: 'John' },
    'user2': { id: 2, name: 'Jane' },
};

// For class name maps
const classMap: Record<string, string> = {
    container: 'p-4 bg-background rounded-lg',
    header: 'text-xl font-semibold mb-4',
    content: 'space-y-2',
};
```

---

## Type Guards

### Basic Type Guards

```typescript
function isUser(data: unknown): data is User {
    return (
        typeof data === 'object' &&
        data !== null &&
        'id' in data &&
        'name' in data
    );
}

// Usage
if (isUser(response)) {
    console.log(response.name);  // TypeScript knows it's User
}
```

### Discriminated Unions

```typescript
type LoadingState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: Data }
    | { status: 'error'; error: Error };

function Component({ state }: { state: LoadingState }) {
    // TypeScript narrows type based on status
    if (state.status === 'success') {
        return <Display data={state.data} />;  // data available here
    }

    if (state.status === 'error') {
        return <Error error={state.error} />;  // error available here
    }

    return <Loading />;
}
```

---

## Generic Types

### Generic Functions

```typescript
function getById<T>(items: T[], id: number): T | undefined {
    return items.find(item => (item as any).id === id);
}

// Usage with type inference
const users: User[] = [...];
const user = getById(users, 123);  // Type: User | undefined
```

### Generic Components

```typescript
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>): React.ReactElement {
    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>{renderItem(item)}</div>
            ))}
        </div>
    );
}

// Usage
<List<User>
    items={users}
    renderItem={(user) => <UserCard user={user} />}
/>
```

---

## Type Assertions (Use Sparingly)

### When to Use

```typescript
// ✅ OK - When you know more than TypeScript
const element = document.getElementById('my-element') as HTMLInputElement;
const value = element.value;

// ✅ OK - API response that you've validated
const response = await api.getData();
const user = response.data as User;  // You know the shape
```

### When NOT to Use

```typescript
// ❌ AVOID - Circumventing type safety
const data = getData() as any;  // WRONG - defeats TypeScript

// ❌ AVOID - Unsafe assertion
const value = unknownValue as string;  // Might not actually be string
```

---

## Null/Undefined Handling

### Optional Chaining

```typescript
// ✅ CORRECT
const name = user?.profile?.name;

// Equivalent to:
const name = user && user.profile && user.profile.name;
```

### Nullish Coalescing

```typescript
// ✅ CORRECT
const displayName = user?.name ?? 'Anonymous';

// Only uses default if null or undefined
// (Different from || which triggers on '', 0, false)
```

### Non-Null Assertion (Use Carefully)

```typescript
// ✅ OK - When you're certain value exists
const data = queryClient.getQueryData<Data>(['data'])!;

// ⚠️ CAREFUL - Only use when you KNOW it's not null
// Better to check explicitly:
const data = queryClient.getQueryData<Data>(['data']);
if (data) {
    // Use data
}
```

---

## Summary

**TypeScript Checklist:**
- ✅ Strict mode enabled
- ✅ No `any` type (use `unknown` if needed)
- ✅ Explicit return types on functions
- ✅ Use `import type` for type imports
- ✅ JSDoc comments on prop interfaces
- ✅ Utility types (Partial, Pick, Omit, Required, Record)
- ✅ Type guards for narrowing
- ✅ Optional chaining and nullish coalescing
- ✅ CVA/VariantProps for component variants
- ❌ Avoid type assertions unless necessary

**See Also:**
- [component-patterns.md](component-patterns.md) - Component typing
- [data-fetching.md](data-fetching.md) - API typing

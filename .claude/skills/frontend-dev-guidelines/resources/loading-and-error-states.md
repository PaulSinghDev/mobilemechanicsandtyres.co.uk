# Loading & Error States

**CRITICAL**: Proper loading and error state handling prevents layout shift and provides better user experience.

---

## CRITICAL RULE: Never Use Early Returns

### The Problem

```typescript
// ❌ NEVER DO THIS - Early return with loading spinner
const Component = () => {
    const { data, isLoading } = useQuery();

    // WRONG: This causes layout shift and poor UX
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return <Content data={data} />;
};
```

**Why this is bad:**
1. **Layout Shift**: Content position jumps when loading completes
2. **CLS (Cumulative Layout Shift)**: Poor Core Web Vital score
3. **Jarring UX**: Page structure changes suddenly
4. **Lost Scroll Position**: User loses place on page

### The Solutions

**Option 1: SuspenseLoader (PREFERRED for new components)**

```typescript
import { SuspenseLoader } from '~components/SuspenseLoader';

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

export const MyComponent: React.FC = () => {
    return (
        <SuspenseLoader>
            <HeavyComponent />
        </SuspenseLoader>
    );
};
```

**Option 2: LoadingOverlay (for legacy useQuery patterns)**

```typescript
import { LoadingOverlay } from '~components/LoadingOverlay';

export const MyComponent: React.FC = () => {
    const { data, isLoading } = useQuery({ ... });

    return (
        <LoadingOverlay loading={isLoading}>
            <Content data={data} />
        </LoadingOverlay>
    );
};
```

---

## SuspenseLoader Component

### What It Does

- Shows loading indicator while lazy components load
- Smooth fade-in animation
- Prevents layout shift
- Consistent loading experience across app

### Import

```typescript
import { SuspenseLoader } from '~components/SuspenseLoader';
// Or
import { SuspenseLoader } from '@/components/SuspenseLoader';
```

### Basic Usage

```typescript
<SuspenseLoader>
    <LazyLoadedComponent />
</SuspenseLoader>
```

### With useSuspenseQuery

```typescript
import { useSuspenseQuery } from '@tanstack/react-query';
import { SuspenseLoader } from '~components/SuspenseLoader';

const Inner: React.FC = () => {
    // No isLoading needed!
    const { data } = useSuspenseQuery({
        queryKey: ['data'],
        queryFn: () => api.getData(),
    });

    return <Display data={data} />;
};

// Outer component wraps in Suspense
export const Outer: React.FC = () => {
    return (
        <SuspenseLoader>
            <Inner />
        </SuspenseLoader>
    );
};
```

### Multiple Suspense Boundaries

**Pattern**: Separate loading for independent sections

```typescript
export const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <SuspenseLoader>
                <Header />
            </SuspenseLoader>

            <SuspenseLoader>
                <MainContent />
            </SuspenseLoader>

            <SuspenseLoader>
                <Sidebar />
            </SuspenseLoader>
        </div>
    );
};
```

**Benefits:**
- Each section loads independently
- User sees partial content sooner
- Better perceived performance

### Nested Suspense

```typescript
export const ParentComponent: React.FC = () => {
    return (
        <SuspenseLoader>
            {/* Parent suspends while loading */}
            <ParentContent>
                <SuspenseLoader>
                    {/* Nested suspense for child */}
                    <ChildComponent />
                </SuspenseLoader>
            </ParentContent>
        </SuspenseLoader>
    );
};
```

---

## LoadingOverlay Component

### When to Use

- Legacy components with `useQuery` (not refactored to Suspense yet)
- Overlay loading state needed
- Can't use Suspense boundaries

### Usage

```typescript
import { LoadingOverlay } from '~components/LoadingOverlay';

export const MyComponent: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: () => api.getData(),
    });

    return (
        <LoadingOverlay loading={isLoading}>
            <div className="p-4">
                {data && <Content data={data} />}
            </div>
        </LoadingOverlay>
    );
};
```

**What it does:**
- Shows semi-transparent overlay with spinner
- Content area reserved (no layout shift)
- Prevents interaction while loading

---

## Error Handling

### useToast Hook (REQUIRED)

**NEVER use react-toastify** - Project standard is ShadCN Toast

```typescript
import { useToast } from '@/hooks/use-toast';

export const MyComponent: React.FC = () => {
    const { toast } = useToast();

    const handleAction = async () => {
        try {
            await api.doSomething();
            toast({
                title: 'Success',
                description: 'Operation completed successfully',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Operation failed',
                variant: 'destructive',
            });
        }
    };

    return <Button onClick={handleAction}>Do Action</Button>;
};
```

**Toast Variants:**
- `default` - Standard notification
- `destructive` - Error/warning notification

### TanStack Query Error Callbacks

```typescript
import { useSuspenseQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export const MyComponent: React.FC = () => {
    const { toast } = useToast();

    const { data } = useSuspenseQuery({
        queryKey: ['data'],
        queryFn: () => api.getData(),

        // Handle errors
        onError: (error) => {
            toast({
                title: 'Failed to load data',
                description: error.message,
                variant: 'destructive',
            });
            console.error('Query error:', error);
        },
    });

    return <Content data={data} />;
};
```

### Error Boundaries

```typescript
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <Card className="p-4 text-center">
            <CardHeader>
                <CardTitle className="text-destructive">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{error.message}</p>
                <Button onClick={resetErrorBoundary}>Try Again</Button>
            </CardContent>
        </Card>
    );
}

export const MyPage: React.FC = () => {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error) => console.error('Boundary caught:', error)}
        >
            <SuspenseLoader>
                <ComponentThatMightError />
            </SuspenseLoader>
        </ErrorBoundary>
    );
};
```

---

## Complete Examples

### Example 1: Modern Component with Suspense

```typescript
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SuspenseLoader } from '~components/SuspenseLoader';
import { myFeatureApi } from '../api/myFeatureApi';

// Inner component uses useSuspenseQuery
const InnerComponent: React.FC<{ id: number }> = ({ id }) => {
    const { data } = useSuspenseQuery({
        queryKey: ['entity', id],
        queryFn: () => myFeatureApi.getEntity(id),
    });

    // data is always defined - no isLoading needed!
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{data.description}</p>
            </CardContent>
        </Card>
    );
};

// Outer component provides Suspense boundary
export const OuterComponent: React.FC<{ id: number }> = ({ id }) => {
    return (
        <div>
            <SuspenseLoader>
                <InnerComponent id={id} />
            </SuspenseLoader>
        </div>
    );
};

export default OuterComponent;
```

### Example 2: Legacy Pattern with LoadingOverlay

```typescript
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingOverlay } from '~components/LoadingOverlay';
import { myFeatureApi } from '../api/myFeatureApi';

export const LegacyComponent: React.FC<{ id: number }> = ({ id }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['entity', id],
        queryFn: () => myFeatureApi.getEntity(id),
    });

    return (
        <LoadingOverlay loading={isLoading}>
            <div className="p-4">
                {error && <ErrorDisplay error={error} />}
                {data && <Content data={data} />}
            </div>
        </LoadingOverlay>
    );
};
```

### Example 3: Error Handling with Toast

```typescript
import React from 'react';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { myFeatureApi } from '../api/myFeatureApi';

export const EntityEditor: React.FC<{ id: number }> = ({ id }) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data } = useSuspenseQuery({
        queryKey: ['entity', id],
        queryFn: () => myFeatureApi.getEntity(id),
        onError: () => {
            toast({
                title: 'Failed to load entity',
                variant: 'destructive',
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (updates) => myFeatureApi.update(id, updates),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['entity', id] });
            toast({
                title: 'Entity updated successfully',
            });
        },

        onError: () => {
            toast({
                title: 'Failed to update entity',
                variant: 'destructive',
            });
        },
    });

    return (
        <Button onClick={() => updateMutation.mutate({ name: 'New' })}>
            Update
        </Button>
    );
};
```

---

## Loading State Anti-Patterns

### What NOT to Do

```typescript
// ❌ NEVER - Early return
if (isLoading) {
    return <Spinner />;
}

// ❌ NEVER - Conditional rendering that changes layout
{isLoading ? <Spinner /> : <Content />}

// ❌ NEVER - Layout changes
if (isLoading) {
    return (
        <div className="h-24">
            <Spinner />
        </div>
    );
}
return (
    <div className="h-[500px]">  {/* Different height! */}
        <Content />
    </div>
);
```

### What TO Do

```typescript
// ✅ BEST - useSuspenseQuery + SuspenseLoader
<SuspenseLoader>
    <ComponentWithSuspenseQuery />
</SuspenseLoader>

// ✅ ACCEPTABLE - LoadingOverlay
<LoadingOverlay loading={isLoading}>
    <Content />
</LoadingOverlay>

// ✅ OK - Inline skeleton with same layout
<div className="h-[500px]">
    {isLoading ? <Skeleton className="h-full w-full" /> : <Content />}
</div>
```

---

## Skeleton Loading (Alternative)

### ShadCN Skeleton Component

```typescript
import { Skeleton } from '@/components/ui/skeleton';

export const MyComponent: React.FC = () => {
    const { data, isLoading } = useQuery({ ... });

    return (
        <div className="p-4">
            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{data.title}</h2>
                    <img src={data.image} className="w-full" />
                    <p>{data.description}</p>
                </div>
            )}
        </div>
    );
};
```

**Key**: Skeleton must have **same layout** as actual content (no shift)

---

## Summary

**Loading States:**
- ✅ **PREFERRED**: SuspenseLoader + useSuspenseQuery (modern pattern)
- ✅ **ACCEPTABLE**: LoadingOverlay (legacy pattern)
- ✅ **OK**: Skeleton with same layout
- ❌ **NEVER**: Early returns or conditional layout

**Error Handling:**
- ✅ **ALWAYS**: useToast for user feedback
- ❌ **NEVER**: react-toastify
- ✅ Use onError callbacks in queries/mutations
- ✅ Error boundaries for component-level errors

**See Also:**
- [component-patterns.md](component-patterns.md) - Suspense integration
- [data-fetching.md](data-fetching.md) - useSuspenseQuery details

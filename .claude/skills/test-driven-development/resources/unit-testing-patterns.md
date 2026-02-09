# Unit Testing Patterns

Detailed patterns for unit and integration testing with Vitest and Jest.

## Table of Contents

1. [Vitest Setup](#vitest-setup)
2. [Jest Compatibility](#jest-compatibility)
3. [Mocking Strategies](#mocking-strategies)
4. [Testing Async Code](#testing-async-code)
5. [Component Testing](#component-testing)
6. [Test Organization](#test-organization)

---

## Vitest Setup

### Installation

```bash
npm install -D vitest
```

### Configuration (vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Test environment
    environment: 'node', // or 'jsdom' for browser-like

    // Global setup
    globals: true, // Use describe, it, expect without imports

    // Test file patterns
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**'],

    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/*.d.ts', '**/*.test.ts'],
    },

    // Timeouts
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Setup File (vitest.setup.ts)

```typescript
import { beforeAll, afterAll, afterEach } from 'vitest';

// Global setup
beforeAll(() => {
  // Initialize test database, mock servers, etc.
});

// Global teardown
afterAll(() => {
  // Clean up resources
});

// Reset between tests
afterEach(() => {
  // Clear mocks, reset state
  vi.clearAllMocks();
});
```

---

## Jest Compatibility

Vitest is largely compatible with Jest. Key differences:

### Import Changes

```typescript
// Jest
import { jest } from '@jest/globals';

// Vitest
import { vi } from 'vitest';
```

### Mock Functions

```typescript
// Jest
const mockFn = jest.fn();
jest.spyOn(object, 'method');

// Vitest
const mockFn = vi.fn();
vi.spyOn(object, 'method');
```

### Timers

```typescript
// Jest
jest.useFakeTimers();
jest.advanceTimersByTime(1000);

// Vitest
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
```

### Module Mocks

```typescript
// Jest
jest.mock('./module');

// Vitest
vi.mock('./module');
```

---

## Mocking Strategies

### Mock Functions

```typescript
import { vi, describe, it, expect } from 'vitest';

describe('Mock Functions', () => {
  it('should track calls', () => {
    const mockFn = vi.fn();

    mockFn('arg1', 'arg2');

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should return values', () => {
    const mockFn = vi.fn()
      .mockReturnValue('default')
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second');

    expect(mockFn()).toBe('first');
    expect(mockFn()).toBe('second');
    expect(mockFn()).toBe('default');
  });

  it('should mock implementation', () => {
    const mockFn = vi.fn((x: number) => x * 2);

    expect(mockFn(5)).toBe(10);
  });
});
```

### Mock Modules

```typescript
import { vi, describe, it, expect } from 'vitest';

// Mock entire module
vi.mock('./userService', () => ({
  getUserById: vi.fn().mockResolvedValue({ id: 1, name: 'Test' }),
  createUser: vi.fn().mockResolvedValue({ id: 2, name: 'New' }),
}));

// Import after mocking
import { getUserById, createUser } from './userService';

describe('Module Mocks', () => {
  it('should use mocked function', async () => {
    const user = await getUserById(1);
    expect(user.name).toBe('Test');
  });
});
```

### Spy on Object Methods

```typescript
import { vi, describe, it, expect } from 'vitest';

const calculator = {
  add: (a: number, b: number) => a + b,
  multiply: (a: number, b: number) => a * b,
};

describe('Spies', () => {
  it('should spy on method', () => {
    const spy = vi.spyOn(calculator, 'add');

    calculator.add(2, 3);

    expect(spy).toHaveBeenCalledWith(2, 3);
    spy.mockRestore(); // Restore original
  });

  it('should mock method implementation', () => {
    const spy = vi.spyOn(calculator, 'multiply')
      .mockImplementation(() => 100);

    expect(calculator.multiply(2, 3)).toBe(100);
    spy.mockRestore();
  });
});
```

### Mock API Calls (fetch/axios)

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

describe('API Mocking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should mock fetch response', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'test' }),
    });

    const response = await fetch('/api/data');
    const data = await response.json();

    expect(data).toEqual({ data: 'test' });
    expect(fetch).toHaveBeenCalledWith('/api/data');
  });

  it('should mock fetch error', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetch('/api/data')).rejects.toThrow('Network error');
  });
});
```

### Mock Environment Variables

```typescript
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Environment Variables', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should use mocked env var', () => {
    process.env.API_URL = 'http://test-api.com';

    // Import module that uses process.env.API_URL
    // const { apiUrl } = require('./config');
    // expect(apiUrl).toBe('http://test-api.com');
  });
});
```

---

## Testing Async Code

### Promises

```typescript
import { describe, it, expect } from 'vitest';

async function fetchData(): Promise<string> {
  return 'data';
}

describe('Async Tests', () => {
  // Using async/await
  it('should resolve with data', async () => {
    const result = await fetchData();
    expect(result).toBe('data');
  });

  // Using resolves matcher
  it('should resolve with data (matcher)', async () => {
    await expect(fetchData()).resolves.toBe('data');
  });

  // Testing rejections
  it('should reject with error', async () => {
    const failingFn = async () => {
      throw new Error('Failed');
    };

    await expect(failingFn()).rejects.toThrow('Failed');
  });
});
```

### Timers

```typescript
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

function delayedGreeting(callback: () => void) {
  setTimeout(callback, 1000);
}

describe('Timer Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call callback after delay', () => {
    const callback = vi.fn();

    delayedGreeting(callback);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
  });

  it('should handle multiple timers', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    setTimeout(callback1, 500);
    setTimeout(callback2, 1500);

    vi.advanceTimersByTime(500);
    expect(callback1).toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback2).toHaveBeenCalled();
  });
});
```

---

## Component Testing

### React Components with Testing Library

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should show loading state', () => {
    render(<Button loading>Click me</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

### Testing Hooks

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter Hook', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });
});
```

---

## Test Organization

### Grouping Related Tests

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {});
    it('should throw error with invalid email', () => {});
    it('should hash password before saving', () => {});
  });

  describe('getUserById', () => {
    it('should return user when found', () => {});
    it('should return null when not found', () => {});
  });

  describe('updateUser', () => {
    it('should update user fields', () => {});
    it('should not update readonly fields', () => {});
  });
});
```

### Test Fixtures

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

// fixtures/users.ts
export const testUsers = {
  admin: { id: 1, name: 'Admin', role: 'admin' },
  user: { id: 2, name: 'User', role: 'user' },
  guest: { id: 3, name: 'Guest', role: 'guest' },
};

// userService.test.ts
import { testUsers } from './fixtures/users';

describe('UserService', () => {
  let currentUser: typeof testUsers.admin;

  beforeEach(() => {
    currentUser = { ...testUsers.admin };
  });

  it('should use fixture data', () => {
    expect(currentUser.role).toBe('admin');
  });
});
```

### Parameterized Tests

```typescript
import { describe, it, expect } from 'vitest';

describe('Calculator', () => {
  it.each([
    [1, 2, 3],
    [5, 5, 10],
    [-1, 1, 0],
    [0, 0, 0],
  ])('add(%i, %i) should return %i', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });

  it.each([
    { input: 'hello', expected: 'HELLO' },
    { input: 'World', expected: 'WORLD' },
    { input: '', expected: '' },
  ])('toUpperCase("$input") should return "$expected"', ({ input, expected }) => {
    expect(input.toUpperCase()).toBe(expected);
  });
});
```

---

## Best Practices Summary

1. **One assertion per test** (when practical)
2. **Use descriptive test names** - `it('should...')`
3. **Follow AAA pattern** - Arrange, Act, Assert
4. **Mock external dependencies** - APIs, databases, file system
5. **Clean up after tests** - Reset mocks, restore spies
6. **Use fixtures for test data** - Consistent, reusable data
7. **Test behavior, not implementation** - Public API, not private methods
8. **Keep tests fast** - Mock slow operations
9. **Isolate tests** - No shared state between tests
10. **Run tests in CI** - Catch regressions early

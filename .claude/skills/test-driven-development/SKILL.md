---
name: test-driven-development
description: TDD workflow guidance - write tests BEFORE implementation. Check package.json for test runner, default to vitest (unit) and playwright (e2e). Keywords: TDD, test driven, test-driven, unit test, e2e test, integration test, vitest, playwright, jest, spec, test first, write tests, add tests, regression test, test coverage.
---

# Test Driven Development (TDD) Skill

## Purpose

Guide agents to follow the Test Driven Development workflow: write tests BEFORE implementing functionality. This ensures:
- Code is designed for testability from the start
- Requirements are clearly defined before coding
- Regression tests exist for all new functionality
- Higher confidence in code correctness

## When to Use This Skill

This skill activates when:
- Implementing new features, functions, or components
- Adding new API endpoints or routes
- Fixing bugs (write regression test first)
- Refactoring code (ensure test coverage first)
- Adding or modifying tests
- Working with test files (*.test.ts, *.spec.ts)

---

## The TDD Cycle (Red-Green-Refactor)

### 1. RED - Write a Failing Test

**Goal:** Define expected behavior in a test BEFORE writing implementation.

```typescript
// Example: Testing a function that doesn't exist yet
describe('calculateTotal', () => {
  it('should sum all item prices', () => {
    const items = [{ price: 10 }, { price: 20 }, { price: 30 }];

    const result = calculateTotal(items);

    expect(result).toBe(60);
  });
});
```

**Key Points:**
- Run the test - it MUST fail (proves the test works)
- If test passes without implementation, the test is invalid
- Focus on ONE behavior per test
- Use descriptive test names that explain the expected behavior

### 2. GREEN - Write Minimal Code

**Goal:** Write the simplest code to make the test pass.

```typescript
// Minimal implementation to pass the test
function calculateTotal(items: { price: number }[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Key Points:**
- Don't over-engineer - just make the test pass
- Resist adding features not covered by tests
- Focus on THIS ONE test passing

### 3. REFACTOR - Improve While Green

**Goal:** Clean up code while keeping tests passing.

**Key Points:**
- Remove duplication
- Improve naming and readability
- Extract functions/classes if needed
- Run tests after EVERY change - they must stay green
- Don't add new functionality during refactoring

---

## Test Runner Detection

**ALWAYS check package.json FIRST before writing tests.**

### Step 1: Check for Test Script

Look for the "test" script in `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

### Step 2: Check Dependencies

If no test script, check `dependencies` and `devDependencies`:

| Package | Framework | Use For |
|---------|-----------|---------|
| `vitest` / `@vitest/*` | Vitest | Unit/Integration tests |
| `jest` / `@jest/*` | Jest | Unit/Integration tests |
| `@playwright/test` | Playwright | E2E tests |
| `cypress` | Cypress | E2E tests |
| `mocha` | Mocha | Unit tests |
| `ava` | AVA | Unit tests |

### Step 3: Default Recommendations

If NO test runner is configured, suggest:

| Test Type | Recommended Framework | Install Command |
|-----------|----------------------|-----------------|
| Unit/Integration | Vitest | `npm install -D vitest` |
| E2E | Playwright | `npm install -D @playwright/test` |

**Why Vitest?**
- Native ESM support
- Fast execution with Vite's transforms
- Jest-compatible API (easy migration)
- Built-in TypeScript support
- Watch mode with instant feedback

**Why Playwright?**
- Cross-browser testing (Chromium, Firefox, WebKit)
- Auto-wait for elements
- Built-in assertions
- Excellent debugging tools
- Native TypeScript support

---

## Default Test Commands

| Test Type | Framework | Run All | Run Watch | Run Single File |
|-----------|-----------|---------|-----------|-----------------|
| Unit | Vitest | `npx vitest run` | `npx vitest` | `npx vitest run path/to/file.test.ts` |
| Unit | Jest | `npx jest` | `npx jest --watch` | `npx jest path/to/file.test.ts` |
| E2E | Playwright | `npx playwright test` | N/A | `npx playwright test path/to/file.spec.ts` |
| E2E | Cypress | `npx cypress run` | `npx cypress open` | `npx cypress run --spec path/to/file.cy.ts` |

---

## TDD Workflow Checklist

Before implementing ANY feature, follow this checklist:

### Planning Phase
- [ ] Read and understand the requirements
- [ ] Identify the key behaviors to test
- [ ] Determine test type needed (unit, integration, e2e)

### Setup Phase
- [ ] Check `package.json` for test runner configuration
- [ ] Verify test command works: `npm test` or equivalent
- [ ] Create test file with proper naming (see conventions below)

### Red Phase
- [ ] Write test case(s) describing expected behavior
- [ ] Use descriptive test names (`it('should...')`)
- [ ] Run tests - verify they FAIL (red)
- [ ] If tests pass without implementation, fix the test

### Green Phase
- [ ] Write minimal code to make tests pass
- [ ] Run tests - verify they PASS (green)
- [ ] Don't add untested features

### Refactor Phase
- [ ] Improve code quality (naming, structure, duplication)
- [ ] Run tests after each change - keep GREEN
- [ ] Extract reusable code if needed

### Commit Phase
- [ ] Commit tests WITH implementation (same commit)
- [ ] Use descriptive commit message mentioning tests

---

## Test File Naming Conventions

### Unit/Integration Tests

| Implementation File | Test File (Option 1) | Test File (Option 2) |
|--------------------|---------------------|---------------------|
| `utils.ts` | `utils.test.ts` | `utils.spec.ts` |
| `UserService.ts` | `UserService.test.ts` | `UserService.spec.ts` |
| `Button.tsx` | `Button.test.tsx` | `Button.spec.tsx` |
| `api/users.ts` | `api/users.test.ts` | `api/users.spec.ts` |

### E2E Tests

| Feature | Test File Location |
|---------|-------------------|
| Login flow | `e2e/auth/login.spec.ts` |
| User dashboard | `e2e/dashboard/user-dashboard.spec.ts` |
| Checkout process | `e2e/checkout/checkout-flow.spec.ts` |

### Test Location Strategies

**Co-located (Recommended for Unit Tests):**
```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx
  services/
    UserService.ts
    UserService.test.ts
```

**Separate Directory (Recommended for E2E):**
```
src/
  components/
  services/
tests/
  unit/
  integration/
e2e/
  auth/
  dashboard/
```

---

## Quick Reference: Test Structure

### Basic Test Structure

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('FeatureName', () => {
  // Setup runs before each test
  beforeEach(() => {
    // Initialize test state
  });

  // Cleanup runs after each test
  afterEach(() => {
    // Clean up test state
  });

  describe('methodName', () => {
    it('should do expected behavior when given input', () => {
      // Arrange - set up test data
      const input = 'test';

      // Act - call the code under test
      const result = methodName(input);

      // Assert - verify the result
      expect(result).toBe('expected');
    });

    it('should handle edge case', () => {
      // Test edge cases, errors, boundaries
    });
  });
});
```

### Common Assertions

```typescript
// Equality
expect(value).toBe(expected);           // Strict equality (===)
expect(value).toEqual(expected);        // Deep equality for objects/arrays
expect(value).not.toBe(unexpected);     // Negation

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(10);
expect(value).toBeCloseTo(0.3, 5);      // Floating point

// Strings
expect(value).toMatch(/pattern/);
expect(value).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty('key');
expect(object).toMatchObject({ key: 'value' });

// Errors
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('error message');
expect(() => fn()).toThrow(ErrorType);

// Async
await expect(asyncFn()).resolves.toBe(expected);
await expect(asyncFn()).rejects.toThrow();
```

---

## Resource Files

For detailed patterns and examples, see:

### [Unit Testing Patterns](resources/unit-testing-patterns.md)
- Vitest configuration and setup
- Jest compatibility notes
- Mocking strategies (functions, modules, APIs)
- Testing async code
- Component testing patterns

### [E2E Testing Patterns](resources/e2e-testing-patterns.md)
- Playwright setup and configuration
- Page Object Model pattern
- Test isolation strategies
- Handling authentication in tests
- Visual regression testing

### [Test Structure Guide](resources/test-structure-guide.md)
- Describe/it block organization
- Test naming conventions
- Assertion best practices
- Test data management
- When to use unit vs integration vs e2e

---

## Common TDD Mistakes to Avoid

### 1. Writing Tests After Implementation
**Wrong:** Implement feature, then write tests
**Right:** Write failing test first, then implement

### 2. Testing Implementation Details
**Wrong:** Test internal private methods
**Right:** Test public API and behavior

### 3. Too Many Tests at Once
**Wrong:** Write 10 tests before any implementation
**Right:** One test at a time, red-green-refactor

### 4. Skipping the Red Phase
**Wrong:** Write test and implementation together
**Right:** Verify test fails first

### 5. Over-Engineering in Green Phase
**Wrong:** Add extra features "while you're there"
**Right:** Only make current test pass

### 6. Not Refactoring
**Wrong:** Move on immediately after green
**Right:** Take time to clean up code

---

## TDD for Different Scenarios

### New Feature
1. Write test for simplest case
2. Implement minimal code
3. Add edge case tests one by one
4. Build up functionality incrementally

### Bug Fix
1. Write test that reproduces the bug (should fail)
2. Fix the bug
3. Verify test passes
4. This test prevents regression

### Refactoring
1. Ensure existing tests pass
2. Add tests for any uncovered code
3. Refactor with confidence
4. Tests catch any regressions

### Legacy Code
1. Add "characterization tests" that document current behavior
2. Refactor with test safety net
3. Gradually improve test quality

---

## Summary

**The TDD Mantra:** Red → Green → Refactor

1. **Check package.json** for existing test runner
2. **Write a failing test** that describes expected behavior
3. **Run the test** - it must fail (RED)
4. **Write minimal code** to make it pass
5. **Run the test** - it must pass (GREEN)
6. **Refactor** while keeping tests green
7. **Repeat** for next behavior

**Remember:** Tests and implementation are committed together. Tests are not an afterthought - they are the driving force of development.

---

**Skill Status**: ACTIVE
**Line Count**: ~400 (following 500-line rule)
**Progressive Disclosure**: Reference files for detailed patterns

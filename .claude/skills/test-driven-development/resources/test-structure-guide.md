# Test Structure Guide

Best practices for organizing, naming, and structuring tests.

## Table of Contents

1. [File Naming Conventions](#file-naming-conventions)
2. [Test Organization](#test-organization)
3. [Describe/It Block Patterns](#describeit-block-patterns)
4. [Assertion Best Practices](#assertion-best-practices)
5. [Test Data Management](#test-data-management)
6. [When to Use Each Test Type](#when-to-use-each-test-type)

---

## File Naming Conventions

### Unit Test Files

| Pattern | Example | When to Use |
|---------|---------|-------------|
| `*.test.ts` | `utils.test.ts` | Default convention |
| `*.spec.ts` | `utils.spec.ts` | Alternative convention |
| `*.test.tsx` | `Button.test.tsx` | React component tests |

### E2E Test Files

| Pattern | Example | When to Use |
|---------|---------|-------------|
| `*.spec.ts` | `login.spec.ts` | Playwright convention |
| `*.e2e.ts` | `login.e2e.ts` | Explicit E2E marker |

### Test File Location

**Co-located Tests (Recommended for Unit Tests)**

```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx      # Test next to component
      Button.styles.ts
    Card/
      Card.tsx
      Card.test.tsx
  services/
    UserService.ts
    UserService.test.ts    # Test next to service
  utils/
    format.ts
    format.test.ts         # Test next to utility
```

**Benefits:**
- Easy to find tests for a file
- Tests move with code when refactoring
- Clear ownership of tests

**Separate Test Directory (Recommended for E2E/Integration)**

```
src/
  components/
  services/
  utils/
tests/
  unit/                    # Mirror src structure
    services/
      UserService.test.ts
  integration/
    api/
      users.test.ts
e2e/
  auth/
    login.spec.ts
    register.spec.ts
  dashboard/
    overview.spec.ts
```

**Benefits:**
- Clear separation of test types
- E2E tests not mixed with source
- Easier to run test subsets

---

## Test Organization

### Single Responsibility

Each test file should focus on ONE unit (function, class, component).

```typescript
// Good: One file per unit
// UserService.test.ts - tests UserService
// OrderService.test.ts - tests OrderService

// Bad: Multiple units in one file
// services.test.ts - tests UserService AND OrderService
```

### Logical Grouping with Describe

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    describe('with valid input', () => {
      it('should create user and return id', () => {});
      it('should hash password', () => {});
      it('should send welcome email', () => {});
    });

    describe('with invalid input', () => {
      it('should throw error for missing email', () => {});
      it('should throw error for invalid email format', () => {});
      it('should throw error for short password', () => {});
    });
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

### Setup and Teardown

```typescript
describe('DatabaseService', () => {
  // Runs once before all tests in this describe block
  beforeAll(async () => {
    await connectToTestDatabase();
  });

  // Runs once after all tests in this describe block
  afterAll(async () => {
    await disconnectFromTestDatabase();
  });

  // Runs before each test
  beforeEach(async () => {
    await clearTestData();
    await seedTestData();
  });

  // Runs after each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should query data', async () => {
    // Uses seeded test data
  });
});
```

---

## Describe/It Block Patterns

### Naming Conventions

**Describe blocks** - noun (what is being tested)

```typescript
describe('Calculator', () => {});
describe('UserService', () => {});
describe('LoginForm', () => {});
```

**It blocks** - verb phrase starting with "should"

```typescript
it('should return the sum of two numbers', () => {});
it('should throw error when dividing by zero', () => {});
it('should render loading state initially', () => {});
```

### Behavior-Driven Style

```typescript
describe('ShoppingCart', () => {
  describe('when empty', () => {
    it('should have zero items', () => {});
    it('should have zero total', () => {});
    it('should display empty message', () => {});
  });

  describe('when adding item', () => {
    it('should increase item count', () => {});
    it('should update total price', () => {});
    it('should show item in list', () => {});
  });

  describe('when removing item', () => {
    it('should decrease item count', () => {});
    it('should update total price', () => {});
    it('should remove item from list', () => {});
  });
});
```

### Given-When-Then Pattern

```typescript
describe('TransferService', () => {
  describe('transfer', () => {
    describe('given sufficient balance', () => {
      describe('when transferring valid amount', () => {
        it('then should debit source account', () => {});
        it('then should credit destination account', () => {});
        it('then should return success', () => {});
      });
    });

    describe('given insufficient balance', () => {
      describe('when transferring amount exceeding balance', () => {
        it('then should not modify accounts', () => {});
        it('then should throw InsufficientFundsError', () => {});
      });
    });
  });
});
```

---

## Assertion Best Practices

### One Concept Per Test

```typescript
// Good: One assertion (or closely related assertions)
it('should return user with correct properties', () => {
  const user = createUser({ name: 'John', email: 'john@test.com' });

  expect(user).toMatchObject({
    name: 'John',
    email: 'john@test.com',
  });
});

// Bad: Testing multiple unrelated things
it('should create user and validate and send email', () => {
  const user = createUser({ name: 'John' });
  expect(user.id).toBeDefined();           // Creation
  expect(validateUser(user)).toBe(true);   // Validation
  expect(emailService.send).toHaveBeenCalled(); // Side effect
});
```

### Use Specific Assertions

```typescript
// Good: Specific assertions
expect(value).toBe(5);
expect(array).toHaveLength(3);
expect(object).toHaveProperty('name', 'John');
expect(fn).toThrow(ValidationError);

// Bad: Generic assertions
expect(value === 5).toBe(true);
expect(array.length === 3).toBeTruthy();
expect(object.name === 'John').toBe(true);
```

### Assert on Behavior, Not Implementation

```typescript
// Good: Testing behavior
it('should sort items by price', () => {
  const items = [{ price: 30 }, { price: 10 }, { price: 20 }];

  const sorted = sortByPrice(items);

  expect(sorted[0].price).toBe(10);
  expect(sorted[1].price).toBe(20);
  expect(sorted[2].price).toBe(30);
});

// Bad: Testing implementation details
it('should use Array.sort with compare function', () => {
  const spy = vi.spyOn(Array.prototype, 'sort');

  sortByPrice([{ price: 1 }]);

  expect(spy).toHaveBeenCalledWith(expect.any(Function));
});
```

### Arrange-Act-Assert Pattern

```typescript
it('should calculate total with discount', () => {
  // Arrange - set up test data
  const cart = new ShoppingCart();
  cart.addItem({ price: 100, quantity: 2 });
  const discount = new PercentageDiscount(10);

  // Act - perform the action
  const total = cart.calculateTotal(discount);

  // Assert - verify the result
  expect(total).toBe(180); // 200 - 10%
});
```

---

## Test Data Management

### Factory Functions

```typescript
// factories/user.ts
export function createTestUser(overrides: Partial<User> = {}): User {
  return {
    id: Math.random().toString(36),
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    createdAt: new Date(),
    ...overrides,
  };
}

// Usage in tests
it('should process admin user differently', () => {
  const adminUser = createTestUser({ role: 'admin' });
  const regularUser = createTestUser({ role: 'user' });

  expect(getPermissions(adminUser)).toContain('admin.panel');
  expect(getPermissions(regularUser)).not.toContain('admin.panel');
});
```

### Test Fixtures

```typescript
// fixtures/products.ts
export const fixtures = {
  products: {
    laptop: {
      id: 'prod-1',
      name: 'Laptop',
      price: 999,
      category: 'electronics',
    },
    book: {
      id: 'prod-2',
      name: 'TypeScript Handbook',
      price: 49,
      category: 'books',
    },
  },
  users: {
    admin: { id: 'user-1', role: 'admin' },
    customer: { id: 'user-2', role: 'customer' },
  },
};

// Usage
import { fixtures } from './fixtures/products';

it('should apply electronics discount', () => {
  const discounted = applyDiscount(fixtures.products.laptop, 0.1);
  expect(discounted.price).toBe(899.1);
});
```

### Builders for Complex Objects

```typescript
// builders/OrderBuilder.ts
export class OrderBuilder {
  private order: Partial<Order> = {
    items: [],
    status: 'pending',
  };

  withItem(item: OrderItem): this {
    this.order.items!.push(item);
    return this;
  }

  withStatus(status: OrderStatus): this {
    this.order.status = status;
    return this;
  }

  withCustomer(customer: Customer): this {
    this.order.customer = customer;
    return this;
  }

  build(): Order {
    return this.order as Order;
  }
}

// Usage
it('should calculate shipping for large orders', () => {
  const order = new OrderBuilder()
    .withItem({ product: 'laptop', quantity: 2, price: 999 })
    .withItem({ product: 'mouse', quantity: 5, price: 29 })
    .withStatus('confirmed')
    .build();

  expect(calculateShipping(order)).toBe(0); // Free shipping
});
```

---

## When to Use Each Test Type

### Unit Tests

**Test individual functions, classes, or components in isolation.**

**Use When:**
- Testing pure functions
- Testing class methods
- Testing React hooks
- Testing utility functions
- Testing business logic

**Characteristics:**
- Fast execution (< 10ms per test)
- No external dependencies (mocked)
- High coverage of edge cases
- Run frequently during development

```typescript
// Unit test example
describe('calculateTax', () => {
  it('should calculate 10% tax', () => {
    expect(calculateTax(100, 0.1)).toBe(10);
  });

  it('should handle zero amount', () => {
    expect(calculateTax(0, 0.1)).toBe(0);
  });

  it('should round to 2 decimal places', () => {
    expect(calculateTax(33.33, 0.1)).toBe(3.33);
  });
});
```

### Integration Tests

**Test how multiple units work together.**

**Use When:**
- Testing API endpoints
- Testing database operations
- Testing service interactions
- Testing component with children
- Testing Redux/state management

**Characteristics:**
- Medium execution time (10ms - 1s)
- May use real dependencies (database, APIs)
- Test realistic scenarios
- Run before merging

```typescript
// Integration test example
describe('UserAPI', () => {
  beforeEach(async () => {
    await db.seed();
  });

  it('should create user and return with id', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@test.com' });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();

    // Verify in database
    const user = await db.users.findById(response.body.id);
    expect(user.name).toBe('John');
  });
});
```

### E2E Tests

**Test complete user workflows through the UI.**

**Use When:**
- Testing critical user journeys
- Testing authentication flows
- Testing multi-page workflows
- Testing cross-browser compatibility
- Smoke testing deployments

**Characteristics:**
- Slow execution (1s - 30s per test)
- Use real browser
- Test user perspective
- Run in CI/CD pipeline

```typescript
// E2E test example
test('user can complete checkout', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name=email]', 'user@test.com');
  await page.fill('[name=password]', 'password');
  await page.click('button[type=submit]');

  // Add to cart
  await page.goto('/products/1');
  await page.click('text=Add to Cart');

  // Checkout
  await page.click('text=Checkout');
  await page.fill('[name=address]', '123 Test St');
  await page.click('text=Place Order');

  // Verify
  await expect(page.locator('.order-confirmation')).toBeVisible();
});
```

### Test Pyramid

```
        /\
       /E2E\        <- Few (5-10%)
      /-----\
     /Integr-\     <- Some (20-30%)
    /ation----\
   /-----------\
  /   Unit      \  <- Many (60-70%)
 /---------------\
```

**Guidelines:**
- Write many unit tests (fast, cheap, specific)
- Write some integration tests (medium cost, realistic)
- Write few E2E tests (slow, expensive, broad coverage)

---

## Summary

1. **Name files consistently** - `*.test.ts` or `*.spec.ts`
2. **Co-locate unit tests** - Next to source files
3. **Separate E2E tests** - In dedicated `e2e/` directory
4. **Use descriptive names** - `it('should...')`
5. **Follow AAA pattern** - Arrange, Act, Assert
6. **One concept per test** - Keep tests focused
7. **Use factories/fixtures** - For test data
8. **Test behavior** - Not implementation
9. **Follow test pyramid** - Many unit, some integration, few E2E
10. **Keep tests maintainable** - Refactor tests too

# E2E Testing Patterns

Detailed patterns for end-to-end testing with Playwright.

## Table of Contents

1. [Playwright Setup](#playwright-setup)
2. [Basic Test Structure](#basic-test-structure)
3. [Page Object Model](#page-object-model)
4. [Test Isolation](#test-isolation)
5. [Authentication Handling](#authentication-handling)
6. [Advanced Patterns](#advanced-patterns)

---

## Playwright Setup

### Installation

```bash
npm install -D @playwright/test
npx playwright install
```

### Configuration (playwright.config.ts)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Test file patterns
  testMatch: '**/*.spec.ts',

  // Parallel execution
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,

  // Retries
  retries: process.env.CI ? 2 : 0,

  // Reporter
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Global settings
  use: {
    // Base URL for navigation
    baseURL: 'http://localhost:3000',

    // Collect trace on failure
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video recording
    video: 'retain-on-failure',
  },

  // Browser configurations
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Web server configuration
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

---

## Basic Test Structure

### Simple Test

```typescript
import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/My App/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');

  await page.click('text=About');

  await expect(page).toHaveURL('/about');
  await expect(page.locator('h1')).toHaveText('About Us');
});
```

### Grouped Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message')).toHaveText('Invalid credentials');
    await expect(page).toHaveURL('/login');
  });
});
```

### Locator Strategies

```typescript
import { test, expect } from '@playwright/test';

test('locator strategies', async ({ page }) => {
  await page.goto('/');

  // By role (recommended)
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Welcome' });
  await page.getByRole('link', { name: 'Home' });

  // By text
  await page.getByText('Click me');
  await page.getByText(/welcome/i); // regex, case-insensitive

  // By label (for form elements)
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('secret');

  // By placeholder
  await page.getByPlaceholder('Search...').fill('query');

  // By test ID (data-testid attribute)
  await page.getByTestId('submit-button').click();

  // CSS selector (fallback)
  await page.locator('.my-class').click();
  await page.locator('#my-id').click();
  await page.locator('button.primary').click();

  // Chaining locators
  await page.locator('.card').filter({ hasText: 'Item 1' }).click();
});
```

---

## Page Object Model

### Page Object Class

```typescript
// e2e/pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }
}
```

### Using Page Objects in Tests

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully', async ({ page }) => {
    await loginPage.login('user@example.com', 'password123');

    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login('invalid@example.com', 'wrong');

    await loginPage.expectError('Invalid credentials');
  });
});
```

### Component Page Object

```typescript
// e2e/components/NavigationComponent.ts
import { Page, Locator } from '@playwright/test';

export class NavigationComponent {
  readonly page: Page;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByRole('navigation');
  }

  async clickLink(name: string) {
    await this.container.getByRole('link', { name }).click();
  }

  async search(query: string) {
    await this.container.getByPlaceholder('Search').fill(query);
    await this.container.getByRole('button', { name: 'Search' }).click();
  }
}
```

---

## Test Isolation

### Database Reset

```typescript
// e2e/fixtures.ts
import { test as base } from '@playwright/test';

// Create test with database reset
export const test = base.extend({
  // Reset database before each test
  page: async ({ page }, use) => {
    // Reset database via API
    await page.request.post('/api/test/reset-db');

    await use(page);

    // Optional: cleanup after test
  },
});

export { expect } from '@playwright/test';
```

### API-based Data Setup

```typescript
import { test, expect } from '@playwright/test';

test.describe('User Dashboard', () => {
  test.beforeEach(async ({ page, request }) => {
    // Create test user via API
    await request.post('/api/test/users', {
      data: {
        email: 'test@example.com',
        password: 'password123',
      },
    });
  });

  test.afterEach(async ({ request }) => {
    // Cleanup test data
    await request.delete('/api/test/users/test@example.com');
  });

  test('should show user data', async ({ page }) => {
    // Login and test
  });
});
```

### Storage State for Faster Tests

```typescript
// e2e/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL('/dashboard');

  // Save authentication state
  await page.context().storageState({ path: authFile });
});
```

```typescript
// playwright.config.ts - add setup project
export default defineConfig({
  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    // Tests that require auth
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

---

## Authentication Handling

### Login Helper

```typescript
// e2e/helpers/auth.ts
import { Page } from '@playwright/test';

export async function loginAsUser(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('/dashboard');
}

export async function loginAsAdmin(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Password').fill('adminpass');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('/admin');
}
```

### Test Fixture with Authentication

```typescript
// e2e/fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

type Fixtures = {
  loginPage: LoginPage;
  authenticatedPage: void;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    // Login before test
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('/dashboard');

    await use();
  },
});

export { expect } from '@playwright/test';
```

---

## Advanced Patterns

### Network Interception

```typescript
import { test, expect } from '@playwright/test';

test('should handle API response', async ({ page }) => {
  // Mock API response
  await page.route('/api/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ]),
    });
  });

  await page.goto('/users');

  await expect(page.getByText('John')).toBeVisible();
  await expect(page.getByText('Jane')).toBeVisible();
});

test('should handle API error', async ({ page }) => {
  await page.route('/api/users', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Server error' }),
    });
  });

  await page.goto('/users');

  await expect(page.getByText('Failed to load users')).toBeVisible();
});
```

### Waiting Strategies

```typescript
import { test, expect } from '@playwright/test';

test('waiting strategies', async ({ page }) => {
  await page.goto('/');

  // Wait for element (auto-waiting is usually sufficient)
  await page.getByRole('button').click(); // Auto-waits

  // Explicit wait for visibility
  await page.getByTestId('result').waitFor({ state: 'visible' });

  // Wait for network idle
  await page.waitForLoadState('networkidle');

  // Wait for specific request
  const responsePromise = page.waitForResponse('/api/data');
  await page.getByRole('button', { name: 'Load' }).click();
  const response = await responsePromise;

  // Wait for navigation
  await Promise.all([
    page.waitForURL('/new-page'),
    page.getByRole('link', { name: 'Go' }).click(),
  ]);

  // Custom wait condition
  await page.waitForFunction(() => {
    return document.querySelector('.loading') === null;
  });
});
```

### Visual Regression Testing

```typescript
import { test, expect } from '@playwright/test';

test('visual comparison', async ({ page }) => {
  await page.goto('/');

  // Full page screenshot comparison
  await expect(page).toHaveScreenshot('homepage.png');

  // Element screenshot comparison
  const header = page.getByRole('banner');
  await expect(header).toHaveScreenshot('header.png');

  // With options
  await expect(page).toHaveScreenshot('homepage-full.png', {
    fullPage: true,
    maxDiffPixels: 100,
  });
});
```

### Testing File Uploads

```typescript
import { test, expect } from '@playwright/test';

test('should upload file', async ({ page }) => {
  await page.goto('/upload');

  // Upload single file
  await page.getByLabel('Upload file').setInputFiles('test-files/document.pdf');

  // Upload multiple files
  await page.getByLabel('Upload files').setInputFiles([
    'test-files/image1.png',
    'test-files/image2.png',
  ]);

  // Clear file input
  await page.getByLabel('Upload file').setInputFiles([]);

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Upload successful')).toBeVisible();
});
```

### Testing Downloads

```typescript
import { test, expect } from '@playwright/test';

test('should download file', async ({ page }) => {
  await page.goto('/downloads');

  // Wait for download
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download Report' }).click();
  const download = await downloadPromise;

  // Verify download
  expect(download.suggestedFilename()).toBe('report.pdf');

  // Save to disk
  await download.saveAs('test-downloads/report.pdf');
});
```

---

## Best Practices Summary

1. **Use Page Object Model** - Encapsulate page interactions
2. **Use role-based locators** - More resilient to UI changes
3. **Isolate tests** - Each test should be independent
4. **Use fixtures for setup** - Consistent test data
5. **Save auth state** - Faster authenticated tests
6. **Mock external APIs** - Reliable, fast tests
7. **Run in CI** - Catch regressions early
8. **Use visual snapshots** - Catch UI regressions
9. **Test cross-browser** - Ensure compatibility
10. **Keep tests focused** - One scenario per test

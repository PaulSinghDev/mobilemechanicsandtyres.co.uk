# ShadCN Components Guide

## Overview

This project uses ShadCN UI components for the UI layer. Claude has access to a ShadCN MCP server that enables component discovery, viewing examples, and generating installation commands.

## MCP Tools Available

### 1. `mcp__shadcn__search_items_in_registries`
**Purpose:** Find components by name or description using fuzzy matching.

```json
{
  "registries": ["@shadcn"],
  "query": "button"
}
```

### 2. `mcp__shadcn__view_items_in_registries`
**Purpose:** Get detailed component information including source code.

```json
{
  "items": ["@shadcn/button", "@shadcn/card"]
}
```

### 3. `mcp__shadcn__get_item_examples_from_registries`
**Purpose:** Find usage examples and demos with complete implementation code.

```json
{
  "registries": ["@shadcn"],
  "query": "button-demo"
}
```

**Common query patterns:**
- `{component}-demo` (e.g., "accordion-demo", "button-demo")
- `{component} example` (e.g., "card example")
- `example-{feature}` (e.g., "example-booking-form")

### 4. `mcp__shadcn__get_add_command_for_items`
**Purpose:** Get the CLI command to install components.

```json
{
  "items": ["@shadcn/button", "@shadcn/card"]
}
```

### 5. `mcp__shadcn__list_items_in_registries`
**Purpose:** List all available items in registries with pagination.

```json
{
  "registries": ["@shadcn"],
  "limit": 20,
  "offset": 0
}
```

### 6. `mcp__shadcn__get_audit_checklist`
**Purpose:** Get a verification checklist after creating components.

---

## Workflow: Adding a New Component

### Step 1: Search for the Component
```
Use: mcp__shadcn__search_items_in_registries
Query: "date picker" or "calendar"
```

### Step 2: View Component Details
```
Use: mcp__shadcn__view_items_in_registries
Items: ["@shadcn/calendar", "@shadcn/date-picker"]
```

### Step 3: Get Usage Examples
```
Use: mcp__shadcn__get_item_examples_from_registries
Query: "calendar-demo" or "date-picker example"
```

### Step 4: Get Installation Command
```
Use: mcp__shadcn__get_add_command_for_items
Items: ["@shadcn/calendar"]
```

### Step 5: Install and Verify
Run the generated `npx shadcn add` command, then use `get_audit_checklist` to verify.

---

## Import Patterns

ShadCN components are installed to `@/components/ui/`:

```tsx
// Single component import
import { Button } from '@/components/ui/button';

// Multiple components from same file
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

// Dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
```

---

## Combining ShadCN with Tailwind

ShadCN components are built on top of Tailwind CSS. Here's how they work together:

### ShadCN + Tailwind Workflow
- **ShadCN**: Pre-built accessible components (Button, Card, Dialog, etc.)
- **Tailwind**: Utility classes for layout, spacing, and custom styling
- **cn() helper**: Merge Tailwind classes conditionally

### Layout Example

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table component here */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button variant="default">Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Icons
Use Lucide React icons (included with ShadCN):
```tsx
import { Search, Plus, Settings } from 'lucide-react';

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>
```

---

## Best Practices

### 1. Check Registry First
Before building a custom component, always search the ShadCN registry:
```
mcp__shadcn__search_items_in_registries with query describing your need
```

### 2. Review Examples
Always check examples before implementing to understand the intended usage pattern:
```
mcp__shadcn__get_item_examples_from_registries with "{component}-demo"
```

### 3. Use the Audit Checklist
After installing new components, run the audit checklist to catch common issues:
```
mcp__shadcn__get_audit_checklist
```

### 4. Customize Through CSS Variables
ShadCN components use CSS variables for theming. Customize in your globals.css:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

### 5. Extend, Don't Modify
Create wrapper components for project-specific variants rather than modifying the base components:

```tsx
// components/ui/primary-button.tsx
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn('bg-brand-primary hover:bg-brand-primary/90', className)}
      {...props}
    />
  );
}
```

---

## Registry Configuration

The project's `components.json` configures the ShadCN CLI:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## Common Components Reference

| Component | Use Case | MCP Query |
|-----------|----------|-----------|
| Button | Actions, form submits | `button` |
| Card | Content containers | `card` |
| Dialog | Modals, confirmations | `dialog` |
| Dropdown Menu | Context menus, actions | `dropdown-menu` |
| Command | Search/command palette | `command` |
| Combobox | Searchable select | `combobox` |
| Date Picker | Date selection | `date-picker` |
| Table | Simple data display | `table` |
| Tabs | Tabbed interfaces | `tabs` |
| Toast/Sonner | Notifications | `sonner` |
| Form | Form handling with RHF | `form` |
| Input | Text inputs | `input` |
| Select | Dropdown select | `select` |
| Checkbox | Boolean inputs | `checkbox` |
| Switch | Toggle inputs | `switch` |

---
name: typescript
description: TypeScript best practices and patterns
---

# TypeScript Skill

Expert knowledge for TypeScript development, including type safety, patterns, and best practices.

## Core Principles

### Type Safety First
- Avoid `any` - use `unknown` for truly unknown types
- Enable strict mode in `tsconfig.json`
- Use type guards for runtime checks
- Prefer interfaces for object shapes

### Inference vs Explicit
- Let TypeScript infer when obvious
- Be explicit at function boundaries
- Always type function parameters
- Type return values for public APIs

## Common Patterns

### Type Guards

```typescript
// Type guard function
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Using type guard
if (isString(input)) {
  // input is string here
  console.log(input.toUpperCase());
}
```

### Discriminated Unions

```typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    // TypeScript knows result.data exists
    return result.data;
  } else {
    // TypeScript knows result.error exists
    throw new Error(result.error);
  }
}
```

### Generic Constraints

```typescript
// Constrain generic to objects with id
function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find(item => item.id === id);
}
```

### Utility Types

```typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit specific properties
type UserWithoutPassword = Omit<User, 'password'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;
```

## Best Practices

### Avoid These

```typescript
// Bad: any
let data: any = fetchData();

// Bad: type assertion without check
const user = data as User;

// Bad: non-null assertion overuse
user!.name!.toUpperCase();
```

### Do These Instead

```typescript
// Good: unknown with type guard
let data: unknown = fetchData();

if (isUser(data)) {
  const user = data; // safely typed as User
}

// Good: optional chaining
user?.name?.toUpperCase();

// Good: nullish coalescing
const name = user?.name ?? 'Anonymous';
```

### Error Handling

```typescript
// Define custom error types
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Type-safe error handling
function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}
```

## Configuration

### Recommended tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## When to Use What

| Scenario | Use |
|----------|-----|
| Object shape | `interface` |
| Union types | `type` |
| Function types | `type` |
| Extending/implementing | `interface` |
| Mapped types | `type` |
| Declaration merging | `interface` |

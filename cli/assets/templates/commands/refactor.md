---
description: Safe code refactoring with impact analysis
---

# Refactor

Perform safe code refactoring with proper impact analysis and verification.

## Usage

```
/refactor [target] [goal]
```

**Arguments:**
- `$ARGUMENTS` - What to refactor and the refactoring goal (e.g., "UserService extract validation logic")

## Refactoring Process

### Phase 1: Analysis
1. Understand current implementation
2. Identify all usages and dependencies
3. Assess impact scope
4. Document current behavior

### Phase 2: Planning
1. Define refactoring steps
2. Identify potential risks
3. Plan verification approach
4. Determine rollback strategy

### Phase 3: Execution
1. Make incremental changes
2. Verify after each step
3. Update related code
4. Ensure tests pass

### Phase 4: Verification
1. Run existing tests
2. Verify no behavior changes
3. Check for regressions
4. Update documentation if needed

## Safety Checklist

Before refactoring:
- [ ] Tests exist for affected code
- [ ] All usages identified
- [ ] Impact scope understood
- [ ] Backup/checkpoint created

After refactoring:
- [ ] All tests pass
- [ ] No new warnings/errors
- [ ] Behavior unchanged
- [ ] Code cleaner/simpler

## Output Format

```markdown
## Refactoring: [Target]

### Goal
What we're trying to achieve.

### Impact Analysis
- Files affected: [list]
- Functions modified: [list]
- Potential risks: [list]

### Changes Made
1. [Change 1]: Description
2. [Change 2]: Description

### Verification
- Tests: [pass/fail]
- Lint: [pass/fail]
- Type check: [pass/fail]

### Before/After
[Code comparison if helpful]
```

## Example

**Input**: `/refactor src/services/user.ts extract email validation`

**Output**: Extracted email validation to shared utility, updated all usages, verified tests pass, documented changes.

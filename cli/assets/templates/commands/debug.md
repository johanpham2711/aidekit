---
description: Systematic debugging with root cause analysis
---

# Debug

Systematically debug an issue with root cause analysis.

## Usage

```
/debug [issue description]
```

**Arguments:**
- `$ARGUMENTS` - Description of the bug or error (e.g., "TypeError in login flow" or paste error message)

## Debugging Process

### Phase 1: Reproduce
1. Understand the expected behavior
2. Identify steps to reproduce
3. Isolate the problem scope
4. Gather error details

### Phase 2: Investigate
1. Examine error messages and stack traces
2. Add logging if needed
3. Check recent changes
4. Review related code

### Phase 3: Analyze
1. Form hypotheses
2. Test each hypothesis
3. Narrow down root cause
4. Understand why it happens

### Phase 4: Fix
1. Implement fix
2. Verify fix works
3. Check for side effects
4. Add test to prevent regression

## Output Format

```markdown
## Debug: [Issue]

### Problem Summary
What's happening vs what should happen.

### Reproduction Steps
1. Step 1
2. Step 2
3. Step 3

### Investigation

#### Error Details
- Message: [error message]
- Location: [file:line]
- Stack trace: [if relevant]

#### Root Cause
[Explanation of why this happens]

### Solution

#### Fix Applied
[Code changes made]

#### Verification
- [ ] Issue no longer reproduces
- [ ] Related functionality works
- [ ] Tests pass

### Prevention
- [ ] Added test for this case
- [ ] Updated documentation if needed
```

## Example

**Input**: `/debug "Cannot read property 'map' of undefined" in UserList`

**Output**: Root cause analysis showing data fetching race condition, fix with proper loading state, and test added.

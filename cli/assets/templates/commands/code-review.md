---
description: Multi-perspective code review with actionable feedback
---

# Code Review

Perform a comprehensive code review on the specified files or directories.

## Usage

```
/code-review [target]
```

**Arguments:**
- `$ARGUMENTS` - File path, directory, or scope to review (e.g., `src/`, `app.ts`, or "recent changes")

## Review Focus Areas

Analyze the code from these perspectives:

### 1. Architecture & Design
- Module organization and separation of concerns
- Design patterns usage and appropriateness
- Dependency management and coupling

### 2. Code Quality
- Readability and naming conventions
- DRY principles and code duplication
- Complexity and maintainability

### 3. Security
- Input validation and sanitization
- Authentication/authorization patterns
- Sensitive data handling

### 4. Performance
- Algorithm efficiency
- Resource management
- Potential bottlenecks

### 5. Testing
- Test coverage adequacy
- Test quality and meaningful assertions
- Edge cases handling

## Output Format

Provide findings in this structure:

```markdown
## Code Review: [Target]

### Summary
Brief overview of the review findings.

### Critical Issues
- [Issue 1]: Description and fix suggestion
- [Issue 2]: Description and fix suggestion

### Improvements
- [Suggestion 1]: Why and how to improve
- [Suggestion 2]: Why and how to improve

### Strengths
- [Strength 1]: What's done well
- [Strength 2]: What's done well

### Next Steps
1. Priority action items
2. Follow-up tasks
```

## Example

**Input**: `/code-review src/auth/`

**Output**: Detailed review of authentication module with security focus, code quality assessment, and specific improvement suggestions.

---
priority: high
scope: project
---

# Project Rules

This file defines the coding standards and guidelines for AI assistants working in this project.

## Code Style

### General
- Write clean, readable, and maintainable code
- Follow the principle of least surprise
- Prefer explicit over implicit
- Keep functions small and focused

### Naming Conventions
- Use descriptive, meaningful names
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Functions/Methods: `camelCase`
- Classes/Types: `PascalCase`
- Files: `kebab-case` or match framework convention

### Comments
- Write self-documenting code when possible
- Add comments only when the "why" isn't obvious
- Keep comments up to date with code changes
- Use JSDoc/TSDoc for public APIs

## Error Handling

- Always handle errors appropriately
- Provide meaningful error messages
- Don't swallow errors silently
- Use proper error types/classes

## Testing

- Write tests for new functionality
- Maintain test coverage
- Test edge cases and error conditions
- Keep tests focused and readable

## Git Conventions

### Commits
- Use conventional commits: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep commits atomic and focused
- Write clear commit messages

### Branches
- Use feature branches for new work
- Name branches descriptively: `feat/feature-name`, `fix/bug-description`

## Project-Specific Rules

<!-- Add your project-specific rules below -->

### Tech Stack
- [List your main technologies]

### Architecture
- [Describe your architecture patterns]

### Dependencies
- [Any dependency management rules]

## AI Assistant Guidelines

### When Making Changes
1. Understand the existing code style
2. Follow established patterns
3. Don't introduce new patterns without discussion
4. Keep changes minimal and focused

### When Uncertain
- Ask for clarification rather than assuming
- Prefer safe, conservative approaches
- Document assumptions made

### Code Quality
- Run linting before completing
- Ensure types are correct
- Check for obvious bugs
- Consider edge cases

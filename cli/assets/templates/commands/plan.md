---
description: Create implementation plan for features or tasks
---

# Plan

Create a detailed implementation plan for a feature or task.

## Usage

```
/plan [feature or task]
```

**Arguments:**
- `$ARGUMENTS` - Feature or task to plan (e.g., "user authentication with OAuth")

## Planning Process

### Phase 1: Requirements
1. Understand the goal
2. Identify constraints
3. Define scope
4. List assumptions

### Phase 2: Design
1. High-level architecture
2. Component breakdown
3. Data flow
4. API/interface design

### Phase 3: Tasks
1. Break into small tasks (2-5 min each)
2. Order by dependencies
3. Identify risks
4. Estimate effort

## Output Format

```markdown
## Plan: [Feature/Task]

### Overview
Brief description of what will be built.

### Requirements
- Functional: [list]
- Non-functional: [list]
- Constraints: [list]

### Architecture
[High-level design description]

### Tasks

#### Phase 1: Setup
- [ ] Task 1 (est: X min)
- [ ] Task 2 (est: X min)

#### Phase 2: Core Implementation
- [ ] Task 3 (est: X min)
- [ ] Task 4 (est: X min)

#### Phase 3: Testing & Polish
- [ ] Task 5 (est: X min)
- [ ] Task 6 (est: X min)

### Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| ... | ... | ... |

### Dependencies
- External: [list]
- Internal: [list]

### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

## Example

**Input**: `/plan add dark mode support`

**Output**: Detailed plan with CSS variable setup, theme context, toggle component, persistence, and testing tasks.

---
description: Deep research on technical topics with structured findings
---

# Research

Conduct thorough research on a technical topic and provide structured findings.

## Usage

```
/research [topic]
```

**Arguments:**
- `$ARGUMENTS` - Topic or question to research (e.g., "best practices for React state management")

## Research Process

### Phase 1: Understanding
- Clarify the research question
- Identify key aspects to investigate
- Determine scope and boundaries

### Phase 2: Investigation
- Gather information from multiple angles
- Compare different approaches/solutions
- Identify trade-offs and considerations

### Phase 3: Synthesis
- Consolidate findings
- Draw conclusions
- Formulate recommendations

## Output Format

```markdown
## Research: [Topic]

### Executive Summary
Brief overview of key findings (2-3 sentences).

### Key Findings

#### [Finding 1]
- Details and evidence
- Implications

#### [Finding 2]
- Details and evidence
- Implications

### Comparison

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Option A | ... | ... | ... |
| Option B | ... | ... | ... |

### Recommendations
1. Primary recommendation with rationale
2. Alternative approaches
3. When to reconsider

### Resources
- [Resource 1]: Brief description
- [Resource 2]: Brief description
```

## Example

**Input**: `/research authentication strategies for Next.js`

**Output**: Comprehensive analysis of auth options (NextAuth, Clerk, Auth0, custom), with comparison table, security considerations, and implementation recommendations.

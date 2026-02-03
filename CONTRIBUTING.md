# Contributing to Aidekit

Thank you for your interest in contributing to Aidekit!

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/aidekit.git
   cd aidekit
   ```

2. **Install dependencies:**
   ```bash
   cd cli
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Link for local testing:**
   ```bash
   npm link
   ```

## Development Workflow

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature
   ```

2. Make your changes

3. Run linting:
   ```bash
   npm run lint
   npm run lint:fix  # To auto-fix issues
   ```

4. Build and test:
   ```bash
   npm run build
   aidekit --help
   ```

5. Commit using conventional commits (see below)

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/). This enables automatic versioning and changelog generation.

**Format:**
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature (triggers minor version bump)
- `fix`: Bug fix (triggers patch version bump)
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Breaking Changes:**
- Add `!` after type: `feat!: remove deprecated API`
- Or add `BREAKING CHANGE:` in footer

**Examples:**
```bash
# Feature (minor version bump: 1.0.0 → 1.1.0)
git commit -m "feat: add windsurf support"

# Bug fix (patch version bump: 1.0.0 → 1.0.1)
git commit -m "fix: handle empty project directory"

# Breaking change (major version bump: 1.0.0 → 2.0.0)
git commit -m "feat!: change init command API"

# No release
git commit -m "docs: update installation instructions"
git commit -m "chore: update dependencies"
```

### Pull Requests

1. **Title**: Use conventional commit format for PR title
2. **Description**: Explain what changes you made and why
3. **Tests**: Ensure all checks pass (build, lint, dry-run publish)
4. **Review**: Wait for code review approval

### Release Process

Releases are fully automated via GitHub Actions:

1. Merge PR to `main`
2. semantic-release analyzes commits
3. Version is automatically determined
4. Package is published to npm
5. GitHub release is created with changelog

No manual version bumping or tagging required!

## Project Structure

```
aidekit/
├── cli/                    # CLI package
│   ├── src/               # TypeScript source
│   │   ├── commands/      # CLI commands (init, add, list, update)
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utilities (logger, detect, template)
│   ├── assets/            # Templates and configs
│   │   └── templates/     # Component templates
│   ├── dist/              # Compiled output
│   └── package.json
├── .github/
│   └── workflows/         # CI/CD workflows
└── README.md
```

## Adding New Templates

1. Add template file to `cli/assets/templates/<type>s/`
2. Template variables use `{{VARIABLE}}` syntax
3. Include YAML frontmatter for metadata

Example template:
```markdown
---
description: My custom command
category: workflow
---

# {{DISPLAY_NAME}}

Your command content here...
```

## Questions?

Open an issue for questions, bugs, or feature requests.

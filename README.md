# Aidekit - AI Development Kit

Universal AI coding toolkit for modern IDEs.

## Overview

Aidekit provides commands, rules, skills, and agents to enhance your AI coding experience across multiple IDEs and AI assistants.

## Supported AI Tools

| Tool | Status | Features |
|------|--------|----------|
| **Cursor** | ✅ Full Support | Commands, Rules, Skills |
| **Claude Code** | 🔜 Coming Soon | Commands, Rules, Skills, Agents |
| **Windsurf** | 🔜 Coming Soon | Commands, Rules, Skills |

## Installation

```bash
# Install globally
npm install -g aidekit-cli

# Or use npx
npx aidekit-cli init
```

## Quick Start

```bash
# Initialize in your project
cd your-project
aidekit init

# Add a new command
aidekit add command my-command

# List installed components
aidekit list
```

## What Gets Installed

When you run `aidekit init`, it creates:

```
your-project/
├── .cursor/                  # (or .claude/, .windsurf/)
│   ├── commands/             # Slash commands
│   │   ├── code-review.md
│   │   ├── research.md
│   │   └── refactor.md
│   ├── rules/                # Project rules
│   │   └── base.md
│   └── skills/               # Skills/expertise
│       └── typescript.md
└── .cursorrules              # Rules symlink/copy
```

## Commands

### `aidekit init`

Initialize aidekit in your project.

```bash
aidekit init              # Auto-detect AI tool
aidekit init --tool cursor  # Specify AI tool
aidekit init --force      # Overwrite existing files
```

### `aidekit add`

Add a new component.

```bash
aidekit add command <name>  # Create new command
aidekit add rule <name>     # Create new rule
aidekit add skill <name>    # Create new skill
```

### `aidekit list`

List installed components.

```bash
aidekit list              # List all components
aidekit list commands     # List commands only
aidekit list rules        # List rules only
aidekit list skills       # List skills only
```

### `aidekit update`

Update aidekit to the latest version.

```bash
aidekit update
```

## Components

### Commands

Slash commands that automate workflows. Examples:
- `/code-review` - Multi-perspective code review
- `/research` - Deep research on topics
- `/refactor` - Safe code refactoring

### Rules

Project-level rules and guidelines for AI assistants.

### Skills

Domain expertise that enhances AI capabilities:
- TypeScript best practices
- React patterns
- Testing methodologies

## Customization

All templates can be customized after installation. Edit the files in your `.cursor/` (or equivalent) directory.

## Development

### CI/CD

This project uses GitHub Actions for CI/CD:

- **CI Workflow** (`ci.yml`): Runs on every PR to validate build, lint, and dry-run publish
- **Release Workflow** (`release.yml`): Automatically publishes to npm when merging to `main`

### Required GitHub Secrets

To enable automatic npm publishing, add the following secret to your GitHub repository:

| Secret | Description | How to Get It |
|--------|-------------|---------------|
| `NPM_TOKEN` | npm automation token for publishing | [npm Access Tokens](https://www.npmjs.com/settings/your-username/tokens) → Generate New Token → Automation |

**Setup Steps:**

1. **Generate npm Token:**
   - Go to [npmjs.com](https://www.npmjs.com/) → Click your avatar → Access Tokens
   - Click "Generate New Token" → Select "Automation"
   - Copy the generated token

2. **Add to GitHub:**
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with [semantic-release](https://semantic-release.gitbook.io/):

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `fix:` | Patch (1.0.x) | `fix: handle empty directory` |
| `feat:` | Minor (1.x.0) | `feat: add claude support` |
| `feat!:` or `BREAKING CHANGE:` | Major (x.0.0) | `feat!: change init API` |
| `chore:`, `docs:`, `style:`, `test:` | No release | `docs: update readme` |

### npm Provenance

The package is published with [npm provenance](https://docs.npmjs.com/generating-provenance-statements) enabled, providing supply chain security and linking published packages to their source code.

## Roadmap

- [ ] Claude Code support
- [ ] Windsurf support
- [ ] More command templates
- [ ] Knowledge base system
- [ ] Component validation
- [ ] Documentation website

## Contributing

Contributions welcome! Please read our contributing guidelines.

## License

MIT

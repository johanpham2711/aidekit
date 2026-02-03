# aidekit-cli

CLI to install the universal AI coding toolkit for modern IDEs.

## Installation

```bash
# Install globally
npm install -g aidekit-cli

# Or use npx
npx aidekit-cli init
```

## Quick Start

```bash
# Navigate to your project
cd your-project

# Initialize aidekit
aidekit init

# Follow the prompts to select your AI tool
```

## Commands

### `aidekit init`

Initialize aidekit in the current project.

```bash
aidekit init              # Auto-detect AI tool
aidekit init --tool cursor  # Specify AI tool
aidekit init --force      # Overwrite existing files
```

**Options:**
- `-t, --tool <type>` - AI tool type (`cursor`, `claude`, `windsurf`)
- `-f, --force` - Overwrite existing files

### `aidekit add`

Add a new component.

```bash
aidekit add command my-command    # Create new command
aidekit add rule my-rule          # Create new rule
aidekit add skill my-skill        # Create new skill
aidekit add agent my-agent        # Create new agent
```

**Arguments:**
- `<type>` - Component type (`command`, `rule`, `skill`, `agent`)
- `<name>` - Component name

**Options:**
- `-f, --force` - Overwrite if exists

### `aidekit list`

List installed components.

```bash
aidekit list              # List all components
aidekit list --type commands  # List commands only
aidekit list --type rules     # List rules only
```

**Options:**
- `-t, --type <type>` - Filter by type

### `aidekit update`

Update aidekit to the latest version.

```bash
aidekit update
```

## Supported AI Tools

| Tool | Status | Directory |
|------|--------|-----------|
| Cursor | ✅ Full Support | `.cursor/` |
| Claude Code | 🔜 Coming Soon | `.claude/` |
| Windsurf | 🔜 Coming Soon | `.windsurf/` |

## What Gets Installed

```
your-project/
├── .cursor/                  # (or .claude/, .windsurf/)
│   ├── commands/             # Slash commands
│   │   ├── code-review.md
│   │   ├── research.md
│   │   ├── refactor.md
│   │   ├── plan.md
│   │   └── debug.md
│   ├── rules/                # Project rules
│   │   └── base.md
│   ├── skills/               # Skills/expertise
│   │   ├── typescript.md
│   │   └── react.md
│   └── agents/               # Agents (future)
└── .cursorrules              # Rules file
```

## Components

### Commands

Slash commands that automate workflows:

- **`/code-review`** - Multi-perspective code review
- **`/research`** - Deep research on topics
- **`/refactor`** - Safe code refactoring
- **`/plan`** - Implementation planning
- **`/debug`** - Systematic debugging

### Rules

Project-level rules and guidelines for AI assistants.

### Skills

Domain expertise that enhances AI capabilities:

- **TypeScript** - Type safety, patterns, best practices
- **React** - Components, hooks, performance

## Customization

All templates can be customized after installation. Edit the files in your `.cursor/` (or equivalent) directory.

## Development

```bash
# Clone the repository
git clone https://github.com/your-username/aidekit.git
cd aidekit/cli

# Install dependencies
npm install

# Run in development mode
npm run dev -- init

# Build
npm run build
```

## License

MIT

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AIType, ComponentType, PlatformConfig } from '../types/index.js';
import { ensureDirectoryExists, pathExists, writeFileSafe } from './filesystem.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
// After build: dist/utils/template.js -> ../../assets
const ASSETS_DIR = join(__dirname, '..', '..', 'assets');

/**
 * Load platform configuration from JSON file
 */
export async function loadPlatformConfig(aiType: AIType): Promise<PlatformConfig> {
  const configPath = join(ASSETS_DIR, 'templates', 'platforms', `${aiType}.json`);
  const content = await readFile(configPath, 'utf-8');
  return JSON.parse(content) as PlatformConfig;
}

/**
 * Load a template file
 */
export async function loadTemplate(type: ComponentType, name: string): Promise<string> {
  const templatePath = join(ASSETS_DIR, 'templates', `${type}s`, `${name}.md`);
  return readFile(templatePath, 'utf-8');
}

/**
 * Load a blank template for creating new components
 */
export async function loadBlankTemplate(type: ComponentType): Promise<string> {
  const templatePath = join(ASSETS_DIR, 'templates', `${type}s`, '_blank.md');
  try {
    return await readFile(templatePath, 'utf-8');
  } catch {
    // Return a basic template if blank template doesn't exist
    return getDefaultTemplate(type);
  }
}

/**
 * Get default template content for a component type
 */
function getDefaultTemplate(type: ComponentType): string {
  switch (type) {
    case 'command':
      return `---
description: Description of what this command does
---

# Command Name

## Purpose

Describe the purpose of this command.

## Usage

\`\`\`
/command-name [arguments]
\`\`\`

## Workflow

1. First step
2. Second step
3. Third step

## Example

**Input**: \`/command-name example\`

**Output**: Expected result
`;

    case 'rule':
      return `---
priority: medium
scope: project
---

# Rule Name

## Description

Describe what this rule enforces.

## Guidelines

- Guideline 1
- Guideline 2
- Guideline 3

## Examples

### Good

\`\`\`
Example of correct code
\`\`\`

### Bad

\`\`\`
Example of incorrect code
\`\`\`
`;

    case 'skill':
      return `---
name: skill-name
description: Description of this skill
---

# Skill Name

## Overview

Describe what this skill provides.

## Key Concepts

- Concept 1
- Concept 2
- Concept 3

## Best Practices

1. Practice 1
2. Practice 2
3. Practice 3

## Examples

Example usage and patterns.
`;

    case 'agent':
      return `---
name: agent-name
description: Description of this agent
tools: Read, Edit, Grep, Bash
---

# Agent Name

## Purpose

Describe the purpose of this agent.

## Capabilities

- Capability 1
- Capability 2
- Capability 3

## When to Use

Use this agent when:
- Condition 1
- Condition 2
`;

    default:
      return `# ${type}\n\nContent here.`;
  }
}

/**
 * Render template with variable substitution
 */
export function renderTemplate(content: string, variables: Record<string, string>): string {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }
  return result;
}

/**
 * List available templates for a component type
 */
export async function listAvailableTemplates(type: ComponentType): Promise<string[]> {
  const templatesDir = join(ASSETS_DIR, 'templates', `${type}s`);
  try {
    const { readdir } = await import('node:fs/promises');
    const files = await readdir(templatesDir);
    return files
      .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
      .map((f) => f.replace('.md', ''));
  } catch {
    return [];
  }
}

/**
 * Generate all platform files for an AI type
 */
export async function generatePlatformFiles(
  targetDir: string,
  aiType: AIType,
  options: { force?: boolean } = {}
): Promise<string[]> {
  const config = await loadPlatformConfig(aiType);
  const createdItems: string[] = [];

  // Create directory structure
  const rootDir = join(targetDir, config.folderStructure.root);
  const directories = ['commands', 'rules', 'skills', 'agents'] as const;

  for (const dir of directories) {
    const dirPath = join(rootDir, config.folderStructure[dir]);
    await ensureDirectoryExists(dirPath);
  }
  createdItems.push(config.folderStructure.root);

  // Copy command templates
  if (config.features.commands) {
    const commandTemplates = await listAvailableTemplates('command');
    const commandsDir = join(rootDir, config.folderStructure.commands);

    for (const template of commandTemplates) {
      const content = await loadTemplate('command', template);
      const targetPath = join(commandsDir, `${template}.md`);
      const { written } = await writeFileSafe(targetPath, content, options);
      if (written) {
        createdItems.push(`${config.folderStructure.commands}/${template}.md`);
      }
    }
  }

  // Copy rule templates
  if (config.features.rules) {
    const ruleTemplates = await listAvailableTemplates('rule');
    const rulesDir = join(rootDir, config.folderStructure.rules);

    for (const template of ruleTemplates) {
      const content = await loadTemplate('rule', template);
      const targetPath = join(rulesDir, `${template}.md`);
      const { written } = await writeFileSafe(targetPath, content, options);
      if (written) {
        createdItems.push(`${config.folderStructure.rules}/${template}.md`);
      }
    }
  }

  // Copy skill templates
  if (config.features.skills) {
    const skillTemplates = await listAvailableTemplates('skill');
    const skillsDir = join(rootDir, config.folderStructure.skills);

    for (const template of skillTemplates) {
      const content = await loadTemplate('skill', template);
      const targetPath = join(skillsDir, `${template}.md`);
      const { written } = await writeFileSafe(targetPath, content, options);
      if (written) {
        createdItems.push(`${config.folderStructure.skills}/${template}.md`);
      }
    }
  }

  // Create rules file (e.g., .cursorrules)
  if (config.rulesFile) {
    const rulesFilePath = join(targetDir, config.rulesFile);
    const rulesContent = `# ${config.displayName} Rules

This file is auto-generated by aidekit. 
Customize your project rules in ${config.folderStructure.root}/${config.folderStructure.rules}/

See: https://github.com/your-username/aidekit
`;
    const { written } = await writeFileSafe(rulesFilePath, rulesContent, options);
    if (written) {
      createdItems.push(config.rulesFile);
    }
  }

  return createdItems;
}

/**
 * Create a new component from template
 */
export async function createComponent(
  targetDir: string,
  aiType: AIType,
  type: ComponentType,
  name: string,
  options: { force?: boolean } = {}
): Promise<{ created: boolean; path: string }> {
  const config = await loadPlatformConfig(aiType);

  // Get the correct subdirectory for this component type
  const subDir =
    config.folderStructure[`${type}s` as keyof typeof config.folderStructure] || `${type}s`;
  const componentDir = join(targetDir, config.folderStructure.root, subDir);
  const componentPath = join(componentDir, `${name}.md`);

  // Check if already exists
  if ((await pathExists(componentPath)) && !options.force) {
    return { created: false, path: componentPath };
  }

  // Load blank template and render
  const template = await loadBlankTemplate(type);
  const content = renderTemplate(template, {
    NAME: name,
    name: name.toLowerCase(),
    NAME_TITLE: name.charAt(0).toUpperCase() + name.slice(1),
  });

  // Ensure directory exists and write file
  await ensureDirectoryExists(componentDir);
  await writeFileSafe(componentPath, content, options);

  return { created: true, path: componentPath };
}

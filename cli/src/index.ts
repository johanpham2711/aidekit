#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { updateCommand } from './commands/update.js';
import type { AIType, ComponentType } from './types/index.js';
import { AI_TYPES, COMPONENT_TYPES } from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

const program = new Command();

program
  .name('aidekit')
  .description('Universal AI coding toolkit for modern IDEs')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize aidekit in the current project')
  .option('-t, --tool <type>', `AI tool type (${AI_TYPES.join(', ')})`)
  .option('-f, --force', 'Overwrite existing files')
  .action(async (options) => {
    if (options.tool && !AI_TYPES.includes(options.tool)) {
      console.error(`Invalid AI tool: ${options.tool}`);
      console.error(`Valid tools: ${AI_TYPES.join(', ')}`);
      process.exit(1);
    }
    await initCommand({
      tool: options.tool as AIType | undefined,
      force: options.force,
    });
  });

program
  .command('add')
  .description('Add a new component (command, rule, skill, or agent)')
  .argument('<type>', `Component type (${COMPONENT_TYPES.join(', ')})`)
  .argument('<name>', 'Component name')
  .option('-f, --force', 'Overwrite if exists')
  .action(async (type, name, options) => {
    if (!COMPONENT_TYPES.includes(type)) {
      console.error(`Invalid component type: ${type}`);
      console.error(`Valid types: ${COMPONENT_TYPES.join(', ')}`);
      process.exit(1);
    }
    await addCommand({
      type: type as ComponentType,
      name,
      force: options.force,
    });
  });

program
  .command('list')
  .description('List installed components')
  .option('-t, --type <type>', `Filter by type (${COMPONENT_TYPES.join(', ')})`)
  .action(async (options) => {
    if (options.type && !COMPONENT_TYPES.includes(options.type)) {
      console.error(`Invalid component type: ${options.type}`);
      console.error(`Valid types: ${COMPONENT_TYPES.join(', ')}`);
      process.exit(1);
    }
    await listCommand({
      type: options.type as ComponentType | undefined,
    });
  });

program
  .command('update')
  .description('Update aidekit to the latest version')
  .action(async () => {
    await updateCommand();
  });

program.parse();

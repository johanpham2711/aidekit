import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import type { AIType, InitOptions } from '../types/index.js';
import { AI_TYPES } from '../types/index.js';
import { detectAIType, getAITypeDescription } from '../utils/detect.js';
import { logger } from '../utils/logger.js';
import { generatePlatformFiles } from '../utils/template.js';

/**
 * Initialize aidekit in the current project
 */
export async function initCommand(options: InitOptions): Promise<void> {
  logger.title('Aidekit Installer');

  let aiType = options.tool;

  // Auto-detect or prompt for AI type
  if (!aiType) {
    const { detected, suggested } = detectAIType();

    if (detected.length > 0) {
      logger.info(`Detected: ${detected.map((t) => chalk.cyan(t)).join(', ')}`);
    }

    const response = await prompts({
      type: 'select',
      name: 'aiType',
      message: 'Select AI tool to install for:',
      choices: AI_TYPES.map((type) => ({
        title: getAITypeDescription(type),
        value: type,
      })),
      initial: suggested ? AI_TYPES.indexOf(suggested) : 0,
    });

    if (!response.aiType) {
      logger.warn('Installation cancelled');
      return;
    }

    aiType = response.aiType as AIType;
  }

  logger.info(`Installing for: ${chalk.cyan(getAITypeDescription(aiType))}`);

  const spinner = ora('Installing files...').start();
  const cwd = process.cwd();

  try {
    spinner.text = 'Generating files from templates...';

    const createdItems = await generatePlatformFiles(cwd, aiType, {
      force: options.force,
    });

    spinner.succeed('Installation complete!');

    // Summary
    logger.blank();
    logger.info('Created:');
    createdItems.forEach((item) => {
      console.log(`  ${chalk.green('+')} ${item}`);
    });

    logger.blank();
    logger.success('Aidekit installed successfully!');

    // Next steps
    logger.blank();
    console.log(chalk.bold('Next steps:'));
    console.log(chalk.dim('  1. Restart your AI coding assistant'));
    console.log(chalk.dim('  2. Customize rules in .cursor/rules/base.md'));
    console.log(chalk.dim('  3. Try a command: /code-review or /research'));
    logger.blank();
  } catch (error) {
    spinner.fail('Installation failed');
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
}

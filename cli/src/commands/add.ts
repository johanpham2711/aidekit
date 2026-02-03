import chalk from 'chalk';
import ora from 'ora';
import type { AddOptions, AIType } from '../types/index.js';
import { detectAIType, getAITypeDescription } from '../utils/detect.js';
import { createComponent } from '../utils/template.js';
import { logger } from '../utils/logger.js';

/**
 * Add a new component to the project
 */
export async function addCommand(options: AddOptions): Promise<void> {
  const { type, name, force } = options;

  logger.title(`Add ${type}`);

  // Detect AI tool
  const { detected, suggested } = detectAIType();

  if (detected.length === 0 && !suggested) {
    logger.error('No AI tool detected. Run "aidekit init" first.');
    process.exit(1);
  }

  const aiType: AIType = detected[0] || suggested || 'cursor';
  logger.info(`Using: ${chalk.cyan(getAITypeDescription(aiType))}`);

  const spinner = ora(`Creating ${type} "${name}"...`).start();

  try {
    const cwd = process.cwd();
    const result = await createComponent(cwd, aiType, type, name, { force });

    if (!result.created) {
      spinner.fail(`${type} "${name}" already exists`);
      logger.dim(`Use --force to overwrite`);
      return;
    }

    spinner.succeed(`Created ${type} "${name}"`);

    logger.blank();
    logger.info(`File: ${chalk.cyan(result.path)}`);
    logger.blank();
    logger.dim('Edit the file to customize your component.');
    logger.blank();
  } catch (error) {
    spinner.fail(`Failed to create ${type}`);
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
}

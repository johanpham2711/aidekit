import chalk from 'chalk';
import { join } from 'node:path';
import type { ListOptions, AIType, ComponentType } from '../types/index.js';
import { COMPONENT_TYPES } from '../types/index.js';
import { detectAIType, getAITypeDescription, getAIDirectory } from '../utils/detect.js';
import { listFiles, pathExists } from '../utils/filesystem.js';
import { logger } from '../utils/logger.js';

/**
 * List installed components
 */
export async function listCommand(options: ListOptions): Promise<void> {
  logger.title('Installed Components');

  // Detect AI tool
  const { detected } = detectAIType();

  if (detected.length === 0) {
    logger.warn('No AI tool detected. Run "aidekit init" first.');
    return;
  }

  const cwd = process.cwd();

  for (const aiType of detected) {
    console.log(chalk.bold.cyan(`\n${getAITypeDescription(aiType)}`));
    console.log(chalk.dim('─'.repeat(40)));

    const rootDir = join(cwd, getAIDirectory(aiType));

    // Filter component types if specified
    const typesToList = options.type ? [options.type] : COMPONENT_TYPES;

    for (const type of typesToList) {
      await listComponentType(rootDir, type);
    }
  }

  logger.blank();
}

async function listComponentType(
  rootDir: string,
  type: ComponentType
): Promise<void> {
  const dirName = `${type}s`;
  const dir = join(rootDir, dirName);

  if (!(await pathExists(dir))) {
    return;
  }

  const files = await listFiles(dir);
  const mdFiles = files.filter((f) => f.endsWith('.md'));

  if (mdFiles.length === 0) {
    return;
  }

  console.log();
  console.log(chalk.yellow(`  ${capitalizeFirst(type)}s (${mdFiles.length})`));

  for (const file of mdFiles) {
    const name = file.replace('.md', '');
    console.log(`    ${chalk.dim('•')} ${name}`);
  }
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

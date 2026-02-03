import chalk from 'chalk';
import { logger } from '../utils/logger.js';

/**
 * Update aidekit to the latest version
 */
export async function updateCommand(): Promise<void> {
  logger.title('Update Aidekit');

  logger.info('Checking for updates...');
  logger.blank();

  // For MVP, just show instructions
  // Future: Implement actual update mechanism via npm/GitHub

  console.log(chalk.bold('To update aidekit:'));
  logger.blank();

  console.log(chalk.dim('  # Update CLI globally'));
  console.log('  npm install -g aidekit-cli@latest');
  logger.blank();

  console.log(chalk.dim('  # Then re-initialize in your project'));
  console.log('  aidekit init --force');
  logger.blank();

  logger.info(
    'Note: Use --force to update existing templates while preserving your customizations.'
  );
  logger.blank();

  // Future enhancements:
  // - Check npm registry for latest version
  // - Compare with installed version
  // - Download and apply updates
  // - Merge user customizations
}

import chalk from 'chalk';

/**
 * Logger utility for consistent console output
 */
export const logger = {
  /**
   * Display a title/header
   */
  title(message: string): void {
    console.log();
    console.log(chalk.bold.cyan(`✨ ${message}`));
    console.log();
  },

  /**
   * Display an info message
   */
  info(message: string): void {
    console.log(chalk.blue('ℹ'), message);
  },

  /**
   * Display a success message
   */
  success(message: string): void {
    console.log(chalk.green('✓'), message);
  },

  /**
   * Display a warning message
   */
  warn(message: string): void {
    console.log(chalk.yellow('⚠'), message);
  },

  /**
   * Display an error message
   */
  error(message: string): void {
    console.log(chalk.red('✗'), message);
  },

  /**
   * Display a list item
   */
  item(message: string, indent: number = 0): void {
    const spaces = '  '.repeat(indent);
    console.log(`${spaces}${chalk.dim('•')} ${message}`);
  },

  /**
   * Display a step in a process
   */
  step(number: number, message: string): void {
    console.log(chalk.dim(`${number}.`), message);
  },

  /**
   * Display a blank line
   */
  blank(): void {
    console.log();
  },

  /**
   * Display a dimmed message
   */
  dim(message: string): void {
    console.log(chalk.dim(message));
  },

  /**
   * Display a highlighted value
   */
  highlight(label: string, value: string): void {
    console.log(`${chalk.dim(label)}: ${chalk.cyan(value)}`);
  },
};

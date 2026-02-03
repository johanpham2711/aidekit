import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';

/**
 * Check if a path exists
 */
export async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensure a directory exists, creating it if necessary
 */
export async function ensureDirectoryExists(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

/**
 * Write a file, optionally checking if it already exists
 */
export async function writeFileSafe(
  filePath: string,
  content: string,
  options: { force?: boolean } = {}
): Promise<{ written: boolean; existed: boolean }> {
  const existed = await pathExists(filePath);

  if (existed && !options.force) {
    return { written: false, existed: true };
  }

  // Ensure parent directory exists
  await ensureDirectoryExists(dirname(filePath));

  // Write the file
  await fs.writeFile(filePath, content, 'utf-8');

  return { written: true, existed };
}

/**
 * Read a file as string
 */
export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

/**
 * Copy a file from source to destination
 */
export async function copyFile(
  source: string,
  destination: string,
  options: { force?: boolean } = {}
): Promise<{ copied: boolean; existed: boolean }> {
  const existed = await pathExists(destination);

  if (existed && !options.force) {
    return { copied: false, existed: true };
  }

  // Ensure parent directory exists
  await ensureDirectoryExists(dirname(destination));

  // Copy the file
  await fs.copyFile(source, destination);

  return { copied: true, existed };
}

/**
 * List files in a directory
 */
export async function listFiles(dirPath: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries.filter((e) => e.isFile()).map((e) => e.name);
  } catch {
    return [];
  }
}

/**
 * List directories in a directory
 */
export async function listDirectories(dirPath: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

/**
 * Get file stats
 */
export async function getFileStats(filePath: string): Promise<{ size: number; mtime: Date } | null> {
  try {
    const stats = await fs.stat(filePath);
    return { size: stats.size, mtime: stats.mtime };
  } catch {
    return null;
  }
}

/**
 * Join paths safely
 */
export function joinPath(...paths: string[]): string {
  return join(...paths);
}

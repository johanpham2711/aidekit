import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { AIType, DetectionResult } from '../types/index.js';
import { AI_DIRECTORIES } from '../types/index.js';

/**
 * Detect which AI coding tools are present in the current directory
 */
export function detectAIType(cwd: string = process.cwd()): DetectionResult {
  const detected: AIType[] = [];

  // Check for each AI tool's directory
  if (existsSync(join(cwd, '.cursor'))) {
    detected.push('cursor');
  }
  if (existsSync(join(cwd, '.claude'))) {
    detected.push('claude');
  }
  if (existsSync(join(cwd, '.windsurf'))) {
    detected.push('windsurf');
  }

  // Suggest based on what's detected
  let suggested: AIType | null = null;
  if (detected.length === 1) {
    suggested = detected[0];
  } else if (detected.length === 0) {
    // Default to cursor if nothing detected
    suggested = 'cursor';
  }

  return { detected, suggested };
}

/**
 * Get human-readable description for an AI type
 */
export function getAITypeDescription(aiType: AIType): string {
  switch (aiType) {
    case 'cursor':
      return 'Cursor IDE (.cursor/)';
    case 'claude':
      return 'Claude Code (.claude/)';
    case 'windsurf':
      return 'Windsurf (.windsurf/)';
    default:
      return aiType;
  }
}

/**
 * Get the root directory for an AI type
 */
export function getAIDirectory(aiType: AIType): string {
  return AI_DIRECTORIES[aiType];
}

/**
 * Check if an AI tool is installed in the given directory
 */
export function isAIToolInstalled(aiType: AIType, cwd: string = process.cwd()): boolean {
  const dir = AI_DIRECTORIES[aiType];
  return existsSync(join(cwd, dir));
}

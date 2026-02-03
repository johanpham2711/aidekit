/**
 * Supported AI coding tools
 */
export type AIType = 'cursor' | 'claude' | 'windsurf';

/**
 * Component types that can be installed/managed
 */
export type ComponentType = 'command' | 'rule' | 'skill' | 'agent';

/**
 * All supported AI types
 */
export const AI_TYPES: AIType[] = ['cursor', 'claude', 'windsurf'];

/**
 * All supported component types
 */
export const COMPONENT_TYPES: ComponentType[] = ['command', 'rule', 'skill', 'agent'];

/**
 * AI tool directory mappings
 */
export const AI_DIRECTORIES: Record<AIType, string> = {
  cursor: '.cursor',
  claude: '.claude',
  windsurf: '.windsurf',
};

/**
 * Platform configuration structure
 */
export interface PlatformConfig {
  platform: AIType;
  displayName: string;
  installType: 'full' | 'reference';
  folderStructure: {
    root: string;
    commands: string;
    rules: string;
    skills: string;
    agents: string;
  };
  features: {
    commands: boolean;
    rules: boolean;
    skills: boolean;
    subagents: boolean;
  };
  rulesFile?: string; // e.g., '.cursorrules'
}

/**
 * Options for the init command
 */
export interface InitOptions {
  tool?: AIType;
  force?: boolean;
}

/**
 * Options for the add command
 */
export interface AddOptions {
  type: ComponentType;
  name: string;
  force?: boolean;
}

/**
 * Options for the list command
 */
export interface ListOptions {
  type?: ComponentType;
}

/**
 * Detection result when checking for AI tools
 */
export interface DetectionResult {
  detected: AIType[];
  suggested: AIType | null;
}

/**
 * Component metadata (parsed from frontmatter)
 */
export interface ComponentMetadata {
  name: string;
  description?: string;
  category?: string;
  type: ComponentType;
  filePath: string;
}

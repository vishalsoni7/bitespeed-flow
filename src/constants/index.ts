/**
 * Constants Index - Central export point for all application constants
 * 
 * This file serves as the main entry point for importing constants throughout
 * the application. It provides a clean, organized way to access all constant
 * definitions from a single import statement.
 * 
 * Exported constant modules:
 * - nodeTypes: Defines the types of nodes available in the flow builder
 * - storage: Configuration for localStorage and data persistence
 * - flow: Default settings and configurations for flow behavior
 * - features: Homepage feature definitions and display configuration
 * - nodeComponents: Mapping of node types to their React components
 * - messages: User-facing text constants and notification messages
 * 
 * Usage example:
 * import { STORAGE_KEYS, NODE_TYPES, features } from '../constants';
 * 
 * Benefits:
 * - Single import source for all constants
 * - Better tree-shaking when bundling
 * - Easier to maintain and refactor constant locations
 * - Consistent naming and organization across the application
 */

// Export all node type definitions and constants
export * from './nodeTypes';

// Export storage-related constants (localStorage keys, etc.)
export * from './storage';

// Export flow configuration and default settings
export * from './flow';

// Export homepage features configuration
export * from './features';

// Export node component mappings and configurations
export * from './nodeComponents';

// Export user-facing messages and text constants
export * from './messages';
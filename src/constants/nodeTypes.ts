/**
 * Node Type Definitions
 * 
 * This file defines the available node types in the flow editor system.
 * It provides type-safe constants and TypeScript types for all supported
 * node types in the application.
 * 
 * Using `as const` assertion ensures the values are treated as literal types
 * rather than general strings, enabling better TypeScript inference and
 * type checking throughout the application.
 */

/**
 * Node type constants with type-safe string literals
 * 
 * This object serves as the single source of truth for all available node types.
 * Using constants instead of raw strings provides:
 * - Compile-time type checking
 * - IDE autocompletion
 * - Refactoring safety
 * - Prevention of typos in node type references
 * 
 * Naming convention: SCREAMING_SNAKE_CASE for constants
 * Value convention: camelCase to match React Flow conventions
 * 
 * @example
 * // Type-safe usage in components:
 * const nodeType = NODE_TYPES.TEXT_MESSAGE; // 'textMessage'
 * 
 * // Used in node creation:
 * const newNode = {
 *   id: generateId(),
 *   type: NODE_TYPES.TEXT_MESSAGE,
 *   data: { message: '' },
 *   position: { x: 0, y: 0 }
 * };
 */
export const NODE_TYPES = {
  /**
   * Text Message Node Type
   * 
   * Represents a node that contains and displays text messages.
   * This is the primary building block for chatbot conversation flows.
   * 
   * Value: 'textMessage' - matches the key in nodeComponents.ts registry
   * 
   * @type {'textMessage'}
   */
  TEXT_MESSAGE: 'textMessage',
} as const;

/**
 * Union type of all available node types
 * 
 * This type is automatically derived from the NODE_TYPES constant object,
 * ensuring it stays in sync when new node types are added or removed.
 * 
 * Currently includes: 'textMessage'
 * 
 * @example
 * // Type-safe function parameter:
 * function createNode(type: NodeType) {
 *   // TypeScript ensures only valid node types are passed
 * }
 * 
 * // Usage:
 * createNode(NODE_TYPES.TEXT_MESSAGE); // ✅ Valid
 * createNode('invalidType'); // ❌ TypeScript error
 * 
 * @type {'textMessage'}
 */
export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];
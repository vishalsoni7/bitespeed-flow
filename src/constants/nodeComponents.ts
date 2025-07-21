/**
 * Node Component Registry
 * 
 * This file serves as the central registry for mapping node type identifiers
 * to their corresponding React components. Used by React Flow to render
 * different types of nodes in the flow editor.
 * 
 * Each entry maps a string identifier to a React component that will be
 * used to render that specific type of node in the flow canvas.
 */

import TextMessageNode from "../components/nodes/TextMessageNode";

/**
 * Registry mapping node type identifiers to their React components
 * 
 * This object is used by React Flow's `nodeTypes` prop to determine which
 * component to render for each node based on its type property.
 * 
 * Key naming convention: camelCase identifiers that match the node type
 * Value: React component that renders the node
 * 
 * @example
 * // React Flow usage:
 * <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} />
 * 
 * // Node data structure:
 * const node = {
 *   id: '1',
 *   type: 'textMessage', // Must match key in nodeTypes
 *   data: { message: 'Hello World' },
 *   position: { x: 100, y: 100 }
 * };
 */
export const nodeTypes = {
  /**
   * Text Message Node Component
   * 
   * Renders a node that displays and allows editing of text messages.
   * This is the primary node type for creating chatbot message flows.
   * 
   * Features:
   * - Editable text content
   * - Message preview
   * - Connection handles for flow logic
   * - Validation for required text content
   * 
   * @type {React.ComponentType}
   */
  textMessage: TextMessageNode,
};
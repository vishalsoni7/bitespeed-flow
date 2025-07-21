import type { Node } from 'reactflow';

/**
 * Creates a new node for the flow diagram with a unique ID.
 * 
 * The node is created with:
 * - A unique ID based on the current timestamp
 * - The specified node type
 * - The given position coordinates
 * - Empty label data as default
 * 
 * @param {string} type - The type of node to create (e.g., 'text', 'custom', etc.)
 * @param {{ x: number; y: number }} position - The x,y coordinates where the node should be placed
 * @returns {Node} A new node object ready to be added to the flow
 * 
 * @example
 * // Create a text node at position (100, 200)
 * const newNode = createNode('text', { x: 100, y: 200 });
 * console.log(newNode);
 * // Output: { id: 'node_1234567890', type: 'text', position: { x: 100, y: 200 }, data: { label: '' } }
 */
export const createNode = (type: string, position: { x: number; y: number }): Node => {
  return {
    id: `node_${Date.now()}`, // Generate unique ID using timestamp
    type,
    position,
    data: { label: '' }, // Initialize with empty label
  };
};

/**
 * Updates the data property of a specific node in the nodes array.
 * 
 * This function creates a new array with the updated node data, maintaining
 * immutability which is important for React state updates and flow rendering.
 * 
 * @param {Node[]} nodes - Array of all nodes in the flow
 * @param {string} nodeId - The ID of the node to update
 * @param {Record<string, unknown>} newData - The new data object to set for the node
 * @returns {Node[]} A new array with the updated node
 * 
 * @example
 * const nodes = [
 *   { id: '1', type: 'text', position: { x: 0, y: 0 }, data: { label: 'Old' } },
 *   { id: '2', type: 'text', position: { x: 100, y: 0 }, data: { label: 'Keep' } }
 * ];
 * 
 * const updatedNodes = updateNodeData(nodes, '1', { label: 'New Label', color: 'blue' });
 * // Node with id '1' now has data: { label: 'New Label', color: 'blue' }
 * // Node with id '2' remains unchanged
 */
export const updateNodeData = (
  nodes: Node[],
  nodeId: string,
  newData: Record<string, unknown>
): Node[] => {
  return nodes.map((node) => {
    // Only update the node with matching ID
    if (node.id === nodeId) {
      return { ...node, data: newData }; // Create new node object with updated data
    }
    return node; // Return unchanged node for all others
  });
};
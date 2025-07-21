import type { Node, Edge } from 'reactflow';

/**
 * Validates a flow diagram to ensure it follows the required constraints.
 * 
 * The validation rules are:
 * 1. Flow must have at least one node
 * 2. Single node flows are always valid
 * 3. For multi-node flows, only one node can have empty target handles (i.e., no incoming connections)
 * 
 * This ensures that the flow has a clear starting point and maintains a connected structure.
 * 
 * @param {Node[]} nodes - Array of nodes in the flow
 * @param {Edge[]} edges - Array of edges (connections) between nodes
 * @returns {{ isValid: boolean; error?: string }} Validation result with optional error message
 * 
 * @example
 * const nodes = [
 *   { id: '1', type: 'text', position: { x: 0, y: 0 }, data: {} },
 *   { id: '2', type: 'text', position: { x: 100, y: 100 }, data: {} }
 * ];
 * const edges = [{ id: 'e1-2', source: '1', target: '2' }];
 * 
 * const result = validateFlow(nodes, edges);
 * if (result.isValid) {
 *   console.log('Flow is valid!');
 * } else {
 *   console.error(result.error);
 * }
 */
export const validateFlow = (nodes: Node[], edges: Edge[]): { isValid: boolean; error?: string } => {
  // Allow saving even with single node
  if (nodes.length === 0) {
    return {
      isValid: false,
      error: 'Cannot save flow: No nodes present',
    };
  }

  // If there's only one node, it's valid
  if (nodes.length === 1) {
    return { isValid: true };
  }

  // For multiple nodes, check that not more than one node has empty target handles
  const nodesWithEmptyTargets = nodes.filter((node) => {
    // Find all edges where this node is the target (incoming connections)
    const nodeEdges = edges.filter((edge) => edge.target === node.id);
    // If no edges target this node, it has empty target handles
    return nodeEdges.length === 0;
  });

  // More than one node without incoming connections violates the flow structure
  if (nodesWithEmptyTargets.length > 1) {
    return {
      isValid: false,
      error: 'Cannot save flow: More than one node has empty target handles',
    };
  }

  return { isValid: true };
};

/**
 * Checks if a node has any outgoing edges (connections from this node to other nodes).
 * 
 * This is useful for determining if a node is connected to other nodes in the flow
 * or if it's a terminal node with no outgoing connections.
 * 
 * @param {string} sourceNodeId - The ID of the node to check
 * @param {Edge[]} edges - Array of all edges in the flow
 * @returns {boolean} True if the node has at least one outgoing edge, false otherwise
 * 
 * @example
 * const edges = [
 *   { id: 'e1-2', source: 'node1', target: 'node2' },
 *   { id: 'e2-3', source: 'node2', target: 'node3' }
 * ];
 * 
 * checkSourceNodeEdges('node1', edges); // returns true
 * checkSourceNodeEdges('node3', edges); // returns false (no outgoing edges)
 */
export const checkSourceNodeEdges = (sourceNodeId: string, edges: Edge[]): boolean => {
  // Filter edges to find those originating from the specified node
  const sourceNodeEdges = edges.filter((edge) => edge.source === sourceNodeId);
  // Return true if at least one outgoing edge exists
  return sourceNodeEdges.length > 0;
};
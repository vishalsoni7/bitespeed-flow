import type { Node, Edge } from 'reactflow';

export const validateFlow = (nodes: Node[], edges: Edge[]): { isValid: boolean; error?: string } => {
  const nodesWithEmptyTargets = nodes.filter((node) => {
    const nodeEdges = edges.filter((edge) => edge.target === node.id);
    return nodeEdges.length === 0;
  });

  if (nodesWithEmptyTargets.length > 1) {
    return {
      isValid: false,
      error: 'Cannot save flow: More than one node has empty target handles',
    };
  }

  return { isValid: true };
};

export const checkSourceNodeEdges = (sourceNodeId: string, edges: Edge[]): boolean => {
  const sourceNodeEdges = edges.filter((edge) => edge.source === sourceNodeId);
  return sourceNodeEdges.length > 0;
};
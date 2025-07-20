import type { Node } from 'reactflow';

export const createNode = (type: string, position: { x: number; y: number }): Node => {
  return {
    id: `node_${Date.now()}`,
    type,
    position,
    data: { label: '' },
  };
};

export const updateNodeData = (
  nodes: Node[],
  nodeId: string,
  newData: Record<string, unknown>
): Node[] => {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return { ...node, data: newData };
    }
    return node;
  });
};
import type { Node, Edge } from 'reactflow';

export interface CurrentFlowState {
  nodes: Node[];
  edges: Edge[];
  lastSaved: string | null;
}

export interface SavedFlow {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  timestamp: Date;
}
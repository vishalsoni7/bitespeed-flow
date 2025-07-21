import type { Node, Edge } from 'reactflow';

/**
 * Represents the current state of a flow diagram
 * Used for tracking the active flow's nodes, edges, and save status
 * @interface CurrentFlowState
 */
export interface CurrentFlowState {
  /**
   * Array of nodes in the current flow
   * Each node represents a visual element in the flow diagram
   * Contains id, position, type, and custom data
   */
  nodes: Node[];
  
  /**
   * Array of edges (connections) between nodes
   * Each edge defines a connection from a source node to a target node
   * May include styling and behavior properties
   */
  edges: Edge[];
  
  /**
   * ISO timestamp string of when the flow was last saved
   * null if the flow has never been saved or is new
   * @example "2024-03-15T10:30:00.000Z"
   */
  lastSaved: string | null;
}

/**
 * Represents a saved flow diagram with metadata
 * Used for storing and retrieving flow configurations
 * @interface SavedFlow
 * @example
 * const savedFlow: SavedFlow = {
 *   id: "flow-123",
 *   name: "Customer Onboarding Flow",
 *   nodes: [...],
 *   edges: [...],
 *   timestamp: new Date("2024-03-15T10:30:00.000Z")
 * }
 */
export interface SavedFlow {
  /**
   * Unique identifier for the saved flow
   * Typically a UUID or timestamp-based ID
   * Used for retrieval and updates
   */
  id: string;
  
  /**
   * Human-readable name for the flow
   * Displayed in flow lists and used for searching
   * Should be descriptive and unique for better UX
   */
  name: string;
  
  /**
   * Array of nodes saved with this flow
   * Preserves the complete node state including positions and data
   */
  nodes: Node[];
  
  /**
   * Array of edges saved with this flow
   * Preserves all connections between nodes
   */
  edges: Edge[];
  
  /**
   * Date object representing when the flow was saved
   * Used for sorting and displaying save history
   * @constraint Should always be a valid Date object
   */
  timestamp: Date;
}
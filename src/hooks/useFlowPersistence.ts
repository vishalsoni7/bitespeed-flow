import { useEffect, useCallback } from "react";
import type { Node, Edge } from "reactflow";
import { useLocalStorage } from "./useLocalStorage";
import { debounce } from "../utils/debounce";
import type { CurrentFlowState, SavedFlow } from "../types";
import { CURRENT_FLOW_KEY, SAVED_FLOWS_KEY, AUTO_SAVE_DELAY } from "../constants";

/**
 * Custom hook for persisting flow diagrams to localStorage.
 * 
 * This hook provides functionality to:
 * - Auto-save the current flow state with debouncing
 * - Save named flow configurations
 * - Delete saved flows
 * - Synchronize flow state across browser tabs
 * 
 * @param nodes - Array of React Flow nodes representing the current flow state
 * @param edges - Array of React Flow edges (connections) between nodes
 * 
 * @returns An object containing:
 *   - savedFlows: Array of saved flow configurations
 *   - currentFlowState: The current working flow state (auto-saved)
 *   - saveFlow: Function to save the current flow with a name
 *   - deleteFlow: Function to delete a saved flow by ID
 * 
 * @example
 * ```tsx
 * const { nodes, edges } = useNodesState([]);
 * const { savedFlows, currentFlowState, saveFlow, deleteFlow } = useFlowPersistence(nodes, edges);
 * 
 * // Save current flow
 * const handleSave = () => {
 *   const savedFlow = saveFlow("My Flow Diagram");
 *   console.log("Saved flow:", savedFlow);
 * };
 * 
 * // Delete a flow
 * const handleDelete = (flowId: string) => {
 *   deleteFlow(flowId);
 * };
 * ```
 */
export function useFlowPersistence(nodes: Node[], edges: Edge[]) {
  // Persist saved flows list
  // Uses the useLocalStorage hook to store an array of saved flow configurations
  // This allows users to save multiple named versions of their flows
  const [savedFlows, setSavedFlows] = useLocalStorage<SavedFlow[]>(
    SAVED_FLOWS_KEY,
    []
  );

  // Persist current working flow state
  // This is the auto-saved version of whatever the user is currently working on
  // It acts as a draft that persists across page refreshes but isn't explicitly saved
  const [currentFlowState, setCurrentFlowState] =
    useLocalStorage<CurrentFlowState>(CURRENT_FLOW_KEY, {
      nodes: [],
      edges: [],
      lastSaved: null,
    });

  // Auto-save current flow state with debouncing
  // Uses debounce to prevent excessive localStorage writes during rapid changes
  // The debounce delay (AUTO_SAVE_DELAY) ensures performance isn't impacted
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoSaveFlow = useCallback(
    debounce((nodes: Node[], edges: Edge[]) => {
      // Update the current flow state in localStorage with a timestamp
      setCurrentFlowState({
        nodes,
        edges,
        lastSaved: new Date().toISOString(),
      });
    }, AUTO_SAVE_DELAY),
    [setCurrentFlowState]
  );

  // Auto-save whenever nodes or edges change
  // React useEffect hook that triggers auto-save when the flow state changes
  // Only saves if there's actual content (at least one node or edge)
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      autoSaveFlow(nodes, edges);
    }
  }, [nodes, edges, autoSaveFlow]); // Dependencies: re-run when nodes, edges, or autoSaveFlow changes

  // Save a named flow
  // Creates a new saved flow with a unique ID and timestamp
  // Returns the saved flow object for immediate use by the caller
  const saveFlow = useCallback(
    (name: string): SavedFlow => {
      // Create a new flow object with a unique ID based on timestamp
      const newFlow: SavedFlow = {
        id: Date.now().toString(), // Using timestamp as a simple unique ID
        name,
        nodes: [...nodes], // Shallow copy to avoid reference issues
        edges: [...edges], // Shallow copy to avoid reference issues
        timestamp: new Date(),
      };

      // Add the new flow to the saved flows array
      // Uses functional update to ensure we're working with the latest state
      setSavedFlows((prevFlows) => [...prevFlows, newFlow]);
      return newFlow;
    },
    [nodes, edges, setSavedFlows] // Dependencies: recreate function when these change
  );

  // Delete a saved flow
  // Removes a flow from the saved flows array by its ID
  const deleteFlow = useCallback(
    (flowId: string) => {
      // Use functional update to filter out the flow with matching ID
      // This ensures we're working with the most current state
      setSavedFlows((prevFlows) =>
        prevFlows.filter((flow) => flow.id !== flowId)
      );
    },
    [setSavedFlows] // Dependency: recreate function if setSavedFlows changes
  );

  // Return an object with all the flow persistence functionality
  // This pattern allows consumers to destructure only what they need
  return {
    savedFlows,      // Array of all saved flows
    currentFlowState, // The current auto-saved working state
    saveFlow,        // Function to save current flow with a name
    deleteFlow,      // Function to delete a saved flow
  };
}

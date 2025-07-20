import { useEffect, useCallback } from "react";
import type { Node, Edge } from "reactflow";
import { useLocalStorage } from "./useLocalStorage";
import { debounce } from "../utils/debounce";
import type { CurrentFlowState, SavedFlow } from "../types";
import { CURRENT_FLOW_KEY, SAVED_FLOWS_KEY, AUTO_SAVE_DELAY } from "../constants";

export function useFlowPersistence(nodes: Node[], edges: Edge[]) {
  // Persist saved flows list
  const [savedFlows, setSavedFlows] = useLocalStorage<SavedFlow[]>(
    SAVED_FLOWS_KEY,
    []
  );

  // Persist current working flow state
  const [currentFlowState, setCurrentFlowState] =
    useLocalStorage<CurrentFlowState>(CURRENT_FLOW_KEY, {
      nodes: [],
      edges: [],
      lastSaved: null,
    });

  // Auto-save current flow state with debouncing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoSaveFlow = useCallback(
    debounce((nodes: Node[], edges: Edge[]) => {
      setCurrentFlowState({
        nodes,
        edges,
        lastSaved: new Date().toISOString(),
      });
    }, AUTO_SAVE_DELAY),
    [setCurrentFlowState]
  );

  // Auto-save whenever nodes or edges change
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      autoSaveFlow(nodes, edges);
    }
  }, [nodes, edges, autoSaveFlow]);

  // Save a named flow
  const saveFlow = useCallback(
    (name: string): SavedFlow => {
      const newFlow: SavedFlow = {
        id: Date.now().toString(),
        name,
        nodes: [...nodes],
        edges: [...edges],
        timestamp: new Date(),
      };

      setSavedFlows((prevFlows) => [...prevFlows, newFlow]);
      return newFlow;
    },
    [nodes, edges, setSavedFlows]
  );

  // Delete a saved flow
  const deleteFlow = useCallback(
    (flowId: string) => {
      setSavedFlows((prevFlows) =>
        prevFlows.filter((flow) => flow.id !== flowId)
      );
    },
    [setSavedFlows]
  );

  return {
    savedFlows,
    currentFlowState,
    saveFlow,
    deleteFlow,
  };
}

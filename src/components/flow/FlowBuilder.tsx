import { useCallback, useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "reactflow";
import type { Connection, Edge, Node, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import toast from "react-hot-toast";
import { SiOctanerender } from "react-icons/si";
import { FaTrash } from "react-icons/fa";
import { AiOutlineDesktop } from "react-icons/ai";

import NodesPanel from "../panels/NodesPanel";
import SettingsPanel from "../panels/SettingsPanel";
import Navigation from "../home/Navigation";
import { validateFlow, checkSourceNodeEdges } from "../../utils/flowValidation";
import { createNode, updateNodeData } from "../../utils/nodeHelpers";
import { useFlowPersistence } from "../../hooks/useFlowPersistence";
import { nodeTypes, MESSAGES } from "../../constants";

/**
 * FlowBuilder Component
 * 
 * Main component for building and managing chat flows. Provides a drag-and-drop interface
 * for creating nodes, connecting them with edges, and saving/loading flows.
 * 
 * Features:
 * - Drag and drop node creation
 * - Node connection validation
 * - Flow persistence (save/load)
 * - Node selection and editing
 * - Mobile responsiveness warning
 * 
 * @returns {JSX.Element} The flow builder interface
 */
const FlowBuilder: React.FC = () => {
  // Refs and State Management
  const reactFlowWrapper = useRef<HTMLDivElement>(null); // Reference to ReactFlow container
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null); // ReactFlow instance for screen-to-flow position conversion
  const [selectedNode, setSelectedNode] = useState<Node | null>(null); // Currently selected node for editing
  const [showFlowsList, setShowFlowsList] = useState(false); // Toggle for saved flows sidebar

  // Flow State: Initialize nodes and edges with empty arrays
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Custom Hook: Handles flow persistence (save/load functionality)
  const {
    savedFlows,
    saveFlow,
    deleteFlow: deleteSavedFlow,
  } = useFlowPersistence(nodes, edges);

  /**
   * Handles connection creation between nodes
   * Validates that source nodes can only have one outgoing edge
   * 
   * @param {Edge | Connection} params - Connection parameters from ReactFlow
   */
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      // Validate: Source nodes can only have one outgoing edge
      if (checkSourceNodeEdges(params.source!, edges)) {
        toast.error("Source handle can only have one outgoing edge");
        return;
      }

      // Add the new edge to the flow
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  /**
   * Handles drag over event for drop zone
   * Prevents default behavior and sets drop effect
   * 
   * @param {React.DragEvent} event - Drag event
   */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Handles drop event to create new nodes
   * Converts screen coordinates to flow coordinates and creates node at drop position
   * 
   * @param {React.DragEvent} event - Drop event containing node type data
   */
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // Get node type from drag data
      const type = event.dataTransfer.getData("application/reactflow");

      // Validate node type exists
      if (typeof type === "undefined" || !type) {
        return;
      }

      // Convert screen coordinates to flow coordinates
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create and add new node at drop position
      const newNode = createNode(type, position || { x: 0, y: 0 });
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Handles node selection for editing
   * 
   * @param {React.MouseEvent} _event - Mouse event (unused)
   * @param {Node} node - The clicked node
   */
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  /**
   * Updates node data when edited in settings panel
   * 
   * @param {string} nodeId - ID of the node to update
   * @param {Record<string, unknown>} newData - New data for the node
   */
  const handleNodeUpdate = useCallback(
    (nodeId: string, newData: Record<string, unknown>) => {
      setNodes((nds) => updateNodeData(nds, nodeId, newData));
    },
    [setNodes]
  );

  /**
   * Handles flow saving with validation
   * Validates flow structure, prompts for name, and saves to local storage
   */
  const handleSave = useCallback(() => {
    // Validate flow before saving
    const validation = validateFlow(nodes, edges);

    if (!validation.isValid) {
      toast.error(validation.error!);
      return;
    }

    // Prompt user for flow name
    const flowName = prompt(
      "Enter a name for this flow:",
      `Flow ${savedFlows.length + 1}`
    );
    if (!flowName) return;

    // Save flow and reset the canvas
    saveFlow(flowName);
    // Clear the ReactFlow after saving
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setShowFlowsList(true); // Show saved flows list
    toast.success("Flow saved successfully!");
  }, [nodes, edges, savedFlows, saveFlow, setNodes, setEdges]);

  /**
   * Loads a saved flow into the canvas
   * Clears current flow before loading to prevent conflicts
   * 
   * @param {Object} flow - Flow object containing nodes, edges, and name
   */
  const loadFlow = useCallback(
    (flow: { nodes: Node[]; edges: Edge[]; name: string }) => {
      // Clear current flow first
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      
      // Use setTimeout to ensure state is cleared before loading new flow
      // This prevents potential race conditions with React state updates
      setTimeout(() => {
        setNodes(flow.nodes);
        setEdges(flow.edges);
        setShowFlowsList(false); // Hide flows list after loading
        toast.success(`Loaded flow: ${flow.name}`);
      }, 0);
    },
    [setNodes, setEdges]
  );

  /**
   * Deletes a saved flow
   * 
   * @param {string} flowId - ID of the flow to delete
   */
  const deleteFlow = useCallback(
    (flowId: string) => {
      deleteSavedFlow(flowId);
      toast.success("Flow deleted");
    },
    [deleteSavedFlow]
  );

  return (
    <>
      {/* Navigation Bar */}
      <Navigation
        onSave={handleSave}
        onToggleFlowsList={() => setShowFlowsList(!showFlowsList)}
        showFlowsList={showFlowsList}
      />
      
      {/* Mobile Warning - Show only on mobile devices */}
      <div className="block md:hidden h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-yellow-500 text-black px-6 py-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center justify-center gap-3">
            <AiOutlineDesktop className="text-2xl" />
            <span className="text-sm font-medium">
              {MESSAGES.MOBILE_WARNING}
            </span>
          </div>
        </div>
      </div>
      
      {/* Desktop Content - Hidden on mobile */}
      <div className="hidden md:flex h-[calc(100vh-64px)]">
        {/* Saved Flows Sidebar */}
        {showFlowsList && (
          <div className="w-50 border-r border-gray-700 p-4 overflow-y-auto">
            {/* Sidebar Header */}
            <div className="flex justify-between items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold">Saved Flows</h3>
              <button
                onClick={() => setShowFlowsList(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {/* Flow List or Empty State */}
            {savedFlows.length === 0 ? (
              <p className="text-gray-400 text-sm">No saved flows yet</p>
            ) : (
              <div className="space-y-2">
                {savedFlows.map((flow) => (
                  <div
                    key={flow.id}
                    className="p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      {/* Flow Info */}
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{flow.name}</h4>
                        <p className="text-gray-400 text-xs mt-1">
                          {flow.nodes.length} nodes, {flow.edges.length} edges
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(flow.timestamp).toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Flow Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadFlow(flow)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                          title="Load flow"
                        >
                          <SiOctanerender />
                        </button>
                        <button
                          onClick={() => deleteFlow(flow.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                          title="Delete flow"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Main Flow Canvas */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView // Automatically fit view on initial render
          >
            {/* ReactFlow UI Controls */}
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
        {/* Right Sidebar: Settings Panel or Nodes Panel */}
        <div className="w-90 bg-gray-140 border-l border-gray-700 !p-4">
          {selectedNode ? (
            // Show settings panel when a node is selected
            <SettingsPanel
              node={selectedNode}
              onUpdate={handleNodeUpdate}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            // Show nodes panel when no node is selected
            <NodesPanel />
          )}
        </div>
      </div>
    </>
  );
};

/**
 * FlowBuilderWrapper Component
 * 
 * Wrapper component that provides ReactFlow context to the FlowBuilder.
 * Required for ReactFlow hooks to work properly within the FlowBuilder component.
 * 
 * @returns {JSX.Element} FlowBuilder wrapped with ReactFlowProvider
 */
const FlowBuilderWrapper: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
};

export default FlowBuilderWrapper;

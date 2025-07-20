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

import NodesPanel from "../panels/NodesPanel";
import SettingsPanel from "../panels/SettingsPanel";
import Navigation from "../home/Navigation";
import { validateFlow, checkSourceNodeEdges } from "../../utils/flowValidation";
import { createNode, updateNodeData } from "../../utils/nodeHelpers";
import { useFlowPersistence } from "../../hooks/useFlowPersistence";
import { nodeTypes } from "../../constants";

const FlowBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showFlowsList, setShowFlowsList] = useState(false);

  // Initialize nodes and edges with empty arrays first
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Use flow persistence hook
  const {
    savedFlows,
    saveFlow,
    deleteFlow: deleteSavedFlow,
  } = useFlowPersistence(nodes, edges);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      if (checkSourceNodeEdges(params.source!, edges)) {
        toast.error("Source handle can only have one outgoing edge");
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createNode(type, position || { x: 0, y: 0 });
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleNodeUpdate = useCallback(
    (nodeId: string, newData: Record<string, unknown>) => {
      setNodes((nds) => updateNodeData(nds, nodeId, newData));
    },
    [setNodes]
  );

  const handleSave = useCallback(() => {
    const validation = validateFlow(nodes, edges);

    if (!validation.isValid) {
      toast.error(validation.error!);
      return;
    }

    const flowName = prompt(
      "Enter a name for this flow:",
      `Flow ${savedFlows.length + 1}`
    );
    if (!flowName) return;

    saveFlow(flowName);
    // Clear the ReactFlow after saving
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setShowFlowsList(true);
    toast.success("Flow saved successfully!");
  }, [nodes, edges, savedFlows, saveFlow, setNodes, setEdges]);

  const loadFlow = useCallback(
    (flow: { nodes: Node[]; edges: Edge[]; name: string }) => {
      // Clear current flow and load the selected one
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      
      // Use setTimeout to ensure state is cleared before loading new flow
      setTimeout(() => {
        setNodes(flow.nodes);
        setEdges(flow.edges);
        setShowFlowsList(false);
        toast.success(`Loaded flow: ${flow.name}`);
      }, 0);
    },
    [setNodes, setEdges]
  );

  const deleteFlow = useCallback(
    (flowId: string) => {
      deleteSavedFlow(flowId);
      toast.success("Flow deleted");
    },
    [deleteSavedFlow]
  );

  return (
    <>
      <Navigation
        onSave={handleSave}
        onToggleFlowsList={() => setShowFlowsList(!showFlowsList)}
        showFlowsList={showFlowsList}
      />
      <div className="flex h-[calc(100vh-64px)]">
        {showFlowsList && (
          <div className="w-50 border-r border-gray-700 p-4 overflow-y-auto">
            <div className="flex justify-between items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold">Saved Flows</h3>
              <button
                onClick={() => setShowFlowsList(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
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
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{flow.name}</h4>
                        <p className="text-gray-400 text-xs mt-1">
                          {flow.nodes.length} nodes, {flow.edges.length} edges
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(flow.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadFlow(flow)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          <SiOctanerender />
                        </button>
                        <button
                          onClick={() => deleteFlow(flow.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
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
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
        <div className="w-90 bg-gray-140 border-l border-gray-700 !p-4">
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onUpdate={handleNodeUpdate}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </>
  );
};

const FlowBuilderWrapper: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
};

export default FlowBuilderWrapper;

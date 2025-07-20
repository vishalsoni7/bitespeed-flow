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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NodesPanel from "../panels/NodesPanel";
import SettingsPanel from "../panels/SettingsPanel";
import TextMessageNode from "../nodes/TextMessageNode";
import Navigation from "../home/Navigation";
import { validateFlow, checkSourceNodeEdges } from "../../utils/flowValidation";
import { createNode, updateNodeData } from "../../utils/nodeHelpers";

const nodeTypes = {
  textMessage: TextMessageNode,
};

const initialNodes: Node[] = [];

const FlowBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

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

    const flowData = {
      nodes,
      edges,
    };

    console.log("Saving flow:", flowData);
    toast.success("Flow saved successfully!");
  }, [nodes, edges]);

  return (
    <>
      <Navigation onSave={handleSave} />
      <div className="flex h-screen">
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
      <div className="w-80 bg-gray-50 border-l border-gray-200 !p-4">
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
      <ToastContainer position="top-center" />
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

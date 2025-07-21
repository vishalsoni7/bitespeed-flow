import React from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { NODE_TYPES } from "../../constants";

/**
 * NodesPanel Component
 * 
 * Sidebar panel that displays available node types for the flow builder.
 * Users can drag nodes from this panel to the canvas to create new flow elements.
 * Currently supports text message nodes with potential for future node types.
 * 
 * @returns {JSX.Element} Panel with draggable node options
 */
const NodesPanel: React.FC = () => {
  /**
   * Handles the start of a drag operation
   * Sets the node type data for the drag event
   * 
   * @param {React.DragEvent} event - The drag event
   * @param {string} nodeType - Type of node being dragged
   */
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    // Set node type data for drop handling
    event.dataTransfer.setData("application/reactflow", nodeType);
    // Set allowed drag effect
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-full">
      {/* Panel Title */}
      <h2 className="text-lg font-semibold mb-4">Nodes Panel</h2>
      
      {/* Available Nodes List */}
      <div className="space-y-3">
        {/* Text Message Node - Draggable item */}
        <div
          className="p-4 rounded-lg shadow-lg border border-gray-700 cursor-move hover:shadow-md transition-shadow"
          onDragStart={(event) => onDragStart(event, NODE_TYPES.TEXT_MESSAGE)}
          draggable
        >
          <div className="flex items-start gap-1 flex-col">
            {/* Node Type Header */}
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-400">Message</p>
              <BiMessageSquareDetail className="text-blue-400 text-md" />
            </div>
            
            {/* Helper Text */}
            <p className="text-sm text-gray-400">Drag to add a text message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;

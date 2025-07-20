import React from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { NODE_TYPES } from "../../constants";

const NodesPanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-full">
      <h2 className="text-lg font-semibold mb-4">Nodes Panel</h2>
      <div className="space-y-3">
        <div
          className="p-4 rounded-lg shadow-lg border border-gray-700 cursor-move hover:shadow-md transition-shadow"
          onDragStart={(event) => onDragStart(event, NODE_TYPES.TEXT_MESSAGE)}
          draggable
        >
          <div className="flex items-start gap-1 flex-col">
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-400">Message</p>
              <BiMessageSquareDetail className="text-blue-400 text-md" />
            </div>
            <p className="text-sm text-gray-400">Drag to add a text message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;

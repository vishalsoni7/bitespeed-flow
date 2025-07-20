import React from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { NODE_TYPES } from "../../constants";

const NodesPanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Nodes Panel</h2>
      <div className="space-y-3">
        <div
          className="bg-white p-4 rounded-lg shadow cursor-move hover:shadow-md transition-shadow border-2 border-blue-200"
          onDragStart={(event) => onDragStart(event, NODE_TYPES.TEXT_MESSAGE)}
          draggable
        >
          <div className="flex items-center gap-3">
            <p className="font-medium">Message</p>
            <BiMessageSquareDetail className="text-blue-500 text-2xl" />
          </div>
          <p className="text-sm text-gray-500">Drag to add a text message</p>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;

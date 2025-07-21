import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";

/**
 * TextMessageNode Component
 * 
 * Custom ReactFlow node component representing a WhatsApp text message.
 * Features connection handles for flow building, a header with WhatsApp branding,
 * and displays the message content. Visual feedback is provided when selected.
 * 
 * @param {NodeProps} props - ReactFlow node props
 * @param {Object} props.data - Node data containing the message label
 * @param {boolean} props.selected - Whether the node is currently selected
 * 
 * @returns {JSX.Element} A styled text message node
 */
const TextMessageNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg min-w-[200px] ${
        selected ? "ring-2 ring-blue-500" : "" // Visual feedback for selection
      }`}
    >
      {/* Input Handle - Left side for incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-500"
      />

      {/* Node Header - WhatsApp themed */}
      <div className="bg-teal-600 px-2 py-1 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <BiMessageSquareDetail className="text-xs" />
          <span className="text-xs font-semibold">Send Message</span>
        </div>
        <BsWhatsapp className="text-xs" />
      </div>

      {/* Message Content */}
      <div className="p-2">
        <p className="text-xs text-gray-700">{data.label || "Text Message"}</p>
      </div>

      {/* Output Handle - Right side for outgoing connections */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-500"
      />
    </div>
  );
};

export default TextMessageNode;

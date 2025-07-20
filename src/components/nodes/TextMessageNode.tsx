import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';

const TextMessageNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg min-w-[200px] ${
        selected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-500"
      />
      
      <div className="bg-teal-200 px-3 py-2 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BiMessageSquareDetail className="text-xs" />
          <span className="text-xs font-semibold">Send Message</span>
        </div>
        <BsWhatsapp className="text-xs" />
      </div>
      
      <div className="p-3">
        <p className="text-sm text-gray-700">{data.label || 'Text Message'}</p>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-500"
      />
    </div>
  );
};

export default TextMessageNode;
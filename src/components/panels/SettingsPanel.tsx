import React, { useState, useEffect } from "react";
import type { Node } from "reactflow";
import { IoArrowBack } from "react-icons/io5";

interface SettingsPanelProps {
  node: Node;
  onUpdate: (nodeId: string, newData: Record<string, unknown>) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  node,
  onUpdate,
  onClose,
}) => {
  const [text, setText] = useState(node.data.label || "");

  useEffect(() => {
    setText(node.data.label || "");
  }, [node]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onUpdate(node.id, { ...node.data, label: e.target.value });
  };

  return (
    <div>
      <div className="flex items-center gap-1 mb-4 pb-4 border-b">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-400"
        >
          <IoArrowBack />
        </button>
        <h2 className="text-lg font-semibold ">Message</h2>
      </div>

      <div>
        <label
          htmlFor="message-text"
          className="block text-sm font-medium mb-2"
        >
          Text
        </label>
        <textarea
          id="message-text"
          value={text}
          onChange={handleTextChange}
          className="w-full p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Enter your message..."
        />
      </div>
    </div>
  );
};

export default SettingsPanel;

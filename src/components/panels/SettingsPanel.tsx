import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import type { SettingsPanelProps } from "../../types";

/**
 * SettingsPanel Component
 * 
 * Sidebar panel for editing node properties. Currently supports editing
 * text message content. Updates are propagated to the parent component
 * in real-time as the user types.
 * 
 * @param {SettingsPanelProps} props - Component props
 * @param {Node} props.node - The selected node to edit
 * @param {Function} props.onUpdate - Callback to update node data
 * @param {Function} props.onClose - Callback to close the settings panel
 * 
 * @returns {JSX.Element} Settings panel with form controls
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  node,
  onUpdate,
  onClose,
}) => {
  // Local state for text input
  const [text, setText] = useState(node.data.label || "");

  // Sync local state when selected node changes
  useEffect(() => {
    setText(node.data.label || "");
  }, [node]);

  /**
   * Handles text area changes
   * Updates both local state and node data in real-time
   * 
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Change event
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Update node data immediately for real-time preview
    onUpdate(node.id, { ...node.data, label: e.target.value });
  };

  return (
    <div>
      {/* Panel Header with Back Button */}
      <div className="flex items-center gap-1 mb-4 pb-4 border-b">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-400"
          aria-label="Close settings panel"
        >
          <IoArrowBack />
        </button>
        <h2 className="text-lg font-semibold ">Message</h2>
      </div>

      {/* Message Text Input Section */}
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

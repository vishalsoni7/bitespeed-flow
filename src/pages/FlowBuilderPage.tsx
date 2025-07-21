import React from 'react';
import FlowBuilderWrapper from '../components/flow/FlowBuilder';

/**
 * FlowBuilderPage Component - Main page for the interactive flow builder interface
 * 
 * This page serves as the container for the core flow builder functionality
 * where users can create, edit, and manage their chatbot conversation flows.
 * 
 * Key responsibilities:
 * - Renders the FlowBuilderWrapper component which contains the complete flow builder UI
 * - Serves as the route destination for '/builder' path
 * - Acts as a clean separation between routing concerns and flow builder logic
 * 
 * The FlowBuilderWrapper component handles:
 * - Drag and drop interface for creating nodes
 * - Canvas for arranging and connecting flow elements
 * - Node editing and configuration panels
 * - Flow persistence and state management
 * - Validation of flow connections and structure
 * 
 * This simple wrapper pattern allows for:
 * - Clean separation of concerns between page routing and component logic
 * - Easy testing and modularity
 * - Potential future enhancements like page-level state or authentication
 * 
 * @returns {JSX.Element} The FlowBuilderWrapper component containing the full flow builder interface
 */
const FlowBuilderPage: React.FC = () => {
  return <FlowBuilderWrapper />;
};

export default FlowBuilderPage;
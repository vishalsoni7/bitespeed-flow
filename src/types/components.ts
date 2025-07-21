import React from "react";

/**
 * Props for the Layout component that provides consistent page structure
 * @interface LayoutProps
 */
export interface LayoutProps {
  /**
   * The content to be rendered within the layout
   * Can be any valid React node including elements, strings, numbers, fragments, or portals
   */
  children: React.ReactNode;
  
  /**
   * Optional flag to determine if the layout should span full width
   * @default false
   * @example
   * // Full width layout
   * <Layout fullWidth={true}>
   *   <div>Content spans full width</div>
   * </Layout>
   */
  fullWidth?: boolean;
}

import type { Node } from "reactflow";

/**
 * Props for the SettingsPanel component that allows editing node properties
 * @interface SettingsPanelProps
 */
export interface SettingsPanelProps {
  /**
   * The React Flow node being edited
   * Contains node id, position, data, and other node-specific properties
   */
  node: Node;
  
  /**
   * Callback function to update node data
   * @param nodeId - The unique identifier of the node being updated
   * @param newData - Object containing the updated data properties for the node
   * @example
   * onUpdate('node-123', { label: 'Updated Label', color: '#FF0000' })
   */
  onUpdate: (nodeId: string, newData: Record<string, unknown>) => void;
  
  /**
   * Callback function to close the settings panel
   * Typically called when user clicks close button or completes editing
   */
  onClose: () => void;
}

/**
 * Props for the Navigation component that provides app-level navigation controls
 * @interface NavigationProps
 */
export interface NavigationProps {
  /**
   * Optional callback function triggered when the save action is initiated
   * Typically used to persist the current flow state
   */
  onSave?: () => void;
  
  /**
   * Optional callback function to toggle the visibility of the flows list
   * Used to show/hide saved flows sidebar or modal
   */
  onToggleFlowsList?: () => void;
  
  /**
   * Optional flag indicating whether the flows list is currently visible
   * Used to update navigation UI state (e.g., toggle button appearance)
   * @default false
   */
  showFlowsList?: boolean;
}

/**
 * Represents a feature or capability displayed in the UI
 * Typically used for feature cards, lists, or showcases
 * @interface Feature
 * @example
 * const feature: Feature = {
 *   icon: <IconComponent />,
 *   title: "Real-time Collaboration",
 *   description: "Work together with your team in real-time",
 *   colorClass: "text-blue-500"
 * }
 */
export interface Feature {
  /**
   * React node representing the feature's icon
   * Can be an SVG component, icon library component, or any valid React element
   */
  icon: React.ReactNode;
  
  /**
   * The display title of the feature
   * Should be concise and descriptive
   */
  title: string;
  
  /**
   * Detailed description of the feature
   * Explains what the feature does or its benefits
   */
  description: string;
  
  /**
   * CSS class name for styling, typically for color theming
   * Example: "text-blue-500", "bg-green-100", etc.
   * Used to provide visual distinction between different features
   */
  colorClass: string;
}
import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

import type { Node } from "reactflow";

export interface SettingsPanelProps {
  node: Node;
  onUpdate: (nodeId: string, newData: Record<string, unknown>) => void;
  onClose: () => void;
}

export interface NavigationProps {
  onSave?: () => void;
  onToggleFlowsList?: () => void;
  showFlowsList?: boolean;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}
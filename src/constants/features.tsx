import { FaNodeJs, FaConnectdevelop } from "react-icons/fa";
import type { Feature } from "../types/components";

/**
 * Features Configuration - Defines the main features showcased on the homepage
 * 
 * This constant contains the configuration for feature cards displayed in the
 * FeaturesSection component on the landing page. Each feature represents a
 * key capability of the Bitespeed Flow application.
 * 
 * Feature structure:
 * - icon: React icon component from react-icons/fa library
 * - title: Brief, descriptive name of the feature
 * - description: Detailed explanation of what users can accomplish
 * - colorClass: Tailwind CSS background color class for visual differentiation
 * 
 * Current features:
 * 1. Drag & Drop Nodes - Core interaction model for flow creation
 * 2. Connect Nodes - Flow building through node connections with business rules
 * 
 * Design considerations:
 * - Uses consistent color scheme (blue for creation, green for connection)
 * - Icons are semantically relevant (FaNodeJs for nodes, FaConnectdevelop for connections)
 * - Descriptions emphasize ease of use and key constraints (one outgoing connection rule)
 */
export const features: Feature[] = [
  {
    // Node creation feature with blue theme
    icon: <FaNodeJs className="text-blue-600 text-2xl" />,
    title: "Drag & Drop Nodes",
    description:
      "Simply drag message nodes from the panel and drop them onto the canvas to start building your flow.",
    colorClass: "bg-blue-100", // Light blue background for feature card
  },
  {
    // Node connection feature with green theme
    icon: <FaConnectdevelop className="text-green-600 text-2xl" />,
    title: "Connect Nodes",
    description:
      "Create conversation flows by connecting nodes together. Each source can have one outgoing connection.",
    colorClass: "bg-green-100", // Light green background for feature card
  },
];
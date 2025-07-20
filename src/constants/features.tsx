import { FaNodeJs, FaConnectdevelop } from "react-icons/fa";
import type { Feature } from "../types/components";

export const features: Feature[] = [
  {
    icon: <FaNodeJs className="text-blue-600 text-2xl" />,
    title: "Drag & Drop Nodes",
    description:
      "Simply drag message nodes from the panel and drop them onto the canvas to start building your flow.",
    colorClass: "bg-blue-100",
  },
  {
    icon: <FaConnectdevelop className="text-green-600 text-2xl" />,
    title: "Connect Nodes",
    description:
      "Create conversation flows by connecting nodes together. Each source can have one outgoing connection.",
    colorClass: "bg-green-100",
  },
];